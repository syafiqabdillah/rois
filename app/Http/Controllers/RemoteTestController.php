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
        $email = $request->email;
        $nama = $request->nama;

        $id = DB::table('remote_test')->insertGetId(
            ['id_lamaran' => $id_lamaran,
            'duration' => $duration,
            'tester_email' => $tester_email,
            'expired_date' => $expired_date,
            'id_soal' => $id_soal,
            'active' => 'yes']
        );

        $result = DB::table('lamaran')
            ->where('id', $id_lamaran)
            ->update(['tahapan' => 'Remote Test',
            'status' => 'Assigned']);

        $data = array('email'=>$email, 'duration'=>$duration, 'tester_email'=>$tester_email, 'expired_date'=>$expired_date, 'nama'=>$nama);
        $this->sendMailRemoteTest($data);
        return $id;
    }

    /**
     * submit jawaban remote test
     * @param request
     * @return long $id dari hasil penambahan remote test di database
     */
    public function submitJawaban(Request $request){
        $id = $request->id;
        $link_jawaban = $request->link_jawaban;

        $result = DB::table('remote_test')
            ->where('id', $id)
            ->update(['link_jawaban' => $link_jawaban, 'active'=>'no']);

        DB::table('lamaran')
            ->where('id', $id_lamaran)
            ->update(['tahapan' => 'Remote Test',
            'status' => 'Submitted']);

        return $result;
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

    /**
     * mengirim email info remote test
     */
    public function sendMailRemoteTest($data){
       $email = $data['email'];
       $duration = $data['duration'];
       $tester_email = $data['tester_email'];
       $expired_date = $data['expired_date'];
       $nama = $data['nama'];

       $text = 'Dear ' . $nama . ', We have assigned you a remote test assignment that is due until ' . $expired_date . '. You can check it on the SIRCLOs Recruitment website. Once you start the assigment, you have ' . $duration . ' day(s) to finish it and submit the answer link to us at the website. If you have any questions, feel free to ask '. $tester_email . ' (your evaluator) for further details regarding the remote test.';
       $data = array('email'=>$email, 'text'=>$text);

       Mail::send([], $data, function($message) use ($data) {
           $message->to($data['email'], '')
           ->subject('SIRCLO | Remote Test Assignment')
           ->setBody($data['text']);
           $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
       });
   }

}
