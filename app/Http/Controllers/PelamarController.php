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

    public function getLowonganName($id_lowongan){
        $nama = DB::table('lowongan')->select('nama')->where('id', $id_lowongan)->get();
        $nama = json_decode($nama);
        $nama = $nama[0];
        $nama = $nama->nama;
        return $nama;
    }

    public function getLamaran($token){
        $lamaran = DB::table('lamaran')->select()->where('token_pelamar', $token)->get();
        $lamaran = json_decode($lamaran);
        $lamaranArr = array();
        foreach($lamaran as $l){
            $newarr = array();
            $id_lowongan = (int) $l->id_lowongan;
            $nama_lowongan = $this->getLowonganName($id_lowongan);
            array_push($newarr, $nama_lowongan, $l->tahapan, $l->status);
            array_push($lamaranArr, $newarr);
        }
        return $lamaranArr;
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
