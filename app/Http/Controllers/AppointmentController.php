<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;



class AppointmentController extends Controller
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
     * mengembalikan semua appointment yang ada
     * @return array $app
     */
    public function getAllAppointment(Request $request){
        $getApp = DB::table('appointment')->select()->get();
        $apps = json_decode($getApp, true);
        $result = array();
        foreach($apps as $app){
            $app = (object) $app;
            $app = $this->addNamaPelamarPhonePelamarEmailPelamar($app);
            array_push($result, $app);
        }
        return $result;
    }



    /**
     * membuat suatu appointment
     * @param request  $request berisi $id_lamaran, $date, $start, $end dan $lokasi
     * @return long $id id dari hasil penambahan appointment di database
     */
    public function createAppointment(Request $request){
        $id_lamaran = $request->id_lamaran;
        $date = $request->date;
        $start = $request->start;
        $end = $request->end;
        $lokasi = $request->lokasi;
        $interviewer = $request->interviewer;

        $id = DB::table('appointment')->insertGetId(
            ['id_lamaran' => $id_lamaran,
            'date' => $date,
            'start' => $start,
            'end' => $end,
            'lokasi' => $lokasi,
            'interviewer' => $interviewer]
        );

        $data = array('date'=>$date, 'start'=>$end, 'end'=>$end, 'location'=>$lokasi);
        $this->sendMailInvitation($data);
        return $id;
    }

    /**
     * mengembalikan lamaran yang udah berisi nama lowongan
     */
    public function addNamaPelamarPhonePelamarEmailPelamar($arr){
        $appointment = $arr;

        $lamaran = DB::table('lamaran')->select()->where('id', $appointment->id_lamaran)->get();
        $token = $lamaran[0]->token_pelamar;
        $pelamar = DB::table('pelamar')->select('nama', 'phone', 'email')->where('token', $token)->get();
        $pelamar = $pelamar[0];
        $appointment->pelamar = $pelamar->nama;
        $appointment->phone = $pelamar->phone;
        $appointment->email = $pelamar->email;
        return $appointment;
    }

    /**
     * mengirim email invitation
     */
    public function sendMailInvitation(){
       $email = 'fairuzyassar7@gmail.com';
       $date ='2019-08-30';
       $start = '12:00';
       $finish = '13:00';
       $location = 'BSD';

       $text = 'Dear Applicant,'.'We Invite you to interview session at : '.'Date: '.$date.'Time : '.$start. ' - '.$finish.' Location : '.$location;
       $data = array('email'=>$email, 'text'=>$text);

       Mail::send([], $data, function($message) use ($data) {
           $message->to($data['email'], '')
           ->subject('SIRCLO | Interview invitation')
           ->setBody($data['text']);
           $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
       });

   }

}
