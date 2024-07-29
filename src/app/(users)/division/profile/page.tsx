"use client";
import { LinkButton, FormButton } from "@/app/components/utils/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Division() {
  const router = useRouter();
  return (
    <main className="mt-20 lg:mt-32 mb-20">
      <div className="max-w-5xl mx-auto bg-white shadow-md lg:rounded-[20px] overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <div className="h-48 w-full object-cover md:w-48 bg-gray-300"></div>
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide font-semibold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">Grounded</div>

            <p className="block mt-1 text-sm text-black sm:text-sm md:text-sm lg:text-text-[16px] xl:text-[16px] leading-tight font-normal ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-between mt-4">
              <div>
                <p className="mt-2 text-gray-500 text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">Mentor: Sir Bagus</p>
                <p className="mt-2 text-gray-500 text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">ID: 123112313123</p>
              </div>
              <div className="flex space-x-0">
                <FormButton
                  variant="base"
                  onClick={() => {
                    router.push("/");
                  }}
                  className="px-4 py-2 scale-75 sm:scale-75 lg:scale-100 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Dissolve
                </FormButton>
                <FormButton
                  variant="base"
                  onClick={() => {
                    router.push("/");
                  }}
                  className="px-4 py-2 scale-75 sm:scale-75 lg:scale-100 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </FormButton>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-xl font-semibold">Member</h2>
              <table className="table-auto w-full mt-7">
                <tbody>
                  <tr className="flex justify-between items-center">
                    <td className="w-2/3">
                      <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black")}>Naufal Nabil Ramadhan (Leader) (Hacker)</p>
                    </td>
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center">
                    <td className="w-2/3">
                      <p className="text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black">Ryo Hariyono Angwyn (Hipster)</p>
                    </td>
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center">
                    <td className="w-2/3">
                      <p className="text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black">Haza Nasrullah (Hacker)</p>
                    </td>
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center">
                    <td className="w-2/3">
                      <p className="text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black">Fahrell Sandy (Hacker)</p>
                    </td>
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center">
                    <td className="w-2/3">
                      <p className="text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black">Dviki Wahyudi (Hustler)</p>
                    </td>
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="https://www.linkedin.com" className="text-blue-500 hover:underline">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" className="text-blue-500 hover:underline">
                Instagram
              </a>
              <a href="https://www.github.com" className="text-blue-500 hover:underline">
                Github
              </a>
              <a href="https://www.youtube.com" className="text-blue-500 hover:underline">
                Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
