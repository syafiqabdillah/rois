<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function register(Request $request){
        $data = json_decode($request);
        return $data;
        // $nama = $request->input('nama');
        // $nik = $request->input('nik');
        // $tempat_lahir = $request->input('tempat_lahir');

        // $tanggal_lahir = $request->input('tanggal_lahir');
        // $alamat = $request->input('alamat');
        // $phone = $request->input('phone');
        // $email = $request->input('email');

        // // DB::table('pelamar')->insert(
        // //     ['token' => $token,
        // //     'nama' => $nama,
        // //     'nik' => $nik,
        // //     'tempat_lahir' => $tempat_lahir,

        // //     'tanggal_lahir' => $tanggal_lahir,
        // //     'alamat'  => $alamat,
        // //     'phone' => $phone,
        // //     'email' => $email]
        // // );

        // return gettype($request);
    }


    public function login(Request $request){
        //$r = parse_str($)
        //$pelamar = DB::table('pelamar')->select()->where('token', $token)->get();
        //return json_encode($request);
        //$qweqw = parse_url($request);
        return $request; 
    }

}
