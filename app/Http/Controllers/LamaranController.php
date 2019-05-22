<?php
namespace App\Http\Controllers;
use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Load Composer's autoloader
//require 'vendor/autoload.php';
setlocale(LC_MONETARY, 'id_ID');
class LamaranController extends Controller{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
    }

    public function getNamaLowongan($id_lowongan){
        $result = DB::table('lowongan')->select('nama')->where('id', $id_lowongan)->get();
        $result = json_decode($result);
        $result = $result[0];

        return $result->nama;
    }

    public function getRecruitmentReport($divisi, $start, $end){

      $tsstart = strtotime($start);
      $tsend = strtotime($end);

      //$data = array('divisi'=>$divisi, 'start'=>$start, 'end'=>$end);

      if($divisi=='All'){
        $list_lamaran = DB::table('lamaran')->select()
        ->where([
            ['created_date','>=',$start],
            ['created_date','<=',$end]
        ])->get();
        $list_lamaran = json_decode($list_lamaran);

        //siapin nama lowongan yang bakal muncul di ringkasan
        $result = array();
        foreach($list_lamaran as $res){
            $nama_lowongan = $this->getNamaLowongan($res->id_lowongan);
            if (array_key_exists($nama_lowongan, $result)){
                //nama lowongan ada
                if (array_key_exists($res->tahapan, $result[$nama_lowongan])){
                    //nama tahapan ada, tambah 1 ke yang udah ada
                    $result[$nama_lowongan][$res->tahapan]=$result[$nama_lowongan][$res->tahapan] + 1;
                } else {
                    //nama tahapan belum ada, buat baru nilainya 1
                    $result[$nama_lowongan][$res->tahapan]=1;
                }
            } else {
                //nama lowongan belum ada, buat baru
                $result[$nama_lowongan] = array();

                //jumlah tahapannya belum ada juga berarti, buat baru nilainya 1
                $result[$nama_lowongan]['Administration']=0;
                $result[$nama_lowongan]['Remote Test']=0;
                $result[$nama_lowongan]['Interview']=0;
                $result[$nama_lowongan]['Hired']=0;

                $result[$nama_lowongan][$res->tahapan]=1;
            }
        }

        $result_rapi = array();
        foreach($result as $key=>$value){
            $value['name'] = $key;
            array_push($result_rapi, $value);
        }

        return json_encode($result_rapi);

      } else {
        $lowongan = DB::table('lowongan')->select('id')->where('divisi', $divisi)->get();
        $lowongan = json_decode($lowongan);
        $list_id_lowongan = array();
        foreach ($lowongan as $low) {
          array_push($list_id_lowongan, $low->id);
        }
        // $data['$list_id_lowongan'] = $list_id_lowongan;

        $result = array();
        $result['Administration']=0;
        $result['Remote Test']=0;
        $result['Interview']=0;
        $result['Hired']=0;

        $list_lamaran = DB::table('lamaran')->select()->whereIn('id_lowongan', $list_id_lowongan)->get();

        foreach($list_lamaran as $lamaran){
            $lamaran = (object) $lamaran;

            $tahapan = $lamaran->tahapan;

            $ts_created_date = strtotime($lamaran->created_date);

            //cek apakah tanggal lamaran ini dibuat memenuhi constrain waktu
            $is_sebelum = $ts_created_date < $tsend;
            $is_sesudah = $ts_created_date > $tsstart;

            $lamaran->is_sebelum = $is_sebelum;
            $lamaran->is_sesudah = $is_sesudah;
            $lamaran->ts_created_date = $ts_created_date;

            if($is_sebelum && $is_sesudah){
                $result[$tahapan] += 1;
            }

        }

        // $data['result'] = $result;
        // $data['list lamaran']  = $list_lamaran;
        $array_chart_js = array('labels'=>array(), 'datasets'=>array());
        array_push($array_chart_js['datasets'],array('data'=>array(), 'backgroundColor'=>array(), 'hoverBackgroundColor'=>array()));

        foreach($result as $key=>$value){
            array_push($array_chart_js['labels'], $key);
            array_push($array_chart_js['datasets'][0]['data'], $value);
        }

        $array_chart_js['datasets'][0]['backgroundColor'] = array('#E1341E', '#24DB7E', '#DB2481', '#1ECBE1');
        $array_chart_js['datasets'][0]['hoverBackgroundColor']=array('#E1341E', '#24DB7E', '#DB2481', '#1ECBE1');
        return json_encode($array_chart_js);
      }
    }

    public function sendMailLamaran($data){
        $nama = $data['nama'];
        $email = $data['email'];
        $lowongan = $data['lowongan'];

        $text = 'Dear ' . $nama . ', your application as '. $lowongan .' has been submitted. We will evaluate it soon. You can check the progress of your application(s) at our system.';
        $data = array('email'=>$email, 'text'=>$text);
        Mail::send([], $data, function($message) use ($data) {
            $message->to($data['email'], '')
            ->subject('SIRCLO | Your Application has been Submitted')
            ->setBody($data['text']);
            $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
        });
    }

    public function uploadCV(Request $request){
        if($request->hasFile('file')){
            $file = $request->file('file');
            $id_lamaran = $request->input('id_lamaran');
            $extension = $file->getClientOriginalExtension();
            $filename =$id_lamaran.'.'.$extension;
            $file->move('uploads/', $filename);
            return response()->json(['message'=>'success', 'status'=>200]);
        } else {
            return response()->json(['message'=>'failed', 'status'=>500]);
        }
    }

    public function downloadCV($id){
        $file = 'uploads/' . $id . '.pdf';
        return response()->download($file, 123);
    }

    public function createLamaran(Request $request){
        $id_lowongan = $request->input('id_lowongan');
        $token_pelamar = $request->input('token_pelamar');
        $salary_expectation = $request->input('salary_expectation');
        $cover_letter = $request->input('cover_letter');
        $tahapan = "Administration";
        $status = "Submitted";
        $skill = $request->input('skill');
        $experience = $request->input('experience');
        date_default_timezone_set('Asia/Jakarta');
        $created_date = date('Y-m-d H:i:s', time());
        $id_lamaran = DB::table('lamaran')->insertGetId(
            ['id_lowongan' => $id_lowongan,
            'token_pelamar' => $token_pelamar,
            'salary_exp' => $salary_expectation,
            'cover_letter' => $cover_letter,
            'tahapan' => $tahapan,
            'status' => $status,
            'created_date' => $created_date,
            'skills'=>$skill,
            'experiences'=>$experience
            ]
        );
        $id_lamaran = (int) $id_lamaran;
        //upload file
        if($request->hasFile('file')){
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $filename =$id_lamaran.'.'.$extension;
        $file->move('uploads/', $filename);
        }
        //kirim email
        $pelamar = DB::table('pelamar')->select()->where('token', $token_pelamar)->get();
        $pelamar = json_decode($pelamar);
        $pelamar = $pelamar[0];
        $lowongan = DB::table('lowongan')->select()->where('id', $id_lowongan)->get();
        $lowongan = json_decode($lowongan);
        $lowongan = $lowongan[0];
        $nama = $pelamar->nama;
        $email = $pelamar->email;
        $lowongan = $lowongan->nama;
        $data = array('nama'=>$nama, 'email'=>$email, 'lowongan'=>$lowongan);
        $this->sendMailLamaran($data);
        return response()->json(['message'=>'success', 'status'=>200]);
    }


    /**
     * mengubah tahapan suatu lamaran
     * @param request  $request berisi $id lamaran dan $id_tahapan
     * @return long $id id dari hasil perubahan lamaran di database
     */
    public function updateTahapanLamaran(Request $request){
        $id = $request->id;
        $tahapan = $request->tahapan;
        $status = $request->status;
        $result = DB::table('lamaran')
            ->where('id', $id)
            ->update(['tahapan' => $tahapan,
            'status' => $status]);

        return $result;
    }

    public function getAllLamaran(Request $request){
        $lamarans = DB::table('lamaran')->select()->get();
        $lamarans = json_decode($lamarans, true);
        $result = array();
        foreach($lamarans as $lamaran){
            $lamaran = (object) $lamaran;
            $lamaran = $this->addNamaLowonganNamaPelamar($lamaran);
            array_push($result, $lamaran);
        }
        return $result;
    }

    public function getLamaran($id){
        $lamaran = DB::table('lamaran')->select()->where('id', $id)->get();
        $lamaran = json_decode($lamaran);
        $lamaran = $lamaran[0];
        $lamaran = $this->addNamaLowonganNamaPelamar($lamaran);
        $token = $lamaran->token_pelamar;
        $pelamar = DB::table('pelamar')->select()->where('token', $token)->get();
        $pelamar = json_decode($pelamar);
        $pelamar = $pelamar[0];
        $lamaran->detail_pelamar = $pelamar;
        return json_encode($lamaran);
    }

    public function getIdRemoteTest($id){
      $lamaran = DB::table('lamaran')->select()->where('id', $id)->get();
      $lamaran = json_decode($lamaran);
      $lamaran = $lamaran[0];
      $rt = DB::table('remote_test')->select()->where('id_lamaran', $lamaran->id)->where('active', 'yes')->get();
      $rt = json_decode($rt);
      $rt = $rt[0];
      $rt = array('id_remote_test'=>$rt->id);
      return json_encode($rt);
    }

    /**
     * mengembalikan lamaran yang udah berisi nama lowongan
     */
    public function addNamaLowonganNamaPelamar($arr){
        $lamaran = $arr;
        //nama lowongan
        $nama_lowongan = DB::table('lowongan')->select('nama')->where('id', $lamaran->id_lowongan)->get();
        $lamaran->lowongan = $nama_lowongan[0]->nama;
        //nama pelamar
        $nama_pelamar = DB::table('pelamar')->select('nama')->where('token', $lamaran->token_pelamar)->get();
        $lamaran->pelamar = $nama_pelamar[0]->nama;
        return $lamaran;
    }

    public function getDetailApplicant($id){
      $lamaran = DB::table('lamaran')->select()->where('id', $id)->get();
      $lamaran = json_decode($lamaran);
      $lamaran = $lamaran[0];
      $nama_lowongan = DB::table('lowongan')->select('nama')->where('id', $lamaran->id_lowongan)->get();
      $lamaran->lowongan = $nama_lowongan[0]->nama;
      //nama pelamar
      $pelamar = DB::table('pelamar')->select('nama', 'email')->where('token', $lamaran->token_pelamar)->get();
      $lamaran->pelamar = $pelamar[0];
      $lamaran = array("lowongan" => $lamaran->lowongan, "nama_pelamar"=> $lamaran->pelamar->nama, "email"=>$lamaran->pelamar->email);
      return json_encode($lamaran);
    }

   /**
    * mengirim email hire
    * @param request  $request berisi $email
    * @return String $email email dari pelamar
    */
    public function sendMailHire(Request $request){
      $nama = $request->nama;
      $email = $request->email;
      $additionalMessage = $request->additionalMessage;

      $text = 'Dear ' . $nama . ', We are happy and excited to annouce that you have been successfully hired on our recruitment phase! ' . $additionalMessage . '. Please contact us immediately by replying to this email for further update on the hiring process.';
      $data = array('email'=>$email, 'text'=>$text);

      Mail::send([], $data, function($message) use ($data) {
         $message->to($data['email'], '')
         ->subject('SIRCLO | An Update on Your Application')
         ->setBody($data['text']);
         $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
      });
   }

   /**
    * mengirim email reject
    * @param request  $request berisi $email
    * @return String $email email dari pelamar
    */
   public function sendMailReject(Request $request){
      $nama = $request->nama;
      $email = $request->email;
      $additionalMessage = $request->additionalMessage;

      $text = 'Dear ' . $nama . ', We are sorry to annouce that you have not succeded on our recruitment phase. ' . $additionalMessage . '. But, we will gladly accept your submission on future vacancy openings that might be more suitable for you.';
      $data = array('email'=>$email, 'text'=>$text);

      Mail::send([], $data, function($message) use ($data) {
          $message->to($data['email'], '')
          ->subject('SIRCLO | An Update on Your Application')
          ->setBody($data['text']);
          $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
      });
  }

}
