import Image from "next/image";
import LinkButton from "./components/utils/Button";

export default function Home() {
  return (
    <>
      <LinkButton href="#" variant="white" className="mt-11 ml-6" withArrow={true}>
        Join
      </LinkButton>
    </>
  );
}
