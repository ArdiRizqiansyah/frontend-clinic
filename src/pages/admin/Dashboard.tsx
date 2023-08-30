import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroIcons from "../../components/icons/HeroIcons";
import Admin from "../../layout/Admin";
import { useLoaderData } from "react-router-dom";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Dashboard(){
  const [pengunjung, setPengunjung] = useState([]);

  const data: { pengunjung?: any; total_pasien?: number; total_dokter?: number; total_jadwal?: number; total_kunjungan?: number } = useLoaderData() ?? {};

  console.log(data);

  useEffect(() => {
    setPengunjung(data.pengunjung);
  }, [])
  

    return (
      <Admin>
        <h3 className="font-semibold text-gray-700 mb-3">Dashboard</h3>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <HeroIcons icon="user-group-outline" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Pasien Terdaftar
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {data.total_pasien}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <HeroIcons icon="user-circle-outline" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Dokter
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {data.total_dokter}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <HeroIcons icon="calendar-days-outline" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Jadwal Hari ini
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {data.total_jadwal}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
              <HeroIcons icon="chart-bar-outline" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Kunjungan Hari Ini
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {data.total_kunjungan}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <h4 className="font-semibold mb-3">Daftar Pengunjung Terbaru</h4>

            <table className="table">
              <thead>
                <tr>
                  <th>Pasien</th>
                  <th>Telpon</th>
                  <th>Poli</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {pengunjung.map(
                  (item: {
                    id: React.Key | null | undefined;
                    pasien: any;
                    poli: { nama: React.ReactNode };
                    dokter: any;
                    tanggal: React.ReactNode;
                  }) => (
                    <tr key={item.id}>
                      <td>
                        <p className="font-semibold text-sm">{item.pasien.nama}</p>
                      </td>
                      <td className="text-sm">{item.pasien.telepon}</td>
                      <td className="text-sm">{item.dokter.poli.nama}</td>
                      <td className="text-sm">{item.tanggal}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Admin>
    );
}

export default Dashboard;

export async function loader()
{
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await axios.get(
    "http://localhost:8000/api/admin/dashboard",
    config
  );

  return data.data.data;
}