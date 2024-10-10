"use client";
import { DeleteUser } from "@/utils/server-action/userGetServerSession";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalUser from "./ModalUser";
import AddUser from "./AddUser";
import { userPayloadOne, userWithUserAuthMany, userWithUserAuthOne } from "@/utils/relationsip";

export default function TableUser({ dataAdmin }: { dataAdmin: userWithUserAuthMany }) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<userPayloadOne | null>(null);
  const [loader, setLoader] = useState(true);

  const columns: TableColumn<userWithUserAuthOne>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Last Login",
      selector: (row) => (row.userAuth?.last_login ? row.userAuth?.last_login.toUTCString() : "Never"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button onClick={() => EditUser(row)} title="Edit" className="p-2 bg-blue-500 text-white rounded-lg hover:scale-110 active:scale-105 duration-150">
            <FaPencilAlt size={14} />
          </button>
          <button onClick={() => DeleteUserById(row.id)} title="Delete" className="p-2.5 bg-red-500 text-white rounded-md hover:scale-110 active:scale-105 duration-150">
            <FaTrash size={14} />
          </button>
        </div>
      ),
    },
  ];
  const EditUser = async (data: userPayloadOne) => {
    setModal(true);
    setModalData(data);
  };

  const DeleteUserById = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await DeleteUser(id);
    if (result) {
      toast.success(result.message, { id: toastId });
    }
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <section className="w-full m-[10px] mt-[20px]">
        <section className="max-w-[1440px] min-h-full mx-auto w-full bg-[#F6F6F6] p-4 outline outline-1 outline-slate-200">
          <div className="flex justify-between items-center">
            <h5 className="text-[40px] font-bold mx-5 text-[#F45846]">Admin</h5>
            <AddUser />
          </div>
          <div className="w-full border-b-2 border-gray-300"></div>
          <div className="mt-6">
            <DataTable data={dataAdmin} columns={columns} />
          </div>
        </section>
      </section>
      {modal && <ModalUser setIsOpenModal={setModal} data={modalData} />}
    </>
  );
}
