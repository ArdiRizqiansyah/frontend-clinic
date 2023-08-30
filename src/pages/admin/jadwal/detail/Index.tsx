import { Link, useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Admin from "../../../../layout/Admin";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function handleDataJadwalDetail(jadwal_id: number) {
  return axios
    .get("http://localhost:8000/api/admin/jadwal/" + jadwal_id + '/jadwal-detail', config)
    .then((response) => {
      return response.data.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

function Index() {
  const params: { id?: any } = useParams();

  const data: { jadwal_detail?: any; jadwal?: any } = useLoaderData() ?? {};

  const [jadwalDetail, setJadwalDetail] = useState<{ [key: string]: any }>({});
  const [deleteId, setDeleteId] = useState<number>(0);

  useEffect(() => {
    setJadwalDetail(data.jadwal_detail);
  }, [data]);

  const handleDeleteData = async (id: number) => {
    await axios
      .delete(`http://localhost:8000/api/admin/jadwal-detail/${id}`, config)
      .then((response) => {
        toast.success("Data berhasil dihapus");

        const dataJadwalDetail = handleDataJadwalDetail(params.id);

        setJadwalDetail(dataJadwalDetail);

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

  // update is available
  const updateIsAvailable = async (id: number, element: any) => {
    const formData = {
      tabel: "jadwal_detail",
      id: id,
      is_available: !element.checked,
    };

    await axios
      .post(
        `http://localhost:8000/api/admin/publish`,
        formData,
        config
      )
      .then((response) => {
        toast.success("Data berhasil diupdate");

        element.checked = !formData.is_available;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Admin>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-700 capitalize">
              Detail Jadwal Dokter {data.jadwal.dokter.nama}
            </h3>
            <Link
              to={`/admin/jadwal/${params.id}/detail/create`}
              className="btn btn-sm btn-primary"
            >
              Tambah Detail Jadwal
            </Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Hari</th>
                <th>Jam Mulai</th>
                <th>Jam Selesai</th>
                <th>Publish</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(jadwalDetail).length === 0 ? (
                <tr className="text-center">
                  <td colSpan={5}>Tidak ada data dokter.</td>
                </tr>
              ) : (
                Object.entries(jadwalDetail).map(([key, item]) => (
                  <tr key={item.id}>
                    <td>{item.nama_hari}</td>
                    <td>{item.jam_mulai}</td>
                    <td>{item.jam_selesai}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={item.is_available}
                        onClick={(e) =>
                          updateIsAvailable(
                            item.id,
                            e.target
                          )
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap">
                      <Link
                        to={`/admin/jadwal/${item.jadwal_id}/detail/edit/${item.id}`}
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

export async function loader({ params }: any) {
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const jadwal_detail = await axios.get(
    "http://localhost:8000/api/admin/jadwal/" + params.id +'/jadwal-detail',
    config
  );

  const jadwal = await axios.get(
    `http://localhost:8000/api/admin/jadwal/${params.id}`,
    config
  );

  return {
    jadwal_detail: jadwal_detail.data.data,
    jadwal: jadwal.data.data,
  };
}
