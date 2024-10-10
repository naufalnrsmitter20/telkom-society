"use client";
import { FormButton } from "@/app/components/utils/Button";
import React, { useState } from "react";
import ModalUser from "./ModalUser";

export default function AddUser() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <FormButton type="button" variant="base" onClick={() => setModal(true)}>
        Add User
      </FormButton>
      {modal && <ModalUser setIsOpenModal={setModal} />}
    </>
  );
}
