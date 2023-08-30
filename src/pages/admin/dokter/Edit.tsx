import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
  const [poliId, setPoliId] = useState(0);
  const [poli, setPoli] = useState<{ [key: string]: any }>({});  

  const dataLoader: { doctor?: any, poli?: any } = useLoaderData() ?? {};

  useEffect(() => {
    setNama(dataLoader.doctor.nama);
    setPoliId(dataLoader.doctor.poli_id);
    setPoli(dataLoader.poli);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      nama: nama,
      poli_id: poliId,
    };

    await axios.put("http://localhost:8000/api/admin/dokter/" + dataLoader.doctor.id, formData, config)
      .then((response) => {
        toast.success("Data berhasil diubah");
      })
      .catch((error) => {
        console.log(error.response);
      }
    );
  }

  return (
    <Admin>
      <div className="flex justify-between items-center mb-5">
        <h4>Tambah Data Dokter</h4>
        <Link to="/admin/doctor" className="btn btn-warning">
          Kembali
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="text-gray-700 mb-5">
                Nama
              </label>
              <input
                id="name"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan nama dokter"
                onChange={(e) => setNama(e.target.value)}
                value={nama}
              />
            </div>
            <div>
              <label htmlFor="poli" className="text-gray-700">
                Poli
              </label>
              <select
                className="select select-bordered focus:select-primary w-full"
                onChange={(e) => setPoliId(parseInt(e.target.value))}
                value={poliId}
              >
                <option disabled selected>
                  Pilih Poli
                </option>
                {Object.entries(poli).map(([key, value]) => (
                  <option key={key} value={value.id}>
                    {value.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <button className="btn btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </Admin>
  );
}

export default Edit;

export async function loader({ params }: any) {
  const doctor = await axios.get(
    "http://localhost:8000/api/admin/dokter/" + params.id,
    config
  );
  const poli = await axios.get("http://localhost:8000/api/admin/poli", config);
  
  return {
    doctor: doctor.data.data,
    poli: poli.data.data,
  };
}
