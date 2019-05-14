<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

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
        $result = DB::table('tugas_onboarding')
            ->where('id', $id)
            ->update(['status' => $status]);

        return $result;
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

}