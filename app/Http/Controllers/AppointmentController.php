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
        $email = $request->email;

        $id = DB::table('appointment')->insertGetId(
            ['id_lamaran' => $id_lamaran,
            'date' => $date,
            'start' => $start,
            'end' => $end,
            'lokasi' => $lokasi,
            'interviewer' => $interviewer]
        );

        $result = DB::table('lamaran')
            ->where('id', $id_lamaran)
            ->update(['tahapan' => 'Interview',
            'status' => 'On going']);

        $data = array('email'=>$email, 'date'=>$date, 'start'=>$start, 'end'=>$end, 'location'=>$lokasi);
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
    public function sendMailInvitation($data){
       $email = $data['email'];
       $date = $data['date'];
       $start = $data['start'];
       $finish = $data['end'];
       $location = $data['location'];

       $text = 'Dear Applicant,\n'.'We Invite you to interview session at : \n'.' Date: '.$date.'\n Time : '.$start. ' - '.$finish.'\n Location : '.$location;
       $data = array('email'=>$email, 'text'=>$text);

       Mail::send([], $data, function($message) use ($data) {
           $message->to($data['email'], '')
           ->subject('SIRCLO | Interview invitation')
           ->setBody($data['text']);
           $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
       });

   }

}
