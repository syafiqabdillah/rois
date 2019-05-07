<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class LowonganController extends Controller
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
    public function getAllTugasOnboarding(Request $request){
        $getlowongan = DB::table('lowongan')->select()->get();
        $lowongans = json_decode($getlowongan, true);
        $result = array();
        foreach($lowongans as $lowongan){
            $lowongan = (object) $lowongan;
            $isDirujuk = $this->isDirujuk($lowongan->id);
            $lowongan = $this->addRequirementAndResponsibility($lowongan);
            $lowongan->isDirujuk = $isDirujuk;
            array_push($result, $lowongan);
        }
        return $result;
    }

    /**
     * membuat suatu lowongan
     * @param request  $request berisi $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil penambahan lowongan di database
     */
    public function createTugasOnboarding(Request $request){
        $nama = $request->nama;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $publish_date = $request->publish_date;
        $divisi = $request->divisi;
        $lokasi = $request->lokasi;
        $tipe = $request->tipe;
        $today = date('Y-m-d');
        $status;
        if($today >= $start_date && $today <= $end_date){
            $status= "Active";
        }
        else{
            $status = "Not Active";
        }
        $id = DB::table('lowongan')->insertGetId(
            ['nama' => $nama, 
            'start_date' => $start_date, 
            'end_date' => $end_date, 
            'publish_date' => $publish_date,
            'divisi' => $divisi,
            'lokasi' => $lokasi,
            'status' => $status,
            'tipe' => $tipe]
        );
        return $id;
    }

    /**
     * mengubah suatu lowongan
     * @param request  $request berisi $id, $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil perubahan lowongan di database
     */
    public function updateTugasOnboarding(Request $request){
        $id_tugas = $request->id;
        $nama = $request->nama;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $publish_date = $request->publish_date;
        $divisi = $request->divisi;
        $lokasi = $request->lokasi;
        $tipe = $request->tipe;

        $result = DB::table('tugas_onboarding')
            ->where('id', $id_tugas)
            ->update(['nama' => $nama, 
            'start_date' => $start_date, 
            'end_date' => $end_date, 
            'publish_date' => $publish_date,
            'divisi' => $divisi,
            'lokasi' => $lokasi,
            'tipe' => $tipe]);
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
