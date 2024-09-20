"use client";
import { FormButton } from "@/app/components/utils/Button";
import { TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { UpdateCoverProfile } from "@/utils/server-action/uploadCover";
import clsx from "clsx";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ModalEditCover({ setIsOpenModal }: { setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [cover, setCover] = useState<string>("");
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Loading...");
      const formData = new FormData(e.target);
      const cover = formData.get("cover") as File | undefined;
      if (cover?.name === "") return toast.error("Please select a file", { id: toastId });
      formData.append("cover", cover as File);
      const update = await UpdateCoverProfile(formData);
      if (update) {
        toast.success(update.message as string, { id: toastId });
        setIsOpenModal(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.log(error);
    }
  };
  return (
    <ModalProfile title="Edit Cover" onClose={() => setIsOpenModal(false)}>
      <form onSubmit={HandleSubmit} className="pb-10">
        <div>
          <label className={clsx(`text-[17px] font-normal after:text-red-500 after:content-['*']`)}>Upload Cover</label>
          <input
            type="file"
            className={clsx("rounded-[8px] py-2.5 w-full mb-6 p-[10px] border border-slate-400", "placeholder:text-slate-600 placeholder:font-normal placeholder:tracking-wide")}
            onChange={(e) => setCover(URL.createObjectURL(e.target.files![0]))}
            name="cover"
          />
        </div>
        <Image src={cover} alt="Cover" width={300} height={180} className="w-full h-44 object-cover" />
        <FormButton variant="base">Change</FormButton>
      </form>
    </ModalProfile>
  );
}
