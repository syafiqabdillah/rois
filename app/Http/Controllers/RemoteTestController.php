<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class RemoteTestController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * mengembalikan semua remote test yang ada
     * @return array $remote test
     */
    public function getAllRemoteTest(Request $request){
        $getRT = DB::table('remote_test')->select()->get();
        $rts = json_decode($getRT, true);
        $result = array();
        foreach($rts as $rt){
            $rt = (object) $rt;
            array_push($result, $rt);
        }
        return $result;
    }

    /**
     * mengembalikan suatu remote test dengan id tertentu
     * @param long  $id id dari remote test yang ingin diambil
     * @return      array $remote test
     */
    public function getRemoteTest($id){
        $rt = DB::table('remote_test')->select()->where('id', $id)->get();
        $rt = json_decode($rt);
        $rt = $rt[0];
        return json_encode($rt);
    }

    /**
     * membuat suatu remote test
     * @param request  $request berisi id_lamaran, duration, tester_email, expired_date, id_soal, start_date, link_jawaban
     * @return long $id dari hasil penambahan remote test di database
     */
    public function createRemoteTest(Request $request){
        $id_lamaran = $request->id_lamaran;
        $duration = $request->duration;
        $tester_email = $request->tester_email;
        $expired_date = $request->expired_date;
        $id_soal = $request->id_soal;

        $id = DB::table('remote_test')->insertGetId(
            ['id_lamaran' => $id_lamaran,
            'duration' => $duration,
            'tester_email' => $tester_email,
            'expired_date' => $expired_date,
            'id_soal' => $id_soal,
            'active' => 'yes']
        );

        //ambil nama dan email pelamar
        $lamaran = DB::table('lamaran')->select()->where('id', $id_lamaran)->get();
        $lamaran = json_decode($lamaran);
        $lamaran = $lamaran[0];
        $token_pelamar = $lamaran->token_pelamar;
        $pelamar = DB::table('pelamar')->select()->where('token', $token_pelamar)->get();
        $pelamar = json_decode($pelamar);
        $pelamar = $pelamar[0];
        $nama = $pelamar->nama;
        $email = $pelamar->email;
        $data = array('email'=>$email, 'nama'=>$nama);

        $this->sendMailNotifCreateRemoteTest($data);

        return response()->json(['message'=>'success', 'status'=>200]);
    }



    public function sendMailNotifCreateRemoteTest($data){
        $nama = $data['nama'];
        $email = $data['email'];
        
        $text = 'Dear ' . $nama . ', you have passed the administration phase. We just give you a remote test assignment for you to do. Please go to our website to see the assignment.';
        $data = array('email'=>$email, 'text'=>$text);
        Mail::send([], $data, function($message) use ($data) {
            $message->to($data['email'], '')
            ->subject('SIRCLO | Your Got An Assignment')
            ->setBody($data['text']);
            $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
        });
    }

    /**
     * submit jawaban remote test
     * @param request
     * @return long $id dari hasil penambahan remote test di database
     */
    public function submitJawaban(Request $request){
        $id = $request->id;
        $link_soal = $request->link_soal;
        $link_jawaban = $request->link_jawaban;

        //ubah status remote test
        $result = DB::table('remote_test')
            ->where('id', $id)
            ->update(['link_jawaban' => $link_jawaban, 'active'=>'no']);

        $rt = DB::table('remote_test')->select()->where('id', $id)->get();
        $rt = json_decode($rt);
        $rt = $rt[0];
        $id_lamaran = $rt->id_lamaran;
        //ubah status lamaran
        $result2 = DB::table('lamaran')
            ->where('id', $id_lamaran)
            ->update(['tahapan' => 'Remote Test',
            'status' => 'Submitted']);

        //email ke tester
        $rt = DB::table('remote_test')->select()->where('id_lamaran', $id_lamaran  )->get();
        $rt = json_decode($rt);
        $rt = $rt[0];
        $email = $rt->tester_email;

        $lamaran = DB::table('lamaran')->select()->where('id', $id_lamaran  )->get();
        $lamaran = json_decode($lamaran);
        $lamaran = $lamaran[0];

        $token_pelamar = $lamaran->token_pelamar;
        $pelamar = DB::table('pelamar')->select()->where('token', $token_pelamar  )->get();
        $pelamar = json_decode($pelamar);
        $pelamar = $pelamar[0];
        $nama_pelamar = $pelamar->nama;

        $id_lowongan = $lamaran->id_lowongan;
        $lowongan = DB::table('lowongan')->select()->where('id', $id_lowongan  )->get();
        $lowongan = json_decode($lowongan);
        $lowongan = $lowongan[0];
        $nama_lowongan = $lowongan->nama;

        $data = array('link_soal'=>$link_soal, 'link_jawaban'=>$link_jawaban, 'email'=>$email, 'nama_pelamar'=>$nama_pelamar, 'nama_lowongan'=>$nama_lowongan);
        $this->sendMailToTesterAfterSubmit($data)  ;
        
        return $result2;
    }

    public function sendMailToTesterAfterSubmit($data){
        $link_soal = $data['link_soal'];
        $link_jawaban = $data['link_jawaban'];
        $nama_pelamar = $data['nama_pelamar'];
        $nama_lowongan = $data['nama_lowongan'];
        $email = $data['email'];
        
        $text = 'Dear tester, an applicant named ' . $nama_pelamar . ' has just submitted his/her answer for a remote test assignment for ' . $nama_lowongan . '. Assignment = ' . $link_soal . '. Answer = ' . $link_jawaban . '. Please contact people ops after reviewing the answer.';
        $data = array('email'=>$email, 'text'=>$text);
        Mail::send([], $data, function($message) use ($data) {
            $message->to($data['email'], '')
            ->subject('SIRCLO | Please Review This Answer')
            ->setBody($data['text']);
            $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
        });
    }

    /**
     * mulai remote test
     * @param request
     * @return long $id dari hasil penambahan remote test di database
     */
    public function startDateRecord(Request $request){
        $id = $request->id;
        $start_date = $request->start_date;

        $result = DB::table('remote_test')
            ->where('id', $id)
            ->update(['start_date' => $start_date]);
        return $result;
    }

}
