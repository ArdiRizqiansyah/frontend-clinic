import { Link } from "react-router-dom";
import Admin from "../../../layout/Admin";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroIcons from "../../../components/icons/HeroIcons";

function Index(){
  interface Poli {
    id: number;
    nama: string;
    deskripsi: string;
    ikon: string;
    dokter_count: number;
  };

  // initialize state poli
  const [poli, setPoli] = useState<{ [key: string]: Poli }>({});
  const [deleteId, setDeleteId] = useState<number>(0);

  // handle data poli
  const handleDataPoli = async () => {
    // get token from localStorage
    const token = localStorage.getItem("token");

    // set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // send request to server
    await axios
      .get("http://localhost:8000/api/admin/poli", config)
      .then((response) => {
        setPoli(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    handleDataPoli();
  }, []);

  // handle delete data
  const handleDeleteData = async (id: number) => {
    // get token from localStorage
    const token = localStorage.getItem("token");

    // set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // send request to server
    await axios
      .delete(`http://localhost:8000/api/admin/poli/${id}`, config)
      .then((response) => {
        handleDataPoli();

        toast.success("Data berhasil dihapus.");

        const modal = document.getElementById("modal_delete");
        modal?.removeAttribute("open");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // show modal
  const showModal = (poli_id :number) => {
    const modal = document.getElementById("modal_delete");
    modal?.setAttribute("open", "true");
    
    setDeleteId(poli_id);
  };

  // hide modal
  const hideModal = () => {
    const modal = document.getElementById("modal_delete");
    modal?.removeAttribute("open");

    setDeleteId(0);
  };

  return (
    <Admin>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-700">Daftar Poli</h3>
            <Link to="/admin/poli/create" className="btn btn-sm btn-primary">
              Tambah Poli
            </Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Jumlah Dokter</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* show poli */}
              {Object.keys(poli).length === 0 ? (
                <tr className="text-center">
                  <td colSpan={4}>Tidak ada data poli.</td>
                </tr>
              ) : (
                Object.entries(poli).map(([key, item]) => (
                  <tr key={key}>
                    <td className="flex items-center flex-nowrap gap-2">
                      {/* cek apakah ada icon atau tidak */}
                      {item.ikon ? ( // jika ada
                        <HeroIcons icon={item.ikon} />
                      ) : (
                        <HeroIcons icon="user-plus-outline" />
                      )}
                      <p className="whitespace-nowrap">{item.nama}</p>
                    </td>
                    <td>{item.deskripsi}</td>
                    <td>{item.dokter_count}</td>
                    <td className="whitespace-nowrap">
                      <Link
                        to={`/admin/poli/edit/${item.id}`}
                        className="btn btn-xs btn-success mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => showModal(item.id)}
                        className="btn btn-xs btn-error"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />

      <dialog id="modal_delete" className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteData(deleteId);
          }}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Yakin ingin menghapus data!</h3>
          <p className="py-4">
            Data yang sudah dihapus tidak dapat dikembalikan lagi.
          </p>
          <div className="modal-action">
            <button type="submit" className="btn btn-error">
              Ya
            </button>
            <button type="button" className="btn" onClick={hideModal}>
              Tidak
            </button>
          </div>
        </form>
      </dialog>
    </Admin>
  );
}

export default Index;