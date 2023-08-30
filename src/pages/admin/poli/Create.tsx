import { useState } from "react";
import { Link } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [nama, setNama] = useState("");
  const [ikon, setIkon] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // get token from localStorage
  const token = localStorage.getItem("token");

  // set header authorization
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleStoreData = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("ikon", ikon);
    formData.append("deskripsi", deskripsi);

    await axios
      .post("http://localhost:8000/api/admin/poli", formData, config)
      .then((response) => {
        toast.success("Data berhasil ditambahkan");

        setNama("");
        setIkon("");
        setDeskripsi("");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Admin>
      <div className="flex justify-between items-center mb-5">
        <h4>Tambah Data Poli</h4>
        <Link to="/admin/poli" className="btn btn-warning">
          Kembali
        </Link>
      </div>

      <form onSubmit={handleStoreData}>
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
              >
              </textarea>
            </div>

            <div className="mt-5">
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </Admin>
  );
}

export default Create;
