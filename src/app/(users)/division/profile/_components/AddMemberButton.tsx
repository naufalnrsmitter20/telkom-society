import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import React from "react";
import prisma from "@/lib/prisma";

const AddMemberButton = async ({ OnButton, id }: { OnButton: () => void; id: string }) => {
  const findCurrentUser = await prisma.user.findUnique({ where: { id: id } });
  const findTeam = await prisma.team.findFirst({ where: { ownerId: findCurrentUser?.id } });
  return (
    <>
      {findTeam && (
        <FormButton variant="base" onClick={OnButton}>
          Tambah Anggota
        </FormButton>
      )}
    </>
  );
};
export default AddMemberButton;
// export const EditProfileButton = async ({ OnButton, id }: { OnButton: () => void; id: string }) => {
//   const findCurrentUser = await prisma.user.findUnique({ where: { id: id } });
//   const findTeam = await prisma.team.findFirst({ where: { ownerId: findCurrentUser?.id } });
//   return (
//     <>
//       {findTeam ? (
//         <FormButton variant="base" onClick={OnButton} className="">
//           Edit
//         </FormButton>
//       ) : (
//         <LinkButton variant="base" href="/" className="">
//           View
//         </LinkButton>
//       )}
//     </>
//   );
// };
