<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

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

}
