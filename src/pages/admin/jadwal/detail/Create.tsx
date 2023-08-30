import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Admin from "../../../../layout/Admin";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Create() {
  const params = useParams<{ id: any }>();

    const dataLoader: {dokter?: any} = useLoaderData() ?? {};

  const [hari, setHari] = useState<number>(0);
  const [jamMulai, setJamMulai] = useState<string>("");
    const [jamSelesai, setJamSelesai] = useState<string>("");

  // handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
        hari: hari,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        jadwal_id: params.id,
    };

    await axios
      .post("http://localhost:8000/api/admin/jadwal-detail", formData, config)
      .then((response) => {
        toast.success("Data berhasil ditambahkan");

        setHari(0);
        setJamMulai("");
        setJamSelesai("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Admin>
      <div className="flex justify-between items-center mb-5">
        <h4 className="capitalize">Tambah Data Detail Jadwal Dokter { dataLoader.dokter.nama }</h4>
        <Link to={`/admin/jadwal/${params.id}/detail`} className="btn btn-warning">
          Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="hari" className="text-gray-700">
                Hari
              </label>
              <select
                className="select select-bordered focus:select-primary w-full"
                onChange={(e) => setHari(parseInt(e.target.value))}
                value={hari}
                required
              >
                <option value="" selected>
                  Pilih Hari
                </option>
                <option value="1">Senin</option>
                <option value="2">Selasa</option>
                <option value="3">Rabu</option>
                <option value="4">Kamis</option>
                <option value="5">Jumat</option>
                <option value="6">Sabtu</option>
                <option value="7">Minggu</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="jam_mulai" className="text-gray-700 mb-5">
                Jam Mulai
              </label>
              <input
                id="jam_mulai"
                type="time"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan kouta pasien"
                onChange={(e) => setJamMulai(e.target.value)}
                value={jamMulai}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jam_selesai" className="text-gray-700 mb-5">
                Jam Mulai
              </label>
              <input
                id="jam_selesai"
                type="time"
                className="input input-bordered w-full focus:input-primary mt-2"
                placeholder="Masukkan kouta pasien"
                onChange={(e) => setJamSelesai(e.target.value)}
                value={jamSelesai}
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

export default Create;

export async function loader({ params }: any) {
    const jadwal = await axios
        .get(`http://localhost:8000/api/admin/jadwal/${params.id}`, config)
        .then((response) => {
            return response.data.data;
        });

    return jadwal;
}