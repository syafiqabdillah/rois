<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class TugasOnboardingController extends Controller
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
     * mengembalikan semua tugas onboarding yang ada 
     * 
     * @return array $tugas 
     */
    public function getAllTugasOnboarding($id_karyawan){
        $getTugas = DB::table('tugas_onboarding')->select()->where('id_karyawan', $id_karyawan)->get();
        $tugas = json_decode($getTugas, true);
        $result = array();
        foreach ($tugas as $t){
            $t = (object) $t;
            $flag = $this->getStatus($t->id);
            $t->flag = $flag;
            array_push($result, $t);
        }
        return $result;
    }

    /**
     * fungsi yang mengembalikan 0 untuk status On Progress dan Assigned, dan 1 untuk status Finished, Approved dan Rejected
     */
    public function getStatus($id_tugas){
        $getTugas = DB::table('tugas_onboarding')->select()->where('id', $id_tugas)->get();
        $tugas = json_decode($getTugas);
        foreach ($tugas as $t){
            if ($t->status == 'approved') {
                return 1;
            } else if ($t->status == 'rejected') {
                return 1;
            } else if ($t->status == 'finished') {
                return 1;
            } else if ($t->status == 'on progress') {
                return 0;
            } else if ($t->status == 'assigned') {
                return 0;
            }
        }
    }

    /**
     * membuat suatu lowongan
     * @param request  $request berisi $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil penambahan lowongan di database
     */
    public function createTugasOnboarding(Request $request){
        $deskripsi= $request->deskripsi;
        $id_karyawan = $request->id_karyawan;
        $status = $request->status;
        $assigned_date =  $request->assigned_date;
        $nama = $request->nama;
       
        $id = DB::table('tugas_onboarding')->insertGetId(
            [
            'id_karyawan' => $id_karyawan, 
            'deskripsi'=> $deskripsi, 
            'status' => $status,
            'assigned_date' => $assigned_date,
            'nama' => $nama
            ]);

        //email ke karyawan onboarding, notif bahwa ia dapat task baru
        $karyawan = DB::table('karyawan')->select()->where('id', $id_karyawan)->get();
        $karyawan = json_decode($karyawan);
        $karyawan = $karyawan[0];

        $nama = $karyawan->name;
        $email = $karyawan->email;
        $data = array('nama'=>$nama, 'email'=>$email);
        $this->sendMailNotifNewTask($data);

        return $id;
    }

    public function sendMailNotifNewTask($data){
        $nama = $data['nama'];
        $email = $data['email'];
        
        $text = 'Hi ' . $nama . ', you have been assigned to a new onboarding task. Please go to our website to check it out.';
        $data = array('email'=>$email, 'text'=>$text);
        Mail::send([], $data, function($message) use ($data) {
            $message->to($data['email'], '')
            ->subject('SIRCLO | You Got New Task !')
            ->setBody($data['text']);
            $message->from('second.umarghanis@gmail.com', 'SIRCLO');
        });
    }

    public function getTemplateTask(){
        $template_task = DB::table('template_task')->select()->get();
        $template_task = json_decode($template_task, true);
        return json_encode($template_task);
    }

    /**
     * mengubah suatu lowongan
     * @param request  $request berisi $id, $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil perubahan lowongan di database
     */
    public function updateTugasOnboarding(Request $request){
        $id_tugas = $request->id;
        $deskripsi = $request->deskripsi;
        $nama = $request->nama;

        $result = DB::table('tugas_onboarding')
            ->where('id', $id_tugas)
            ->update(['deskripsi' => $deskripsi,
            'nama' => $nama
            
            ]);
        return $result;
    }

    /**
     * menghapus suatu tugas onboarding
     * @param request  $request berisi $id dari lowongan yang ingin dihapus
     * @return long $id id dari hasil penghapusan lowongan di database
     */
    public function deleteTugasOnboarding(Request $request){
        $id = $request->id;
        $response = DB::table('tugas_onboarding')->delete($id);
        return $response;
    }

  
    /**
     * mengubah status dari suatu tugas
     */
    public function changeTaskStatus(Request $request){
        $tasksId = $request->tasksId;
        $status = $request->status;
        $finished_date = $request->finished_date;
        
        foreach($tasksId as $id){
            DB::table('tugas_onboarding')
            ->where('id', $id)
            ->update(['status' => $status, 'finished_date'=> $finished_date]);
        }
        return response()->json(['message'=>'success', 'status'=>200]);
    }
}
