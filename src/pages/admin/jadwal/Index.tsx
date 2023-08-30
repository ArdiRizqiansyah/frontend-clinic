import { Link, useLoaderData } from "react-router-dom";
import Admin from "../../../layout/Admin";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function handleDataDoctor() {
  return axios
    .get("http://localhost:8000/api/admin/jadwal", config)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function Index() {
  const data = useLoaderData() ?? {};
  const [jadwal, setJadwal] = useState<{ [key: string]: any }>({});
  const [deleteId, setDeleteId] = useState<number>(0);

  useEffect(() => {
    setJadwal(data);
  }, [data]);

  const handleDeleteData = async (id: number) => {
    await axios
      .delete(`http://localhost:8000/api/admin/jadwal/${id}`, config)
      .then((response) => {
        toast.success("Data berhasil dihapus");

        handleDataDoctor().then((data) => {
          setJadwal(data);
        });

        hideModal();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // show modal
  const showModal = (id: number) => {
    const modal = document.getElementById("modal_delete");
    modal?.setAttribute("open", "true");

    setDeleteId(id);
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
            <h3 className="font-semibold text-gray-700">Daftar Jadwal Praktek</h3>
            <Link to="/admin/jadwal/create" className="btn btn-sm btn-primary">
              Tambah Jadwal
            </Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Dokter</th>
                <th>Kouta</th>
                <th>Jumlah Jadwal Perminggu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              
              {Object.keys(jadwal).length === 0 ? (
                <tr className="text-center">
                  <td colSpan={3}>Tidak ada data dokter.</td>
                </tr>
              ) : (
                Object.entries(jadwal).map(([key, item]) => (
                  <tr key={key}>
                    <td>
                      {parseInt(key) + 1}
                    </td>
                    <td>{item.dokter.nama}</td>
                    <td>{item.kouta}</td>
                    <td>{item.jadwal_detail.length}/7</td>
                    <td className="whitespace-nowrap">
                      <Link
                        to={`/admin/jadwal/${item.id}/detail`}
                        className="btn btn-xs btn-primary mr-2"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/admin/jadwal/edit/${item.id}`}
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

export async function loader() {
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await axios.get(
    "http://localhost:8000/api/admin/jadwal",
    config
  );

  return response.data.data;
}
