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
     * mengembalikan semua lowongan yang ada 
     * dengan requirement dan responsiblity dari masing masing lowongan tersebut 
     * @return array $lowongan lowongan yang telah terisi requirement dan responsibility 
     */
    public function getAllLowongan(Request $request){
        $getlowongan = DB::table('lowongan')->select()->get();
        $lowongans = json_decode($getlowongan, true);
        $result = array();
        foreach($lowongans as $lowongan){
            $lowongan = (object) $lowongan;
            $lowongan = $this->addRequirementAndResponsibility($lowongan);
            array_push($result, $lowongan);
        }
        return $result;
    }

  /**
     * mengembalikan list of lowongan terkait yang memiliki divisi dan tipe tertentu.
     * dengan requirement dan responsiblity dari lowongan tersebut 
     * @param string  $id divisi yang ingin diambil related lowongannya
     * @return      array $lowongan lowongan yang telah terisi requirement dan responsibility 
     */
    public function getRelatedLowongan($id){
        $lowongan_now = $this->getLowongan($id);
        $lowongan_now = json_decode($lowongan_now);
        
         $tipe = $lowongan_now->tipe;
         $divisi= $lowongan_now->divisi;


         $getrelated_lowongan = DB::table('lowongan') 
         ->where('id', '!=', $id)
         ->where(function ($query) use ($tipe, $divisi) {
             $query->where('tipe',$tipe)
                   ->orWhere('divisi' , $divisi);
         })
         ->get();

        $related_lowongan = json_decode($getrelated_lowongan, true);
         $result = array();
         foreach($related_lowongan as $lowongan){
             $lowongan = (object) $lowongan;
             $lowongan = $this->addRequirementAndResponsibility($lowongan);
             array_push($result, $lowongan);
         }
       return $result;
        
    }

    /**
     * mengembalikan suatu lowongan dengan id tertentu 
     * dengan requirement dan responsiblity dari lowongan tersebut 
     * @param long  $id id dari lowongan yang ingin diambil 
     * @return      array $lowongan lowongan yang telah terisi requirement dan responsibility 
     */
    public function getLowongan($id){
        $lowongan = DB::table('lowongan')->select()->where('id', $id)->get();
        $lowongan = json_decode($lowongan);
        $lowongan = $lowongan[0];
        $lowongan = $this->addRequirementAndResponsibility($lowongan);
        return json_encode($lowongan);
    }

    /**
     * membuat suatu lowongan
     * @param request  $request berisi $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil penambahan lowongan di database
     */
    public function createLowongan(Request $request){
        $nama = $request->nama;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $publish_date = $request->publish_date;
        $divisi = $request->divisi;
        $lokasi = $request->lokasi;
        $tipe = $request->tipe;
        // $list_requirement = $request->requirements;
        // $list_responsibilities = $request->responsibility;

        $id = DB::table('lowongan')->insertGetId(
            ['nama' => $nama, 
            'start_date' => $start_date, 
            'end_date' => $end_date, 
            'publish_date' => $publish_date,
            'divisi' => $divisi,
            'lokasi' => $lokasi,
            'tipe' => $tipe]
        
        // $id = DB::table('requirement')-> insertGetId(

        //     // ['deskripsi' =>....,
        //     // 'id_lowongan'=>.... ]
        // ),
        // $id= DB::table('responsibility')-> insertGetId(
        //     // ['deskripsi' =>....,
        //     // 'id_lowongan'=>.... ]
        );
        return $id;
    }

    public function createResponsibility(Request $request){
        $id_lowongan = $request->id_lowongan;
        $deskripsi = $request -> deskripsi;

        $id= DB :: table('responsibility') -> insertGetId(
            [
            'id_lowongan' => $id_lowongan,
            'deskripsi' => $deskripsi
            ]
            );
            return $id;
    }

    public function createRequirement(Request $request){
        $id_lowongan = $request->id_lowongan;
        $deskripsi = $request -> deskripsi;

        $id= DB :: table('requirement') -> insertGetId(
            [
            'id_lowongan' => $id_lowongan,
            'deskripsi' => $deskripsi
            ]
            );
            return $id;
    }

    /**
     * mengubah suatu lowongan
     * @param request  $request berisi $id, $nama, $start_date, $end_date, $publish_date dan $image_name
     * @return long $id id dari hasil perubahan lowongan di database
     */
    public function updateLowongan(Request $request){
        $id_lowongan = $request->id;
        $nama = $request->nama;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $publish_date = $request->publish_date;
        $divisi = $request->divisi;
        $lokasi = $request->lokasi;
        $tipe = $request->tipe;

        $result = DB::table('lowongan')
            ->where('id', $id_lowongan)
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
     * menghapus suatu lowongan
     * @param request  $request berisi $id dari lowongan yang ingin dihapus
     * @return long $id id dari hasil penghapusan lowongan di database
     */
    public function deleteLowongan(Request $request){
        $id = $request->id;
        echo($id);
        
        $response = DB::table('lowongan')
        ->where('id', $id)
        ->delete();       
        return $response;
    }

    /**
     * mengembalikan lowongan dengan requirement dan responsiblity yang bersangkutan 
     * @param array  $arr lowongan yang akan ditampilkan requirement dan responsibilitynya 
     * @return array $lowongan lowongan yang telah terisi requirement dan responsibility 
     */
    public function addRequirementAndResponsibility($arr){
        $lowongan = $arr;
        //ambil requirement
        $reqs_raw = DB::table('requirement')->select()->where('id_lowongan', $lowongan->id)->get();
        $reqs = json_decode($reqs_raw);
        $lowongan->requirement = $reqs;
        //ambil responsibilities
        $resp_raw = DB::table('responsibility')->select()->where('id_lowongan', $lowongan->id)->get();
        $reps = json_decode($resp_raw);
        $lowongan->responsibility = $reps;
        return $lowongan;
    }

}
