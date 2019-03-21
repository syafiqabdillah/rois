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
        $deskripsi = $request->deskripsi;
        $id_lowongan = $request->id_lowongan;

        $id = DB::table('responsibility')->insertGetId(
            ['deskripsi' => $deskripsi, 
            'id_lowongan' => $id_lowongan]
        );
        return $id;
    }

    /**
     * mengubah suatu responsibility
     * @param request  $request berisi $id, $nama, $id_lowongan
     * @return long $id id dari hasil perubahan responsibility di database
     */
    public function updateResponsibility(Request $request){
        $id = $request->id;
        $deskripsi = $request->deskripsi;
        $id_lowongan = $request->id_lowongan;
        
        $result = DB::table('responsibility')
            ->where('id', $id)
            ->update(['deskripsi' => $deskripsi, 
            'id_lowongan' => $id_lowongan]);
        return $result;
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
}