import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage, { loader as homeLoader } from "./pages/Home";
import LoginPage from "./pages/auth/Login";

import AdminDashboard, { loader as dashboardLoader } from "./pages/admin/Dashboard";
import AdminPoli from "./pages/admin/poli/Index";
import AdminPoliCreate from "./pages/admin/poli/Create";
import AdminPoliEdit, { loader as editPoliLoader } from "./pages/admin/poli/Edit";
import AdminDoctor, { loader as doctorLoader } from "./pages/admin/dokter/Index";
import AdminDoctorCreate, { loader as poliDoctorLoader } from "./pages/admin/dokter/Create";
import AdminDoctorEdit, { loader as EditDoctorLoader } from "./pages/admin/dokter/Edit";
import AdminJadwal, { loader as jadwalLoader } from "./pages/admin/jadwal/Index";
import AdminJadwalCreate, { loader as jadwalCreateLoader } from "./pages/admin/jadwal/Create";
import AdminJadwalEdit, { loader as jadwalEditLoader } from "./pages/admin/jadwal/Edit";
import AdminJadwalDetail, { loader as jadwalDetailLoader } from "./pages/admin/jadwal/detail/Index";
import AdminJadwalDetailCreate, { loader as jadwalDetailCreate } from "./pages/admin/jadwal/detail/Create";
import AdminJadwalDetailEdit, { loader as jadwalDetailEdit } from "./pages/admin/jadwal/detail/Edit";
import Checkin, { loader as checkInLoader } from "./pages/guest/Checkin";
import AdminPengunjung, { loader as adminPengunjungLoader } from "./pages/admin/pengunjung/Index";
import AdminPasien, { loader as adminPasienLoader } from "./pages/admin/pasien/Index";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage/>} loader={homeLoader} />
      <Route path="checkin" element={<Checkin />} loader={checkInLoader} />
      
      <Route path="login" element={<LoginPage/>} />

      <Route path="admin">
        <Route index element={<AdminDashboard/>} loader={dashboardLoader} />

        <Route path="poli">
          <Route index element={<AdminPoli />} />
          <Route path="create" element={<AdminPoliCreate />} />
          <Route path="edit/:id" element={<AdminPoliEdit />} loader={editPoliLoader} />
        </Route>

        <Route path="doctor">
          <Route index element={<AdminDoctor />} loader={doctorLoader} />
          <Route path="create" element={<AdminDoctorCreate />} loader={poliDoctorLoader} />
          <Route path="edit/:id" element={<AdminDoctorEdit/>} loader={EditDoctorLoader} />
        </Route>

        <Route path="jadwal">
          <Route index element={<AdminJadwal />} loader={jadwalLoader} />
          <Route path="create" element={<AdminJadwalCreate />} loader={jadwalCreateLoader} />
          <Route path="edit/:id" element={<AdminJadwalEdit />} loader={jadwalEditLoader} />

          <Route path=":id/detail">
            <Route index element={<AdminJadwalDetail />} loader={jadwalDetailLoader} />
            <Route path="create" element={<AdminJadwalDetailCreate />} loader={jadwalDetailCreate} />
            <Route path="edit/:jadwal_detail_id" element={<AdminJadwalDetailEdit />} loader={jadwalDetailEdit} />
          </Route>
        </Route>

        <Route path="pengunjung" element={<AdminPengunjung />} loader={adminPengunjungLoader} />
        <Route path="pasien" element={<AdminPasien />} loader={adminPasienLoader} />
      </Route>
    </Route>
  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
