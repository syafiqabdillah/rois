<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class RemoteTestController extends Controller
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
     * mengembalikan semua remote test yang ada
     * @return array $remote test
     */
    public function getAllRemoteTest(Request $request){
        $getRT = DB::table('remote_test')->select()->get();
        $rts = json_decode($getRT, true);
        $result = array();
        foreach($rts as $rt){
            $rt = (object) $rt;
            array_push($result, $rt);
        }
        return $result;
    }

    /**
     * mengembalikan suatu remote test dengan id tertentu
     * @param long  $id id dari remote test yang ingin diambil
     * @return      array $remote test
     */
    public function getRemoteTest($id){
        $rt = DB::table('remote_test')->select()->where('id', $id)->get();
        $rt = json_decode($rt);
        $rt = $rt[0];
        return json_encode($rt);
    }

    /**
     * membuat suatu remote test
     * @param request  $request berisi id_lamaran, duration, tester_email, expired_date, id_soal, start_date, link_jawaban
     * @return long $id dari hasil penambahan remote test di database
     */
    public function createRemoteTest(Request $request){
        $id_lamaran = $request->id_lamaran;
        $duration = $request->duration;
        $tester_email = $request->tester_email;
        $expired_date = $request->expired_date;
        $id_soal = $request->id_soal;
        $status = 'Assinged';

        $id = DB::table('remote_test')->insertGetId(
            ['id_lamaran' => $id_lamaran,
            'duration' => $duration,
            'tester_email' => $tester_email,
            'expired_date' => $expired_date,
            'id_soal' => $id_soal,
            'status' => $status]
        );
        return $id;
    }

    /**
     * submit jawaban remote test
     * @param request
     * @return long $id dari hasil penambahan remote test di database
     */
    public function submitJawaban(Request $request){
        $id = $request->id;
        $link_jawaban = $request->link_jawaban;

        $result = DB::table('remote_test')
            ->where('id', $id)
            ->update(['link_jawaban' => $link_jawaban]);
        return $result;
    }

}
