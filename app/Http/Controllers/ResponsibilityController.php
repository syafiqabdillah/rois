<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class ResponsibilityController extends Controller
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
     * membuat suatu responsibility untuk suatu lowongan 
     * @param request  $request berisi $nama, $id_lowongan
     * @return long $id id dari hasil penambahan responsibility di database
     */
    public function createResponsibility(Request $request){
        $id_lowongan = $request->id_lowongan;
        $list_desc = $request ->deskripsi;
       
         $list_desc_name = array();

         foreach($list_desc as $deskripsi){
             array_push($list_desc_name, $deskripsi);
           
         }

         foreach($list_desc_name as $name){
             $id= DB :: table('responsibility') -> insertGetId(
                 [
                 'id_lowongan' => $id_lowongan,
                 'deskripsi' => $name
                 ]
                 );

         }

         return json_encode($list_desc_name);
    }
    /**
     * mengubah suatu responsibility
     * @param request  $request berisi $id, $nama, $id_lowongan
     * @return long $id id dari hasil perubahan responsibility di database
     */
    public function updateResponsibility(Request $request){
        $id_lowongan = $request->id_lowongan;

        $response_delete = DB::table('responsibility')
        ->where('id_lowongan',$id_lowongan)
        ->delete();

        // $id = $request->id;
        // $deskripsi = $request->deskripsi;
        // $id_lowongan = $request->id_lowongan;
        
        // $result = DB::table('responsibility')
        //     ->where('id', $id)
        //     ->update(['deskripsi' => $deskripsi, 
        //     'id_lowongan' => $id_lowongan]);
       $creating_new= $this->createResponsibility($request);

        return $creating_new;
    }

    /**
     * menghapus suatu responsibility
     * @param request  $request berisi $id dari responsibility yang ingin dihapus
     * @return long $id id dari hasil penghapusan responsibility di database
     */
    public function deleteResponsibility(Request $request){
        $id = $request->id;
        
        $response = DB::table('responsibility')
        ->where('id', $id)
        ->delete();       
        return $response;
    }

    public function getResponsibility($id_lowongan){
        $result  = array();
        $get_req = DB::table('responsibility')->select()
        -> where('id_lowongan', $id_lowongan)
        ->get();

        foreach($get_req as $responsibility){
            $responsibility = (object) $responsibility;
            array_push($result, $responsibility);
        }
        return $result;

       
    }

}
