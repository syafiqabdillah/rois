<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class TaskController extends Controller
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
     * mengembalikan semua task yang ada
     * @return array $task
     */
    public function getAllTasks(Request $request){
        $get_tasks = DB::table('tugas_onboarding')->select()->get();
        $tasks = json_decode($getTasks, true);
        $result = array();
        foreach($tasks as $tasks){
            $tasks = (object) $tasks;
            array_push($result, $tasks);
        }
        return $result;
    }

    /**
     * mengembalikan suatu task dengan id tertentu
     * @param long  $id id dari task yang ingin diambil
     * @return array $task
     */
    public function getTask($id){
        $task = DB::table('tugas_onboarding')->select()->where('id', $id)->get();
        $task = json_decode($task);
        $task = $task[0];
        return json_encode($task);
    }

    /**
     * membuat suatu task
     * @param request  $request berisi id_supervisor, id_karyawan_onboarding, deskripsi, status, deadline_date, assigned_date, finished_date
     * @return long $id dari hasil penambahan task di database
     */
    public function createTask(Request $request){
        $id_supervisor = $request->id_supervisor;
        $username_karyawan_onboarding = $request->username_karyawan_onboarding;
        $deskripsi = $request->deskripsi;
        $deadline_date = $request->deadline_date;
        $assigned_date = $request->assigned_date;

        $id = DB::table('tugas_onboarding')->insertGetId(
            ['id_supervisor' => $id_supervisor,
            'username_karyawan_onboarding' => $username_karyawan_onboarding,
            'deskripsi' => $deskripsi,
            'status' => 'Not Yet Finished',
            'deadline_date' => $deadline_date,
            'assigned_date' => $assigned_date]
        );
        return $id;
    }

    /**
     * mengubah status suatu task
     * @param request  $request berisi $id lamaran dan $id_tahapan
     * @return long $id id dari hasil perubahan lamaran di database
     */
    public function updateStatusTask(Request $request){
        $id = $request->id;
        $status = $request->status;
        $start_date = $request->start_date;
        $result = DB::table('tugas_onboarding')
            ->where('id', $id)
            ->update(['status' => $status, 'start_date'=>$start_date]);
        
        if ($status == 'Finished'){
            //send email ke supervisor untuk notif bahwa butuh approval 
            $tugas_onboarding = DB::table('tugas_onboarding')->select()->where('id', $id)->get();
            $tugas_onboarding = json_decode($tugas_onboarding);
            $tugas_onboarding = $tugas_onboarding[0];
            $id_karyawan = $tugas_onboarding->id_karyawan;
            $karyawan_onboarding = DB::table('karyawan')->select()->where('id', $id_karyawan)->get();
            $karyawan_onboarding = json_decode($karyawan_onboarding);
            $karyawan_onboarding = $karyawan_onboarding[0];
            $id_supervisor = $karyawan_onboarding->id_supervisor;
            $supervisor = DB::table('karyawan')->select()->where('id', $id_supervisor)->get();
            $supervisor = json_decode($supervisor);
            $supervisor = $supervisor[0];
            $nama = $supervisor->name;
            $email = $supervisor->email;
            $data = array('nama'=>$nama, 'email'=>$email);
            $this->sendMailNotifNeedApproval($data);
        }
        return $result;
    }

    public function sendMailNotifNeedApproval($data){
        $nama = $data['nama'];
        $email = $data['email'];
        
        $text = 'Hi ' . $nama . ', there is a new task that needs your approval. Please go to the website to check it out.';
        $data = array('email'=>$email, 'text'=>$text);
        Mail::send([], $data, function($message) use ($data) {
            $message->to($data['email'], '')
            ->subject('SIRCLO | Approval Needed !')
            ->setBody($data['text']);
            $message->from('second.umarghanis@gmail.com', 'SIRCLO');
        });
    }

    /**
     * menghapus suatu task
     * @param request  $request berisi $id dari task yang ingin dihapus
     * @return long $id id dari hasil penghapusan task di database
     */
    public function deleteTask(Request $request){
        $id = $request->id;
        $response = DB::table('tugas_onboarding')->delete($id);
        return $response;
    }

    public function getAllEmployee(){
        $employee = DB::table('karyawan')->select(DB::raw('id, name, divisi'))->where('id_supervisor', 7)->get();
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
        $alltask = DB::table('tugas_onboarding')->select(DB::raw('nama, DATEDIFF(finished_date, start_date) as days'))->where('id_karyawan', $id)->where('status', 'finished')->get();
        return $alltask;
    }

    public function getAllTaskStatus($id){
        $taskdone = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'finished')->get();
        $taskonprogress = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'on progress')->get();
        $taskassigned = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'assigned')->get();
        $data = array('complete' => $taskdone, 'onprogress'=> $taskonprogress, 'assigned'=> $taskassigned);
        return $data;
    }

    public function getNumberTaskByStatus($id){
        $taskdone = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'finished')->count();
        $taskonprogress = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'on progress')->count();
        $taskassigned = DB::table('tugas_onboarding')->select(DB::raw('nama'))->where('id_karyawan', $id)->where('status', 'assigned')->count();
        $total = $taskdone + $taskonprogress +$taskassigned;
        $data = array('complete' => $taskdone, 'onprogress'=> $taskonprogress, 'assigned'=> $taskassigned, 'total'=>$total);
        return $data;
    }

}
