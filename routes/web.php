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

$router->get('testmail', ['middleware' => 'cors', 'uses' => 'LamaranController@sendMailLamaran']);
$router->get('invitation', ['middleware' => 'cors', 'uses' => 'AppointmentController@sendMailInvitation']);

/**
 * Modul Recruitment
 */

 /**
  * Register, Login
  */
$router->post('/register', ['middleware' => 'cors', 'uses' => 'AuthController@register']);
$router->post('/login', ['middleware' => 'cors', 'uses' => 'AuthController@login']);
$router->post('/login-employee', ['middleware' => 'cors', 'uses' => 'AuthController@loginEmployee']);


/**
 * UC - 01 : PO Mengelola lowongan
 * Author : Shafira F
 */
$router->get('po/all-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@getAllLowongan']); //checked
$router->get('po/all-active-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@getAllActiveLowongan']);//ngambil lowongan yang active aja, silahkan pake ini untuk semua yang diakses pelamar
$router->get('po/lowongan/{id}', ['middleware' => 'cors', 'uses' => 'LowonganController@getLowongan']); //checked
$router->post('po/create-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@createLowongan']); //checked
$router->post('po/update-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@updateLowongan']); //checked
$router->post('po/delete-lowongan', ['middleware' => 'cors', 'uses' => 'LowonganController@deleteLowongan']);

$router->post('po/create-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@createRequirement']); //checked
$router->post('po/update-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@updateRequirement']); //checked
$router->post('po/delete-requirement', ['middleware' => 'cors', 'uses' => 'RequirementController@delete_req']);

$router->get('po/requirement/{id_lowongan}', ['middleware' => 'cors', 'uses' => 'RequirementController@getRequirement']); //checked
$router->get('po/responsibility/{id_lowongan}', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@getResponsibility']); //checked
$router->post('po/create-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@createResponsibility']); //checked
$router->post('po/update-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@updateResponsibility']); //checked
$router->post('po/delete-responsibility', ['middleware' => 'cors', 'uses' => 'ResponsibilityController@delete_res']);

$router->get('po/lowongan/related/{id}', ['middleware' => 'cors', 'uses' => 'LowonganController@getRelatedLowongan']);


/**
 *  UC - 02 : Pelamar Melamar Pekerjaan
 * Author : Syafiq A U
 */
$router->post('pelamar/create-pelamar', ['middleware' => 'cors', 'uses' => 'PelamarController@createPelamar']);

$router->post('pelamar/create-lamaran', ['middleware' => 'cors', 'uses' => 'LamaranController@createLamaran']);
$router->post('pelamar/upload-cv', ['middleware' => 'cors', 'uses' => 'LamaranController@uploadCV']);

$router->get('pelamar/get-lamaran/{token}', ['middleware' => 'cors', 'uses' => 'PelamarController@getLamaran']);

$router->get('pelamar/get-profile/{token}', ['middleware' => 'cors', 'uses' => 'PelamarController@getPelamar']);

$router->get('pelamar/send-mail-lamaran', ['middleware' => 'cors', 'uses' => 'LamaranController@sendMailLamaran']);


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

$router->get('po/download-cv/{id}', ['middleware' => 'cors', 'uses' => 'LamaranController@downloadCV']);

$router->get('po/get-detail-applicant/{id}', ['middleware' => 'cors', 'uses' => 'LamaranController@getDetailApplicant']);

$router->get('po/get-id-remote-test/{id}', ['middleware' => 'cors', 'uses' => 'LamaranController@getIdRemoteTest']);


/**
 * UC - 04 : PO Mengelola Soal
 * Author : Hauri S Z
 */
$router->get('po/all-soal', ['middleware' => 'cors', 'uses' => 'SoalController@getAllSoal']);
$router->get('po/soal/{id}', ['middleware' => 'cors', 'uses' => 'SoalController@getSoal']);
$router->post('po/create-soal', ['middleware' => 'cors', 'uses' => 'SoalController@createSoal']);
$router->post('po/update-soal', ['middleware' => 'cors', 'uses' => 'SoalController@updateSoal']);
$router->post('po/delete-soal', ['middleware' => 'cors', 'uses' => 'SoalController@deleteSoal']); //checked


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
$router->post('pelamar/record-start-test', ['middleware' => 'cors', 'uses' => 'RemoteTestController@startDateRecord']);
$router->post('pelamar/submit-jawaban', ['middleware' => 'cors', 'uses' => 'RemoteTestController@submitJawaban']);

