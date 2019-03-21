<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class ExperienceController extends Controller
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
    public function createExperience(Request $request){
        $nama = $request->nama;
        $id_lowongan = $request->id_lowongan;

        $id = DB::table('requirement')->insertGetId(
            ['nama' => $nama, 
            'id_lowongan' => $id_lowongan]
        );
        return $id;
    }
    
}
