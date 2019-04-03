<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class SoalController extends Controller
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
     * mengembalikan semua soal yang ada 
     * @return array $soal 
     */
    public function getAllSoal(Request $request){
        $getSoal = DB::table('soal')->select()->get();
        $soals = json_decode($getSoal, true);
        $result = array();
        foreach($soals as $soal){
            $soal = (object) $soal;
            $isDirujuk = $this->isDirujuk($soal->id);
            $soal = $this->addNamaLowongan($soal);
            $soal->isDirujuk = $isDirujuk;
            array_push($result, $soal);
        }
        return $result;
    }

    public function isDirujuk($id_soal){
        $remote_test = DB::table('remote_test')->select()->where('id_soal', $id_soal)->get();
        $remote_test = json_decode($remote_test);
        $len = sizeof($remote_test);
        if ($len == 0){
            return false;
        } else {
            return true;
        }
    }

    /**
     * mengembalikan suatu soal dengan id tertentu 
     * @param long  $id id dari soal yang ingin diambil 
     * @return array $soal 
     */
    public function getSoal($id){
        $soal = DB::table('soal')->select()->where('id', $id)->get();
        $soal = json_decode($soal);
        $soal = $soal[0];
        $soal = $this->addNamaLowongan($soal);
        return json_encode($soal);
    }

     /**
     * mengembalikan soal yang udah berisi nama lowongan
     */
    public function addNamaLowongan($arr){
        $soal = $arr;
        $nama_lowongan = DB::table('lowongan')->select('nama')->where('id', $soal->id_lowongan)->get();
        $soal->lowongan = $nama_lowongan[0]->nama;
        return $soal;
    }

    /**
     * membuat suatu soal
     * @param request  $request berisi $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil penambahan soal di database
     */
    public function createSoal(Request $request){
        $nama = $request->nama;
        $id_lowongan = $request->id_lowongan;
        $nama_karyawan = $request->nama_karyawan;
        $link = $request->link;
        date_default_timezone_set('Asia/Jakarta');
        $created_date = date('Y-m-d H:i:s', time());

        $id = DB::table('soal')->insertGetId(
            ['nama' => $nama, 
            'id_lowongan' => $id_lowongan, 
            'nama_karyawan' => $nama_karyawan, 
            'created_date' => $created_date,
            'link' => $link]
        );
        return $id;
    }

    /**
     * mengubah suatu soal
     * @param request  $request berisi $id, $nama, $id_lowongan, $nama_karyawan
     * @return long $id id dari hasil perubahan soal di database
     */
    public function updateSoal(Request $request){
        $id = $request->id;
        $nama = $request->nama;
        $id_lowongan = $request->id_lowongan;
        $nama_karyawan = $request->nama_karyawan;
        $link = $request->link;
        date_default_timezone_set('Asia/Jakarta');
        $created_date = date('Y-m-d H:i:s', time());

        $result = DB::table('soal')
            ->where('id', $id)
            ->update(['nama' => $nama, 
            'id_lowongan' => $id_lowongan, 
            'nama_karyawan' => $nama_karyawan, 
            'created_date' => $created_date,
            'link' => $link]);
        return $result;
    }

    /**
     * menghapus suatu soal
     * @param request  $request berisi $id dari soal yang ingin dihapus
     * @return long $id id dari hasil penghapusan soal di database
     */
    public function deleteSoal(Request $request){
        $id = $request->id;
        $response = DB::table('soal')->delete($id);
        return $response;
    }
}
