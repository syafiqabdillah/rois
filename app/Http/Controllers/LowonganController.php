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
    $this->setStatus();
        $getlowongan = DB::table('lowongan')->select()->where('status','!=','Deleted')->get();
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

    public function getAllActiveLowongan(Request $request){
        $this->setStatus();
            $getlowongan = DB::table('lowongan')->select()->where('status','Active')->get();
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

    public function isDirujuk($id_lowongan){
        $lamaran = DB::table('lamaran')->select()->where('id_lowongan', $id_lowongan)->get();
        $lamaran = json_decode($lamaran);
        $soal = DB::table('soal')->select()->where('id_lowongan', $id_lowongan)->get();
        $soal = json_decode($soal);

        $len = sizeof($lamaran)+sizeof($soal);
        if ($len == 0){
            return false;
        } else {
            return true;
        }
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
         $firstThreeElements = array_slice($result, 1, 4);
       return $firstThreeElements;
        
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
        $isDirujuk = $this->isDirujuk($lowongan->id);
        $lowongan->isDirujuk = $isDirujuk;
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
        $response = DB::table('lowongan')->delete($id);
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

    public function setStatus(){
        $today = date('Y-m-d');
        DB::table('lowongan')
        ->where([['status','Not Active'],['start_date','<=',$today],['end_date','>=',$today]])
        ->update(['status' => 'Active']);

        DB::table('lowongan')
        ->where([['status','Active'],['start_date','>',$today],['end_date','<',$today]])
        ->update(['status' => 'Not Active']);


    }

}
