import express from "express";
const multer = require("multer");
import UserController from "../controllers/UserControler";
import StaffController from "../controllers/StaffController";
import CustomerController from "../controllers/CustomerController";
import ServiceController from "../controllers/ServiceController";
import CenterController from "../controllers/CenterController";
import BookingController from "../controllers/BookingController";
import SalaryController from "../controllers/SalaryController";
import ManagerController from "../controllers/ManagerController";
import ScheduleWorkingController from "../controllers/ScheduleWorkingController";
import PaymentController from "../controllers/PaymentController";
import OrderController from "../controllers/OrderController";
import ReviewController from "../controllers/ReviewController";
import TimeWorkingController from "../controllers/TimeWorkingController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello world");
  });
  router.post("/api/user-login", UserController.handleLoginCustomer);
  router.post("/api/admin-login", UserController.handleLogin);
  router.post("/api/staff-login", UserController.handleLoginForStaff);
  //account
  router.post("/api/create-new-user", UserController.handleCreateNewUser);
  router.get(
    "/api/admin/get-all-account",
    UserController.handleGetAllAccountForAdmin
  );
  router.put("/api/admin/update-account", UserController.handleUpdateAccount);
  router.get("/api/get-account-by-name", UserController.handleGetAccountByName);
  router.delete(
    "/api/admin/delete-account",
    UserController.handleDeleteAccount
  );
  //staff
  router.get("/api/get-all-staff", StaffController.handleGetAllStaff);
  router.get("/api/get-detail-pt", StaffController.handleGetPTDetail);
  router.get(
    "/api/merchant/:CenterId/staff-center",
    StaffController.handleGetAllStaffOfCenter
  );
  router.get("/api/get-all-pt", StaffController.handleGetAllPT);
  router.get(
    "/api/:CenterId/get-all-pt-center",
    StaffController.handleGetAllPTOfCenter
  );
  router.get("/api/get-staff-by-name", StaffController.handleGetStaffByName);
  router.post("/api/create-staff", StaffController.handleCreateNewStaff);
  router.put("/api/update-staff", StaffController.handleUpdateStaff);
  //customer
  router.get("/api/get-all-customer", CustomerController.handleGetAllCustomer);
  router.get(
    "/api/get-detail-customer",
    CustomerController.handleGetDetailCustomer
  );
  router.get(
    "/api/merchant/:CenterId/customer-center",
    CustomerController.handleGetAllCustomerOfCenter
  );
  router.get(
    "/api/get-customer-by-name",
    CustomerController.handleGetCustomerByName
  );
  router.post(
    "/api/create-new-customer",
    CustomerController.handleCreateNewCustomer
  );
  router.put("/api/update-customer", CustomerController.handleUpdateCustomer);
  //service
  router.get("/api/get-all-service", ServiceController.handleGetAllService);
  router.get(
    "/api/get-detail-service",
    ServiceController.handleGetServiceDetail
  );
  router.get(
    "/api/get-service-by-name",
    ServiceController.handleGetServiceByName
  );
  router.post(
    "/api/create-new-service",
    ServiceController.handleCreateNewService
  );
  router.put("/api/update-service", ServiceController.handleUpdateService);
  router.delete("/api/delete-service", ServiceController.handleDeleteService);
  //center
  router.get("/api/get-all-center", CenterController.handleGetAllCenter);
  router.get("/api/get-detail-center", CenterController.handleGetDetailCenter);
  router.get("/api/get-center-by-name", CenterController.handleGetCenterByName);
  //booking
  router.get("/api/get-all-booking", BookingController.handleGetAllBooking);
  //get booking follow pi id
  router.get(
    "/api/get-booking-detail",
    BookingController.handleGetDetailBookingOfPT
  );
  router.get(
    "/api/get-booking-detail-center",
    BookingController.handleGetDetailBookingOfCenter
  );
  router.get(
    "/api/:PTId/get-booking-of-pt",
    BookingController.handleGetBookingOfPT
  );
  router.get(
    "/api/:CustomerId/get-booking-of-customer",
    BookingController.handleGetBookingOfCustomer
  );
  router.get(
    "/api/merchant/:CenterId/get-all-booking-of-center",
    BookingController.handleGetBookingOfCenter
  );
  router.post(
    "/api/create-booking/create-new-booking",
    BookingController.handleCreateNewBooking
  );
  router.put(
    "/api/staff/cancel-booking",
    BookingController.handleCancelBookingForStaff
  );
  router.put(
    "/api/staff/accept-booking",
    BookingController.handleAcceptBookingForStaff
  );
  router.get(
    "/api/:CenterId/get-booking-in-week",
    BookingController.handleGetBookingOfCenterIn7Day
  );
  router.get(
    "/api/get-booking-in-month",
    BookingController.handleGetBookingOfCenterIn30Day
  );
  //salary
  router.get("/api/get-all-salary", SalaryController.handleGetAllSalary);

  //manager
  router.get(
    "/api/get-all-manager",
    ManagerController.handleGetAllManageCenter
  );
  router.get(
    "/api/get-detail-manager",
    ManagerController.handleGetDetailManager
  );
  router.post(
    "/api/create-new-manager",
    ManagerController.handleCreateNewManager
  );
  router.put("/api/update-manager", ManagerController.handleUpdateManager);
  router.delete("/api/delete-manager", ManagerController.handleDeleteManager);
  //schedule working
  router.get(
    "/api/get-all-schedule",
    ScheduleWorkingController.handleGetAllSchedule
  );
  router.get(
    "/api/:StaffId/get-schedule-working",
    ScheduleWorkingController.handleGetScheduleWorkingOfPT
  );
  router.get(
    "/api/:StaffId/get-schedule-working-of-staff",
    ScheduleWorkingController.handleGetScheduleWorkingOfStaff
  );
  router.post(
    "/api/create-schedule-working",
    ScheduleWorkingController.handleCreateScheduleWorking
  );
  //time working
  router.get(
    "/api/get-all-time-working",
    TimeWorkingController.handleGetAllTimeWorking
  );
  //rating and review
  router.get(
    "/api/admin/get-review-of-center",
    ReviewController.handleGetReviewOfCenter
  );
  //order
  router.post("/api/create-new-order", OrderController.handleCreateNewOrder);
  //payment
  //momo
  app.post("/api/get-momo-payment-link", PaymentController.getMomoPaymentLink);

  // router.post('/api/user-login', UserController.handleLogin);
  // router.post('/api/user-login-social', UserController.handleLoginSocial);

  // // CRUD User //
  // router.get('/api/get-roles', UserController.getAllRoles);
  // router.post('/api/sign-up-new-user', UserController.handleSignUpNewUser);
  // router.get('/api/get-all-user', UserController.handleGetAllUser);
  // router.get('/api/get-edit-user', UserController.getEditUser);
  // router.put('/api/edit-user', UserController.handleEditUser);
  // router.delete('/api/delete-user', UserController.handleDeleteUser);

  // // CRUD Genres //
  // router.post('/api/create-new-genres', GenresController.handleCreateNewGenres);
  // router.get('/api/get-all-genres', GenresController.handleGetAllGenres);
  // router.get('/api/get-edit-genres', GenresController.getEditGenres);
  // router.put('/api/edit-genres', GenresController.handleEditGenres);
  // router.delete('/api/delete-genres', GenresController.handleDeleteGenres);

  // // CRUD Artists //
  // router.get('/api/get-all-country', ArtistsController.getAllCountry);
  // router.post('/api/create-new-artists', ArtistsController.handleCreateNewArtists);
  // router.get('/api/get-all-artists', ArtistsController.handleGetAllArtists);
  // router.get('/api/get-edit-artists', ArtistsController.getEditArtists);
  // router.put('/api/edit-artists', ArtistsController.handleEditArtists);
  // router.delete('/api/delete-artists', ArtistsController.handleDeleteArtists);
  // router.get('/api/get-detail-artists', ArtistsController.getDetailArtists);

  // // CRUD Song //
  // let upload = multer();
  // router.post('/api/create-new-song', upload.single('fileSong'), SongController.handleCreateNewSongs);
  // router.get('/api/get-all-songs', SongController.getAllSongs);
  // router.get('/api/get-random-songs', SongController.getRandomSongs);
  // router.get('/api/get-edit-song', SongController.getEditSong);
  // router.get('/api/get-detail-song', SongController.getDetailSong);
  // router.get('/api/get-song-by-keyword', SongController.getSongByKeyword);
  // router.put('/api/edit-song', upload.single('fileSong'), SongController.handleEditSong);
  // router.delete('/api/delete-song', SongController.handleDeleteSong);
  // router.get('/api/get-song-current', SongController.getSongCurrent);
  // router.get('/api/get-song-by-name', SongController.getSongByName);
  // router.put('/api/edit-song-count', SongController.handleEditSongCount);

  // //history
  // router.put('/api/save-song-history', HistorySong.handleSaveHistorySong);
  // router.get('/api/get-song-history-by-idUser', HistorySong.getSongHistoryByIDUser);
  // //like song
  // router.put('/api/save-song-like', LikeSongController.handleSaveLikeSong);
  // router.get('/api/get-song-like-by-idUser', LikeSongController.getSongLikeByIDUser);

  // // CRUD Albums //
  // router.get('/api/get-all-songs-by-artists', SongController.getAllSongsByArtists);
  // router.get('/api/get-all-songs-by-artists-genres', SongController.getAllSongsByArtistsGenres);
  // router.get('/api/get-all-songs-by-genres', SongController.getAllSongsByGenres);

  // router.post('/api/create-new-albums', AlbumController.handleCreateNewAlbum);
  // router.get('/api/get-all-albums', AlbumController.getAllAlbums);
  // router.delete('/api/delete-song-in-album', AlbumController.handleDeleteSongInAlbum);
  // router.post('/api/create-new-song-in-albums', AlbumController.handleCreateNewSongInAlbum);
  // router.get('/api/get-edit-album', AlbumController.getEditAlbum);
  // router.get('/api/get-detail-album', AlbumController.getDetailAlbum);
  // router.put('/api/edit-album', AlbumController.handleEditAlbum);
  // router.delete('/api/delete-album', AlbumController.handleDeleteAlbum);

  // // Playlist //
  // router.post('/api/create-new-playlist', PlaylistControler.handleCreateNewPlaylist);
  // router.post('/api/create-new-playlist-user', PlaylistControler.handleCreateNewPlaylistUser);
  // router.get('/api/get-all-playlist', PlaylistControler.getAllPlaylist);
  // router.get('/api/get-all-playlist-by-userId', PlaylistControler.getAllPlaylistByUserId);
  // router.get('/api/get-playlist-by-keyword', PlaylistControler.getPlaylistByKeyword);
  // router.get('/api/get-playlist-by-genres', PlaylistControler.getPlaylistByGenres);
  // router.get('/api/get-random-playlist', PlaylistControler.getRandomPlaylist);
  // router.post('/api/create-new-song-in-playlist', PlaylistControler.handleCreateNewSongInPlaylist);
  // router.post('/api/create-new-song-in-playlist-for-user', PlaylistControler.handleCreateNewSongInPlaylistForUser);
  // router.delete('/api/delete-song-in-playlist', PlaylistControler.handleDeleteSongInPlaylist);
  // router.delete('/api/delete-song-in-playlist-for-user', PlaylistControler.handleDeleteSongInPlaylistForUser);
  // router.get('/api/get-edit-playlist', PlaylistControler.getEditPlaylist);
  // router.get('/api/get-detail-playlist', PlaylistControler.getDetailPlaylist);
  // router.put('/api/edit-playlist', PlaylistControler.handleEditPlaylist);
  // router.delete('/api/delete-playlist', PlaylistControler.handleDeletePlaylist);

  return app.use("/", router);
};

module.exports = initWebRoutes;
