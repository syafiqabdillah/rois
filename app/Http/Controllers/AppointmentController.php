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

       $text = 'Dear Applicant,'.'We Invite you to interview session at : '.' Date: '.$date.' Time : '.$start. ' - '.$finish.' Location : '.$location;
       $data = array('email'=>$email, 'text'=>$text);

       Mail::send([], $data, function($message) use ($data) {
           $message->to($data['email'], '')
           ->subject('SIRCLO | Interview invitation')
           ->setBody($data['text']);
           $message->from('second.umarghanis@gmail.com', 'Career SIRCLO');
       });

   }

   public function getAllEmployee($id){
       $employee = DB::table('karyawan')->select(DB::raw('id, name, divisi'))->where('id_supervisor', $id)->get();
       $result = array();
       $emp = json_decode($employee, true);
       foreach ($emp as $epl) {
         $profile = (object) $epl;
         $progress = $this->getNumberTaskByStatus($profile->id);
         $epl = array('profile'=>$profile, 'progress'=>$progress);
         array_push($result, $epl);
       }
       return $result;
   }

   public function getEmployeeProfile($id){
       $employee = DB::table('karyawan')->select(DB::raw('name, divisi'))->where('id', $id)->get();
       return $employee;
   }

   public function taskComplete($id){
       //$alltask = DB::table('tugas_onboarding')->select(DB::raw('nama, DATEDIFF(finished_date, start_date) + 1 as days'))->where('id_karyawan', $id)->where('status', 'Approved')->get();
	   $alltask = DB::table('tugas_onboarding')->select(DB::raw('nama, (finished_date - start_date) + 1 as day'))->where('id_karyawan', $id)->where('status', 'Approved')->get();
       return $alltask;
   }

   public function getAllTaskStatus($id){
       $taskdone = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Approved')->get();
       $taskonprogress = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'On Progress')->get();
       $taskassigned = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Assigned')->get();
       $data = array('taskdone' => $taskdone, 'onprogress'=> $taskonprogress, 'assigned'=> $taskassigned);
       return $data;
   }

   public function getNumberTaskByStatus($id){
        $taskdone = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Approved')->count();
       $waiting = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Finished')->count();
       $taskonprogress = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'On Progress')->count();
       $taskassigned = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Assigned')->count();
       
       $total = $taskdone + $taskonprogress + $taskassigned + $waiting;
       
       $data = array( 'taskdone' => $taskdone, 'onprogress'=> $taskonprogress, 'assigned'=> $taskassigned, 'waiting'=> $waiting, 'total'=>$total);
       return $data;
   }

}
