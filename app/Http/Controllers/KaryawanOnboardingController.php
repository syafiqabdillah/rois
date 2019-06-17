<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class KaryawanOnboardingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function getKaryawanOnboarding($id){
        $karyawan_onboarding = DB::table('karyawan')->select()->where('id', $id)->get();
        $karyawan_onboarding = json_decode($karyawan_onboarding);
        $karyawan_onboarding = $karyawan_onboarding[0];
        $email_supervisor = DB::table('karyawan')->select('email')->where('id', $karyawan_onboarding->id_supervisor)->get();
        $nama_supervisor = DB::table('karyawan')->select('name')->where('id', $karyawan_onboarding->id_supervisor)->get();
        $karyawan_onboarding->email_supervisor = $email_supervisor[0]->email;
        $karyawan_onboarding->nama_supervisor = $nama_supervisor[0]->name;
        return json_encode($karyawan_onboarding);
    }

    public function getNamaKaryawanOnboarding($id_karyawan){
        $karyawan_onboarding = DB::table('karyawan')->select('name')->where('id', $id_karyawan)->get();
        $karyawan_onboarding = json_decode($karyawan_onboarding);
        $karyawan_onboarding = $karyawan_onboarding[0];
        return json_encode($karyawan_onboarding);
    }

    /**
     * mengembalikan tasks list suatu karyawan dengan id karyawan onboarding tertentu
     * @param long  $id id dari karyawan yang tasks listnya ingin diambil
     * @return array $tasks list
     */
    public function getTasksKaryawan($id){
        $tasks_karyawan = DB::table('tugas_onboarding')->select()->where('id_karyawan', $id)->get();
        $tasks_karyawan = json_decode($tasks_karyawan);
        
        // $approved = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Approved')->count();
        // $taskdone = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Finished')->count();
        // $taskonprogress = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'On Progress')->count();
        // $taskassigned = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'Assigned')->count();
        // $total = $taskdone + $taskonprogress +$taskassigned + $approved;

        // $data = array('approved'=>$approved, 'complete' => $taskdone, 'onprogress'=> $taskonprogress, 'assigned'=> $taskassigned, 'total'=>$total);
        // $tasks_karyawan['data'] = $data;

        return $tasks_karyawan;
    }

    /**
    * mengirim email notif ke supervisor
    * @param request  $request berisi $email
    * @return String $email email dari lamaran
    */
    public function sendMailRequestForApproval(Request $request){
        $namaKaryawan = $request->namaKaryawan;
        $divisiKaryawan = $request->divisiKaryawan;
        $namaSupervisor = $request->namaSupervisor;
        $emailSupervisor = $request->emailSupervisor;
  
        $text = 'Dear ' . $namaSupervisor . ', One of the onboarding staffs under your supervision, ' . $namaKaryawan . ' from the ' . $divisiKaryawan . ' divison, has just finished a task and have requested for your approval. You can check it on the SIRCLOs onboarding system.';
        $data = array('email'=>$emailSupervisor, 'text'=>$text);
  
        Mail::send([], $data, function($message) use ($data) {
           $message->to($data['email'], '')
           ->subject('SIRCLO | An Onboarding Staff Have Requested for An Approval')
           ->setBody($data['text']);
           $message->from('second.umarghanis@gmail.com', 'Onboarding SIRCLO');
        });
     }

}
