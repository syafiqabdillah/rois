<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

setlocale(LC_MONETARY, 'id_ID');

class LamaranController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function createLamaran(Request $request){
        $id_lowongan = $request->id_lowongan;
        $token_pelamar = $request->token_pelamar;
        $salary_expectation = $request->salary_expectation;
        $cover_letter = $request->cover_letter;
        $id_tahapan = 1;

        $id = DB::table('lamaran')->insertGetId(
            ['id_lowongan' => $id_lowongan,
            'token_pelamar' => $token_pelamar,
            'salary_expectation' => $salary_expectation,
            'cover_letter' => $cover_letter,
            'id_tahapan' => $id_tahapan]
        );
        return $id;
    }

    /**
     * mengubah tahapan suatu lamaran
     * @param request  $request berisi $id lamaran dan $id_tahapan
     * @return long $id id dari hasil perubahan lamaran di database
     */
    public function updateTahapanLamaran(Request $request){
        $id = $request->id;
        $tahapan = $request->tahapan;
        $status = $request->status;

        $result = DB::table('lamaran')
            ->where('id', $id)
            ->update(['tahapan' => $tahapan,
            'status' => $status]);
        return $result;
    }

    public function getAllLamaran(Request $request){
        $lamarans = DB::table('lamaran')->select()->get();
        $lamarans = json_decode($lamarans, true);

        $result = array();
        foreach($lamarans as $lamaran){
            $lamaran = (object) $lamaran;
            $lamaran = $this->addNamaLowonganNamaPelamar($lamaran);
            array_push($result, $lamaran);
        }
        return $result;
    }

    public function getLamaran($id){
        $lamaran = DB::table('lamaran')->select()->where('id', $id)->get();
        $lamaran = json_decode($lamaran);
        $lamaran = $lamaran[0];
        $lamaran = $this->addNamaLowonganNamaPelamar($lamaran);
        return json_encode($lamaran);
    }

    /**
     * mengembalikan lamaran yang udah berisi nama lowongan
     */
    public function addNamaLowonganNamaPelamar($arr){
        $lamaran = $arr;

        //nama lowongan
        $nama_lowongan = DB::table('lowongan')->select('nama')->where('id', $lamaran->id_lowongan)->get();
        $lamaran->lowongan = $nama_lowongan[0]->nama;

        //nama pelamar
        $nama_pelamar = DB::table('pelamar')->select('nama')->where('token', $lamaran->token_pelamar)->get();
        $lamaran->pelamar = $nama_pelamar[0]->nama;

        return $lamaran;
    }

}
