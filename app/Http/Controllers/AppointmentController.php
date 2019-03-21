<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
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
     * mengembalikan semua appointment yang ada 
     * @return array $app 
     */
    public function getAllAppointment(Request $request){
        $getApp = DB::table('appointment')->select()->get();
        $apps = json_decode($getApp, true);
        $result = array();
        foreach($apps as $app){
            $app = (object) $app;
            array_push($result, $app);
        }
        return $result;
    }

    /**
     * membuat suatu appointment
     * @param request  $request berisi $id_lamaran, $date, $start, $end dan $lokasi
     * @return long $id id dari hasil penambahan appointment di database
     */
    public function createAppointment(Request $request){
        $id_lamaran = $request->id_lamaran;
        $date = $request->date;
        $start = $request->start;
        $end = $request->end;
        $lokasi = $request->lokasi;

        $id = DB::table('appointment')->insertGetId(
            ['id_lamaran' => $id_lamaran, 
            'date' => $date, 
            'start' => $start, 
            'end' => $end,
            'lokasi' => $lokasi]
        );
        return $id;
    }

}
