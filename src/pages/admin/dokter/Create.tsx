import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Form() {
  const [poli, setPoli] = useState<{ [key: string]: any }>({});
  const data_poli = useLoaderData() ?? {};
  
  useEffect(() => {
    setPoli(data_poli);
  }, [data_poli]);

  const [nama, setNama] = useState("");
  const [poliId, setPoliId] = useState(0);

  // get token from localStorage
  const token = localStorage.getItem("token");

  // set header authorization
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      nama: nama,
      poli_id: poliId,
    };

    await axios
      .post("http://localhost:8000/api/admin/dokter", formData, config)
      .then((response) => {
        toast.success("Data berhasil ditambahkan");

        setNama("");
        setPoliId(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    <option key={value.id} value={value.id}>{value.nama}</option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </Admin>
  );
}

export default Form;

export async function loader({ params }: any) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    "http://localhost:8000/api/admin/poli",
    config
  );

  return response.data.data;
}
