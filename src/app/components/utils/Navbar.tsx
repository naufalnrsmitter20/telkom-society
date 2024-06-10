import Link from "next/link";
import Image from "next/image";

import Logo from "@/../public/Telkom Society 1.png";

export default function Navbar() {
  return (
    <nav className="flex justify-center item-center">
      <Link href={"#"}>
        <Image src={Logo} alt="Welcome to Society" />
      </Link>
      <ul className="flex gap-6">
        <li className="font-medium text-lg opacity-80 hover:">
          <Link href={"#"}>Home</Link>
        </li>
        <li className="font-medium text-lg opacity-80">
          <Link href={"#"}>Partner</Link>
        </li>
        <li className="font-medium text-lg opacity-80">
          <Link href={"#"}>Messages</Link>
        </li>
        <li className="font-medium text-lg opacity-80">
          <Link href={"#"}>Developer</Link>
        </li>
      </ul>
      <div></div>
    </nav>
  );
}
