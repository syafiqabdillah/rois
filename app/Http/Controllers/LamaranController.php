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

    public function uploadCV(Request $request){
        if($request->hasFile('file')){
            $token = $request->input('token');
            $id_lowongan = $request->input('id_lowongan');
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension(); // getting image extension
            $filename =time().'.'.$extension;
            $filename =$token.'_'.$id_lowongan.'.'.$extension;
            $file->move('uploads/', $filename);
            return response()->json(['message'=>'success', 'status'=>200]);
        } else {
            return response()->json(['message'=>'failed', 'status'=>500]);
        }

    }

    public function createLamaran(Request $request){
        $id_lowongan = $request->input('id_lowongan');
        $token_pelamar = $request->input('token_pelamar');
        $salary_expectation = $request->input('salary_expectation');
        $cover_letter = $request->input('cover_letter');
        $tahapan = "Administration";
        $status = "Submitted";
        $skill = $request->input('skill');
        $experience = $request->input('experience');

        //$file = $request->input('file');

        // $pdf_decoded = base64_decode ($file);
        // $pdf = fopen ('test.pdf','w');
        // fwrite ($pdf,$pdf_decoded);
        // fclose($pdf);


        $id_lamaran = DB::table('lamaran')->insertGetId(
            ['id_lowongan' => $id_lowongan,
            'token_pelamar' => $token_pelamar,
            'salary_exp' => $salary_expectation,
            'cover_letter' => $cover_letter,
            'tahapan' => $tahapan,
            'status' => $status,
            'skill' => $skill,
            'experience' => $experience
            ]
        );

        $id_lamaran = (int) $id_lamaran;

        $skills = explode(",", $skill);
        foreach($skills as $s){
            //create skill
            DB::table('skill')->insertGetId(
                ['deskripsi' => $s,
                'id_lamaran' => $id_lamaran]
            );
        }

        $experiences = explode(",", $experience);
        foreach($experiences as $e){
            //create experience
            DB::table('experience')->insertGetId(
                ['deskripsi'=>$e,
                'id_lamaran'=>$id_lamaran]
            );
        }

        return $skills;
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
