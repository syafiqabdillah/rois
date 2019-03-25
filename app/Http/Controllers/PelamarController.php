<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class PelamarController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function createPelamar(Request $request){
        $token = $request->token;
        $nama = $request->nama;
        $nik = $request->nik;
        $tempat_lahir = $request->tempat_lahir;
        $tanggal_lahir = $request->tanggal_lahir;
        $alamat = $request->alamat;
        $phone = $request->phone;
        $email = $request->email;

        DB::table('pelamar')->insert(
            ['token' => $token,
            'nama' => $nama,
            'nik' => $nik,
            'tempat_lahir' => $tempat_lahir,
            'tanggal_lahir' => $tanggal_lahir,
            'alamat'  => $alamat,
            'phone' => $phone,
            'email' => $email]
        );

        return $token;
    }
}