/**
 * UC - 14 : PO Melihat Laporan Ringkasan Hasil Penerimaan
 * Author : Syafiq Abdillah Umarghanis
 */
$router->get('po/recruitment-report/{divisi}/{start}/{end}', ['middleware' => 'cors', 'uses' => 'LamaranController@getRecruitmentReport']);

$router->get('sysadmin/all-users', ['middleware' => 'cors', 'uses' => 'UserController@getUsers']);
$router->post('sysadmin/create-user', ['middleware' => 'cors', 'uses' => 'UserController@createUser']);
$router->post('sysadmin/update-user', ['middleware' => 'cors', 'uses' => 'UserController@updateUser']);
$router->post('sysadmin/delete-user', ['middleware' => 'cors', 'uses' => 'UserController@deleteUser']);
$router->get('sysadmin/get-supervisor', ['middleware' => 'cors', 'uses' => 'UserController@getSupervisor']);

/**
 * UC - 12 : Laporan Kinerja Karyawan
 * Author : Fairuz Y
 */
 $router->get('po/get-all-task-complete/{id}', ['middleware' => 'cors', 'uses' => 'AppointmentController@taskComplete']);
 $router->get('po/get-all-task-status/{id}', ['middleware' => 'cors', 'uses' => 'AppointmentController@getAllTaskStatus']);
 $router->get('po/get-onboarding-progress/{id}', ['middleware' => 'cors', 'uses' => 'AppointmentController@getNumberTaskByStatus']);
 $router->get('po/get-employee-profile/{id}', ['middleware' => 'cors', 'uses' => 'AppointmentController@getEmployeeProfile']);
 $router->get('po/get-all-employee/{id}', ['middleware' => 'cors', 'uses' => 'AppointmentController@getAllEmployee']);
 
 $router->get('su/get-all-task-complete/{id}', ['middleware' => 'cors', 'uses' => 'TaskController@taskComplete']);
 $router->get('su/get-all-task-status/{id}', ['middleware' => 'cors', 'uses' => 'TaskController@getAllTaskStatus']);
 $router->get('su/get-onboarding-progress/{id}', ['middleware' => 'cors', 'uses' => 'TaskController@getNumberTaskByStatus']);
 $router->get('su/get-employee-profile/{id}', ['middleware' => 'cors', 'uses' => 'TaskController@getEmployeeProfile']);
 $router->get('su/get-all-employee', ['middleware' => 'cors', 'uses' => 'TaskController@getAllEmployee']);

/**
 * UC - 11 : Memberikan Konfirmasi Penyelesaian Tugas
 * Author : M Raffi A
 */
$router->get('ko/tasks-karyawan/{id}', ['middleware' => 'cors', 'uses' => 'KaryawanOnboardingController@getTasksKaryawan']);
$router->get('ko/karyawan-onboarding/{id}', ['middleware' => 'cors', 'uses' => 'KaryawanOnboardingController@getKaryawanOnboarding']);
$router->post('ko/update-task-karyawan', ['middleware' => 'cors', 'uses' => 'TaskController@updateStatusTask']);


/**
 * UC - 09 : Supervisor Mengelola Tugas Onboarding
 * Author : Shafira F
 */
$router->get('supervisor/getNamaKaryawanOnboarding/{id_karyawan}', ['middleware' => 'cors', 'uses' => 'KaryawanOnboardingController@getNamaKaryawanOnboarding']); 

$router->get('supervisor/getTugasOnboarding/{id_karyawan}', ['middleware' => 'cors', 'uses' => 'TugasOnboardingController@getAllTugasOnboarding']); 
$router->post('supervisor/create-tugas-onboarding', ['middleware' => 'cors', 'uses' => 'TugasOnboardingController@createTugasOnboarding']); 
$router->post('supervisor/update-tugas-onboarding', ['middleware' => 'cors', 'uses' => 'TugasOnboardingController@updateTugasOnboarding']); 
$router->post('supervisor/delete-tugas-onboarding', ['middleware' => 'cors', 'uses' => 'TugasOnboardingController@deleteTugasOnboarding']);

/**
 * UC - 10 : Memberikan Approval
 * Author: Hauri S Z
 */
$router->post('supervisor/change-task-status', ['middleware' => 'cors', 'uses' => 'TugasOnboardingController@changeTaskStatus']);
