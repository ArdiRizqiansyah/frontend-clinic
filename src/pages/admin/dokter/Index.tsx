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
    .get("http://localhost:8000/api/admin/dokter", config)
    .then((response) => {
      return response.data.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

function Index() {
  interface Doctor {
    id: number;
    nama: string;
    poli: any;
  }

  const data = useLoaderData() ?? {};
  const [doctor, setDoctor] = useState<{ [key: string]: Doctor }>({});
  const [deleteId, setDeleteId] = useState<number>(0);

  useEffect(() => {
    setDoctor(data as { [key: string]: Doctor });
  }, [data]);

  const handleDeleteData = async (id: number) => {
    await axios
      .delete(`http://localhost:8000/api/admin/dokter/${id}`, config)
      .then((response) => {
        toast.success("Data berhasil dihapus");

        handleDataDoctor().then((data) => {
          setDoctor(data);
        });

        hideModal();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

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
            <h3 className="font-semibold text-gray-700">Daftar Dokter</h3>
            <Link to="/admin/doctor/create" className="btn btn-sm btn-primary">
              Tambah Dokter
            </Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Poli</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(doctor).length === 0 ? (
                <tr className="text-center">
                  <td colSpan={3}>Tidak ada data dokter.</td>
                </tr>
              ) : (
                Object.entries(doctor).map(([key, item]) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.poli.nama}</td>
                    <td className="whitespace-nowrap">
                      <Link
                        to={`/admin/doctor/edit/${item.id}`}
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

  const response = await axios.get("http://localhost:8000/api/admin/dokter", config);

  return response.data.data;
}