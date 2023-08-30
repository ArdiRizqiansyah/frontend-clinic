import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// get token from localStorage
const token = localStorage.getItem("token");

// set header authorization
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Edit() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [ikon, setIkon] = useState("");

  const poli: { id?: any; nama?: string; ikon?: string; deskripsi?: string } =
    useLoaderData() ?? {};

  useEffect(() => {
    setNama(poli.nama ?? "")
    setIkon(poli.ikon ?? "");
    setDeskripsi(poli.deskripsi ?? "");
  }, []);

  const handleUpdateData = async (e: any) => {
    e.preventDefault();

    const formData = {
      nama: nama,
      ikon: ikon,
      deskripsi: deskripsi,
    }

    await axios
      .put(`http://localhost:8000/api/admin/poli/${poli.id}`, formData, config)
      .then((response) => {
        toast.success('Data berhasil diubah');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Admin>
      <div className="flex justify-between items-center mb-5">
        <h4>Edit Data Poli</h4>
        <Link to="/admin/poli" className="btn btn-warning">
          Kembali
        </Link>
      </div>

      <ToastContainer />

      <form onSubmit={handleUpdateData} method="PUT">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="text-gray-700 mb-5">
                Name
              </label>
              <input
                id="name"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan nama"
                onChange={(e) => setNama(e.target.value)}
                value={nama}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="icon" className="text-gray-700 mb-5">
                Ikon Heroicon
              </label>
              <input
                id="icon"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan ikon yang tersedia di https://heroicons.com/"
                onChange={(e) => setIkon(e.target.value)}
                value={ikon}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full focus:textarea-primary mt-2"
                placeholder="Masukkan deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
                value={deskripsi}
              ></textarea>
            </div>

            <div className="mt-5">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </Admin>
  );
}

export default Edit;

export async function loader({ params }: any) {
  const { id } = params;

  const response = await axios.get(
    `http://localhost:8000/api/admin/poli/${id}`,
    config
  );

  return response.data.data;
}
