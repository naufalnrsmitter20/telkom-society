

import React, { ChangeEvent } from "react";
import { findAllUsers } from "@/utils/user.query";
import {
  updateRole,
} from "@/utils/server-action/userGetServerSession";
import toast from "react-hot-toast";
import Hero from "@/app/(admin)/admin/components/Hero/page";
import AdminHeaders from "../components/main/AdminHeaders";


export default async function studentData() {
  const datas = await findAllUsers({
    role: "SISWA",
  });

  
  return (
    <div className="flex flex-col">
      <AdminHeaders data="Student Data" />
      <Hero datas={datas}/>
    </div>
  );
}
