<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

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
        return $tugas;
    }

    /**
     * membuat suatu lowongan
     * @param request  $request berisi $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil penambahan lowongan di database
     */
    public function createTugasOnboarding(Request $request){
        $deskripsi= $request->deskripsi;
        $deadline_date = $request->deadline_date;
      
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
        return $id;
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

  

   

}
