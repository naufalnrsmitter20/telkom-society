interface FooterProps {
  variants?: "red" | "invis";
}

export default function Footer({ variants }: FooterProps) {
  const redFooter = variants === "red";
  const invisFooter = variants === "invis";
  if (redFooter) {
    return (
      <footer className="flex justify-center items-center h-16 staticssss bottom-0 left-0 right-0 z-10 bg-red-500 text-white">
        <p className="text-center">© 2024 - SMK Telkom Malang</p>
      </footer>
    );
  } else if (invisFooter) {
    return (
      <footer className="flex justify-center items-center h-16 bg-transparant text-black">
        <p className="text-center opacity-50">© 2024 - SMK Telkom Malang</p>
      </footer>
    );
  }
}
