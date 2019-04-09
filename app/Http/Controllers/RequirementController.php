<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class RequirementController extends Controller
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
     * membuat suatu requirement untuk suatu lowongan 
     * @param request  $request berisi $nama, $id_lowongan
     * @return long $id id dari hasil penambahan requirement di database
     */
    public function createRequirement(Request $request){

        $id_lowongan = $request->id_lowongan;
        $list_desc = $request ->deskripsi;
       
         $list_desc_name = array();

         foreach($list_desc as $deskripsi){
             array_push($list_desc_name, $deskripsi);
           
         }

         foreach($list_desc_name as $name){
            //  $count=0;
             $id= DB :: table('requirement') -> insertGetId(
                 [
                 'id_lowongan' => $id_lowongan,
                 'deskripsi' => $name
                 ]
                 );

         }

         return json_encode($list_desc_name);
    }

    /**
     * mengubah suatu requirement
     * @param request  $request berisi $id, $nama, $id_lowongan
     * @return long $id id dari hasil perubahan requirement di database
     */
    public function updateRequirement(Request $request){
        $id = $request->id;
        $deskripsi = $request->deskripsi;
        $id_lowongan = $request->id_lowongan;
        
        $result = DB::table('requirement')
            ->where('id', $id)
            ->update(['deskripsi' => $deskripsi, 
            'id_lowongan' => $id_lowongan]);
        return $result;
    }

    /**
     * menghapus suatu requirement
     * @param request  $request berisi $id dari requirement yang ingin dihapus
     * @return long $id id dari hasil penghapusan requirement di database
     */
    public function deleteRequirement(Request $request){
        $id = $request->id;
        $response = DB::table('requirement')
        ->where('id', $id)
        ->delete();       
        return $response;
    }
    
}
