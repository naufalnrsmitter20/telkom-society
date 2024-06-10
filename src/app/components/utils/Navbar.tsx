import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex item-center justify-center">
      <div className="h-[82px]"></div>
      <ul className="flex">
        <li className="">
          <Link href={"#"}>Home</Link>
        </li>
        <li>
          <Link href={"#"}>Partner</Link>
        </li>
        <li>
          <Link href={"#"}>Messages</Link>
        </li>
        <li>
          <Link href={"#"}>Developer</Link>
        </li>
      </ul>
      <div></div>
    </nav>
  );
}
