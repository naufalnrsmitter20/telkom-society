"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import AdminHeaders from "../main/AdminHeaders";
import { findAllUsers } from "@/utils/user.query";
import { updateRole } from "@/utils/server-action/userGetServerSession";
import { DropDown } from "@/app/components/utils/Form";
import { Role } from "@prisma/client";
import toast from "react-hot-toast";
import { FormButton } from "@/app/components/utils/Button";

export default function Hero(props: any) {
  return <></>;
  // const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>({});
  // const handleRoleChange = (userId: string, newRole: string) => {
  //   setSelectedRoles((prev) => ({
  //     ...prev,
  //     [userId]: newRole,
  //   }));
  // };
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData(e.target as HTMLFormElement);
  //     const toastID = toast.loading("Loading ...");
  //     for (const userId in selectedRoles) {
  //       formData.set("role", selectedRoles[userId]);
  //       await updateRole(userId, formData);
  //     }
  //     toast.success("Role updated successfully!", { id: toastID });
  //   } catch (error) {
  //     toast.error("Failed to update role!");
  //     throw new Error((error as Error).message);
  //   }
  // };
  // return (
  //   <div className="flex flex-col">
  //     <div className="grid grid-cols-1 grid-rows-3 p-4 gap-y-4">
  //       <form onSubmit={handleSubmit}>
  //         {props.datas.map((user: any, x: any) => (
  //           <div key={x} className="flex items-center m-5 justify-between p-3 bg-white drop-shadow rounded-[12px]">
  //             <p className="text-[20px] font-medium mx-5">{user.name}</p>
  //             <h6 className="text-[20px] font-medium mx-5">{user.clasess}</h6>
  //             <p className="text-[20px] font-medium mx-5">{user.email}</p>
  //             <div className="flex items-center">
  //               <DropDown
  //                 label="Role"
  //                 options={Object.values(Role).map((role) => ({
  //                   label: role,
  //                   value: role,
  //                 }))}
  //                 className="rounded-xl flex justify-center items-center bg-highlight text-black p-3 m-3"
  //                 name={`role-${user.id}`}
  //                 value={selectedRoles[user.id] || user.role}
  //                 handleChange={(e: ChangeEvent<HTMLSelectElement>) => handleRoleChange(user.id, e.target.value)}
  //               />
  //             </div>
  //           </div>
  //         ))}
  //         <FormButton type="submit" variant="base">
  //           Submit
  //         </FormButton>
  //       </form>
  //     </div>
  //   </div>
  // );
}
