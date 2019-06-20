<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class UserController extends Controller
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
     * mengembalikan semua soal yang ada 
     * @return array $soal 
     */
    public function getUsers(Request $request){
        $getKaryawan = DB::table('karyawan')->select()->get();
        $karyawans = json_decode($getKaryawan, true);
        $result = array();
        foreach($karyawans as $karyawan){
            $karyawan = (object) $karyawan;
            array_push($result, $karyawan);
        }
        return $result;
    }

    public function getSupervisor(Request $request){
        $supervisor = DB::table('karyawan')->select()->where('role', 'SUPERVISOR')->get();
        $supervisor = json_decode($supervisor);
        return $supervisor;
    }

    public function createuser(Request $request){
        $name = $request->name;
        $username = $request->username;
        $password = $request->password;
        $role = $request->role;
        $divisi = $request->divisi;
        $email = $request->email;

        $id = DB::table('karyawan')->insertGetId(
            ['name' => $name, 
            'username' => $username, 
            'password' => $password,
            'email' => $email,
            'role' => $role, 
            'divisi' => $divisi]
        );
        return $id;
    }

    public function updateUser(Request $request){
        $id = $request->id;
        $name = $request->name;
        $username = $request->username;
        $role = $request->role;
        $divisi = $request->divisi;
        $email = $request->email;
        $supervisor = $request->supervisor;

        $result = DB::table('karyawan')
            ->where('id', $id)
            ->update(['name' => $name, 
            'username' => $username, 
            'role' => $role, 
            'divisi' => $divisi,
            'email' => $email,
            'id_supervisor' => $supervisor]);
        return $result;
    }

    public function deleteUser(Request $request){
        $id = $request->id;
        $response = DB::table('karyawan')->delete($id);
        return $response;
    }

}
