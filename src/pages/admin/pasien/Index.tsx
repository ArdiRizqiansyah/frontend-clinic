import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../../../layout/Admin";
import { useLoaderData } from "react-router-dom";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Index() {
  const [pasien, setPasien] = useState([]);

  const data: { pasien?: any } = useLoaderData() ?? {};

  useEffect(() => {
    setPasien(data.pasien);
  }, []);

  return (
    <Admin>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-700">Daftar Pasien</h3>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Telpon</th>
              </tr>
            </thead>
            <tbody>
              {pasien.map(
                (item: {
                  id: React.Key | null | undefined;
                  nama: string,
                telepon: string,
                }) => (
                  <tr key={item.id}>
                    <td className="text-sm">{item.nama}</td>
                    <td className="text-sm">{item.telepon}</td>
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

export default Index;

export async function loader() {
  const pasien = await axios.get(
    `http://localhost:8000/api/admin/pasien`,
    config
  );

  return {
    pasien: pasien.data.data,
  };
}
