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

    public function getKaryawanOnboarding($username){
        $karyawan_onboarding = DB::table('karyawan')->select()->where('username', $username)->get();
        $karyawan_onboarding = json_decode($karyawan_onboarding);
        $karyawan_onboarding = $karyawan_onboarding[0];
        return json_encode($karyawan_onboarding);
    }

    /**
     * mengembalikan tasks list suatu karyawan dengan id karyawan onboarding tertentu
     * @param long  $id id dari karyawan yang tasks listnya ingin diambil
     * @return array $tasks list
     */
    public function getTasksKaryawan($username){
        $tasks_karyawan = DB::table('tugas_onboarding')->select()->where('username_karyawan_onboarding', $username)->get();
        $tasks_karyawan = json_decode($tasks_karyawan);
        return $tasks_karyawan;
    }

}
