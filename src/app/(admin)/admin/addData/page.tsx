/* eslint-disable @next/next/no-async-client-component */
"use client";
import { findAllUsers, updateUser, updateUserAuth } from "@/utils/user.query";
import { Prisma, Role } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default async function App() {
  const [formData, setFormData] = useState({
    email: "",
    newRole: "",
  });
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const usersData = await findAllUsers();
  setUsers(usersData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: make sure no field is empty
    const requiredFields = ["email", "newRole"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      setError(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setError(null);

    try {
      const user = users.find((user) => user.email === formData.email);
      if (user) {
        await updateUser(
          { email: formData.email },
          { role: formData.newRole as Role }
        );
        const toastId = toast.loading("loading...");
        setSuccess("User role updated successfully");
        toast.success("User role updated successfully", { id: toastId });
      } else {
        setError("User not found");
        toast.error("User role updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user role");
    }
  };
  return (
    <>
      <div className="container w-screen h-screen flex justify-center items-center">
        <div className="border-moklet border-2 w-80 h-fit rounded-lg flex justify-center flex-col relative items-center">
          <form
            className="flex justify-center flex-col items-center p-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-medium absolute top-0 text-white bg-highlight w-full p-5 text-center">
              ADDING DATA FORM
            </h1>
            <h1 className="text-xl mt-12 font-bold text-white bg-moklet p-2 rounded-2xl w-fit m-2">
              Email
              <input
                type="text"
                name="email"
                placeholder="Masukkan Gmail"
                defaultValue={formData.email}
                onChange={handleChange}
                className="text-black text-sm font-medium border-2 w-full rounded-lg p-3 border-moklet placeholder-slate-400"
              />
            </h1>
            <div className="text-xl mt-4 font-bold text-white bg-moklet p-2 rounded-2xl w-fit m-2">
              New Role
              <input
                type="text"
                name="newRole"
                placeholder="Masukkan role baru"
                defaultValue={formData.newRole}
                onChange={handleChange}
                className="text-black text-sm font-medium border-2 w-full rounded-lg p-3 border-moklet placeholder-slate-400"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <button
              type="submit"
              className="m-5 w-1/2 p-2 text-white items-center justify-center h-10 flex rounded-lg bg-moklet"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
