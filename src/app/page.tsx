import Navbar from "./components/utils/Navbar";
import Image from "next/image";

import Orangkeren from "@/../public/img/Element01.png";

export default function Home() {
  return (
    <main>
      <div className="mt-[119px]">
        <div>
          <div></div>
          <div>
            <Image src={Orangkeren} alt="Orang Sukses Amin" />
          </div>
        </div>
      </div>
    </main>
  );
}
