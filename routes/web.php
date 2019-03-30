  <?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Home
$router->get('/', function () {
    return 'Hello, Welcome to SIRCLO\'s Recruitment and Onboarding Information System ';
});

/**
 * Modul Recruitment
 */

 /**
  * Register, Login
  */
$router->post('/register', ['middleware' => 'cors', 'uses' => 'AuthController@register']);
$router->post('/login', ['middleware' => 'cors', 'uses' => 'AuthController@login']);

/**
 * UC - 01 : PO Mengelola lowongan
 * Author : Shafira F
 */
 $router->get('po/all-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@getAllLowongan']); //checked

$router->get('po/lowongan/{id}', ['middleware' => 'cors', 'uses' => 'LowonganController@getLowongan']); //checked
$router->post('po/create-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@createLowongan']); //checked
$router->post('po/update-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@updateLowongan']); //checked
$router->delete('po/delete-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@deleteLowongan']);

$router->post('po/create-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@createRequirement']); //checked
$router->post('po/update-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@updateRequirement']); //checked
$router->delete('po/delete-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@deleteRequirement']);

$router->post('po/create-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@createResponsibility']); //checked
$router->post('po/update-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@updateResponsibility']); //checked
$router->delete('po/delete-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@deleteResponsibility']);

$router->get('po/lowongan/related/{id}', ['middleware' => 'cors', 'uses' => 'LowonganController@getRelatedLowongan']);



/**
 *  UC - 02 : Pelamar Melamar Pekerjaan
 * Author : Syafiq A U
 */

$router->post('pelamar/create-pelamar', ['middleware' => 'cors', 'uses' => 'PelamarController@createPelamar']);

$router->post('pelamar/create-lamaran', ['middleware' => 'cors', 'uses' => 'LamaranController@createLamaran']);
$router->post('pelamar/upload-cv', ['middleware' => 'cors', 'uses' => 'LamaranController@uploadCV']);

$router->get('pelamar/get-lamaran/{token}', ['middleware' => 'cors', 'uses' => 'PelamarController@getLamaran']);

/**
 * UC - 03 : PO Menentukan Tahapan Seleksi Selanjutnya
 * Author : M Raffi A
 */

$router->get('po/all-lamaran', ['middleware' => 'cors', 'uses' => 'LamaranController@getAllLamaran']);
$router->get('po/lamaran/{id}', ['middleware' => 'cors', 'uses' => 'LamaranController@getLamaran']);
$router->post('po/update-tahapan-lamaran', ['middleware' => 'cors', 'uses' => 'LamaranController@updateTahapanLamaran']);

$router->get('po/all-remote-test', ['middleware' => 'cors', 'uses' => 'RemoteTestController@getAllRemoteTest']);
$router->get('po/remote-test/{id}', ['middleware' => 'cors', 'uses' => 'RemoteTestController@getRemoteTest']);
$router->post('po/create-remote-test', ['middleware' => 'cors', 'uses' => 'RemoteTestController@createRemoteTest']);

/**
 * UC - 04 : PO Mengelola Soal
 * Author : Hauri S Z
 */

$router->get('po/all-soal', ['middleware' => 'cors', 'uses' => 'SoalController@getAllSoal']);
$router->get('po/soal/{id}', ['middleware' => 'cors', 'uses' => 'SoalController@getSoal']);
$router->post('po/create-soal', ['middleware' => 'cors', 'uses' => 'SoalController@createSoal']);
$router->post('po/update-soal', ['middleware' => 'cors', 'uses' => 'SoalController@updateSoal']);
$router->delete('po/delete-soal', ['middleware' => 'cors', 'uses' => 'SoalController@deleteSoal']);

/**
 * UC - 05 : PO Membuat Appointment Interview
 * Author : Fairuz Y
 */

$router->get('po/all-appointment', ['middleware' => 'cors', 'uses' => 'AppointmentController@getAllAppointment']);
$router->post('po/create-appointment', ['middleware' => 'cors', 'uses' => 'AppointmentController@createAppointment']);

/**
 * UC - 06 : Pelamar Membuat Jawaban
 * Author : Fairuz Y
 */

$router->post('pelamar/submit-jawaban', ['middleware' => 'cors', 'uses' => 'RemoteTestController@submitJawaban']);
