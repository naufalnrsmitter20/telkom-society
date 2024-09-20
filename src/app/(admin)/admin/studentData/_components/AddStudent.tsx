"use client";
import { FormButton } from "@/app/components/utils/Button";
import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

export default function AddStudent() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <FormButton type="button" variant="base" onClick={() => setModal(true)}>
        Add User
      </FormButton>
      {modal && <Modal setIsOpenModal={setModal} />}
    </>
  );
}
