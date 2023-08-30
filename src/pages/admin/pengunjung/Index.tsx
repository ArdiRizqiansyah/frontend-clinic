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

function Index(){
    const [pengunjung, setPengunjung] = useState([]);

    const data: {pengunjung?: any} = useLoaderData() ?? {};

    useEffect(() => {
        setPengunjung(data.pengunjung);
    }, [])
    

    return (
      <Admin>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-700">Daftar Pengunjung</h3>
            </div>

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
                        <p className="font-semibold text-sm">
                          {item.pasien.nama}
                        </p>
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

export default Index;

export async function loader(){
    const pengunjung = await axios.get(`http://localhost:8000/api/admin/pengunjung`, config);

    return {
        pengunjung: pengunjung.data.data
    };
}