"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DeleteUser } from "@/utils/server-action/userGetServerSession";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import AddStudent from "./AddStudent";
import ModalStudent from "./Modal";

export default function Table({ studentData }: { studentData: Prisma.UserGetPayload<{ include: { userAuth: true } }>[] }) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<Prisma.UserGetPayload<{ include: { userAuth: true } }> | null>(null);
  const [loader, setLoader] = useState(true);
  const columns: TableColumn<Prisma.UserGetPayload<{ include: { userAuth: true } }>>[] = [
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
  const EditUser = async (data: Prisma.UserGetPayload<{ include: { userAuth: true } }>) => {
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
      <section className="min-w-[1440px] max-w-full min-h-full w-full bg-[#F6F6F6] p-4 outline outline-1 outline-slate-200 ml-6">
        <div className="flex justify-end items-center">
          <AddStudent />
        </div>
        <div className="w-full border-b-2 border-black "></div>
        <div className="mt-6">
          <DataTable data={studentData} columns={columns} />
        </div>
        {modal && <ModalStudent setIsOpenModal={setModal} data={modalData} />}
      </section>
    </>
  );
}
