import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Form() {
  const [dokter, setDokter] = useState<{ [key: string]: any }>({});
  const [dokterId, setDokterId] = useState(0);
  const [kouta, setKouta] = useState(0);

  const dataLoader: { dokter?: any, jadwal?: any } = useLoaderData() ?? {};

  useEffect(() => {
    setDokter(dataLoader.dokter);
    setDokterId(dataLoader.jadwal.dokter_id);
    setKouta(dataLoader.jadwal.kouta);
  }, [dataLoader]);

  // handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      dokter_id: dokterId,
      kouta: kouta,
    };

    await axios
      .put(`http://localhost:8000/api/admin/jadwal/${dataLoader.jadwal.id}`, formData, config)
      .then((response) => {
        toast.success("Data berhasil diedit");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Admin>
      <div className="flex justify-between items-center mb-5">
        <h4>Edit Data Jadwal Dokter</h4>
        <Link to="/admin/jadwal" className="btn btn-warning">
          Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="poli" className="text-gray-700">
                Dokter
              </label>
              <select
                className="select select-bordered focus:select-primary w-full"
                onChange={(e) => setDokterId(parseInt(e.target.value))}
                value={dokterId}
                required
              >
                <option value="" selected>
                  Pilih Dokter
                </option>
                {Object.entries(dokter).map(([key, value]) => (
                  <option key={value.id} value={value.id}>
                    {value.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="kouta" className="text-gray-700 mb-5">
                Kouta Pasien
              </label>
              <input
                id="kouta"
                type="number"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan kouta pasien"
                onChange={(e) => setKouta(parseInt(e.target.value))}
                value={kouta}
                required
              />
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
  const dokter = await axios.get(
    "http://localhost:8000/api/admin/dokter",
    config
  );

  const jadwal = await axios.get(
    `http://localhost:8000/api/admin/jadwal/${params.id}`,
    config
    );

  return {
    dokter: dokter.data.data,
    jadwal: jadwal.data.data,
  };
}
