import axios from "axios";
import Guest from "../layout/Guest";
import { useLoaderData } from "react-router-dom";
import HeroIcons from "../components/icons/HeroIcons";

function HomePage() {
  interface DataLoader {
    poli?: any;
    dokter?: any;
  }

  const dataLoader = useLoaderData() as DataLoader;

  const { poli, dokter } = dataLoader;

  return (
    <Guest>
      {/* hero */}
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="hero"
          />
          <div>
            <h1 className="text-5xl font-bold">My Klinik</h1>
            <p className="py-6">
              {/* deskripsi singkat tentang klinik kesehatan */}
              Klinik kesehatan yang menyediakan layanan kesehatan yang
              terjangkau dan berkualitas dengan dokter yang berpengalaman.
              silahkan daftar untuk mendapatkan layanan kesehatan yang terbaik.
            </p>
            <button className="btn btn-primary">Daftar</button>
          </div>
        </div>
      </div>
      {/* end hero */}
      {/* poli */}
      <div className="bg-base-300 py-8">
        <div className="container mx-auto">
          <h3 className="text-center mb-8">Poli Tersedia</h3>
          <div className="flex flex-wrap flex-row justify-center gap-6">
            {poli.map((item: any) => (
              <div className="card bg-base-100 shadow-xl basis-1/4">
                <div className="card-body">
                  <span className="text-center">
                    {item.ikon ? ( // jika ada
                      <HeroIcons icon={item.ikon} className="w-8 h-8" />
                    ) : (
                      <HeroIcons icon="user-plus-outline" className="w-8 h-8" />
                    )}
                  </span>
                  <h2 className="card-title">{item.nama}</h2>
                  <p>{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end poli */}
      {/* dokter */}
      <div className="bg-base-100 py-8 mb-5">
        <div className="container mx-auto">
          <h3 className="text-center mb-8">Dokter Kami</h3>
          <div className="flex flex-wrap flex-row justify-center gap-6">
            {dokter.map((item: any) => (
              <div className="card bg-base-100 shadow-xl basis-1/4">
                <div className="card-body">
                  <span className="text-center">
                    <HeroIcons icon="user-circle-outline" className="w-8 h-8" />
                  </span>
                  <h2 className="card-title">
                    {item.nama} ({item.poli.nama})
                  </h2>
                  {/* cek menggunakan if jika dokter punya jadwal */}
                  {item.jadwal && item.jadwal.jadwal_detail.length > 0 ? (
                    // looping jadwal dokter
                    item.jadwal.jadwal_detail.map((jadwal: any) => (
                      <>
                        <ul className="list-disc list-inside">
                          <li>{jadwal.nama_hari}</li>
                        </ul>
                      </>
                    ))
                  ) : (
                    <p>Jadwal Praktek: Tidak ada jadwal</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end dokter */}
    </Guest>
  );
}

export default HomePage;

export async function loader(){
  const poli = await axios.get("http://localhost:8000/api/poli");
  const dokter = await axios.get('http://localhost:8000/api/dokter');

  return {
    poli: poli.data.data,
    dokter: dokter.data.data
  }
}