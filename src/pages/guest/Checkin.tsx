import axios from "axios";
import Guest from "../../layout/Guest";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Checkin(){
  // data form
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [poliId, setPoliId] = useState(0);
  const [jadwalDetailId, setJadwalDetailId] = useState(0);
  const [tanggal, setTanggal] = useState("");


    const dataLoader = useLoaderData() as any;

    const { poli } = dataLoader;

    interface Jadwal {
      id: number;
      nama: string;
      hari_ini: boolean;
    }

    const [jadwal, setJadwal] = useState<Jadwal[]>([]);
    
    async function handlePoliChange(e: any) {
        const dataJadwal = await axios.get(`http://localhost:8000/api/jadwal/?poli_id=${e.target.value}`)
            .then((res) => {
                return res.data.data;
            })
            .catch((err) => {
                console.log(err);
                
                return [];
            }
        );
        
        setPoliId(e.target.value);
        setJadwal(dataJadwal);
    }
    
    function handleJadwalChange(e: any) {
      setJadwalDetailId(e.target.value);

      // ambil value dari option yang dipilih
      const jadwalId = e.target.value;
      
      // ambil state jadwal dengan id = jadwalId
      let jadwalData = jadwal.find((item: any) => item.id == jadwalId);

      // cek apakah data hari_ini true atau false
      if (jadwalData && jadwalData.hari_ini) {
        // set tanggal menjadi tanggal hari ini
        setTanggal(new Date().toISOString().slice(0, 10));
      }else{
        // set tanggal menjadi tanggal besok
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        setTanggal(tomorrow.toISOString().slice(0, 10));
      }
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = {
        nama: nama,
        no_hp: noHp,
        jadwal_detail_id: jadwalDetailId,
        tanggal: tanggal,
      }

      await axios.post('http://localhost:8000/api/jadwal', formData)
        .then((res) => {
          // atur ulang form state menjadi kosong
          setNama("");
          setNoHp("");
          setPoliId(0);
          setJadwalDetailId(0);
          setTanggal("");

          toast.success("Anda berhasil melakukan pendaftaran kunjungan, silahkan lakukan kunjungan pada tanggal "+ tanggal +" sesuai dengan jadwal yang anda pilih");
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return (
      <Guest>
        <div className="px-5 py-8 bg-base-200 min-h-screen">
          <div className="md:w-1/2 mx-auto card bg-white text-center">
            <div className="card-body">
              <h3 className="text-3xl font-bold">Pendaftaran Klinik</h3>
              <div className="py-3">
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-control w-full mb-3">
                    <label className="label" htmlFor="name">
                      <span className="label-text">Nama</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukkan nama anda"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full mb-3">
                    <label className="label" htmlFor="phone">
                      <span className="label-text">Telpon</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                      placeholder="Masukkan nomor telpon anda"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full mb-3">
                    <label className="label" htmlFor="poli">
                      <span className="label-text">Pilih Poli</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={poliId}
                      onChange={handlePoliChange}
                    >
                      <option value="" selected>
                        Poli
                      </option>
                      {poli.map((item: any) => (
                        <option value={item.id} key={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control w-full mb-3">
                    <label className="label" htmlFor="dokter">
                      <span className="label-text">
                        Pilih Jadwal dan Dokter
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={jadwalDetailId}
                      onChange={(e) => handleJadwalChange(e)}
                      required
                    >
                      <option value="" selected>
                        Dokter
                      </option>
                      {jadwal.map((item: any) => (
                        <option value={item.id}>
                          {item.jadwal.dokter.nama + " | " + item.nama_hari}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control w-full mb-3">
                    <label className="label" htmlFor="tanggal">
                      <span className="label-text">Tanggal Kunjungan</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      placeholder="Tanggal Kunjungan"
                      className="input input-bordered w-full"
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      readOnly
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-block btn-primary mt-3"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </Guest>
    );
}

export default Checkin;

export async function loader() {
  const poli = await axios.get("http://localhost:8000/api/poli");

  return {
    poli: poli.data.data,
  };
}