import { LinkButton } from "@/app/components/utils/Button";

export default function Division() {
  return (
    <main className=" flex w-full flex-col h-screen ">
      <h1 className="text-[48px] font-bold opacity-60 ml-[78px] mt-32">
        Choose Between
      </h1>
      <div className="mx-auto w-fit my-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] -mt-32">
          <LinkButton
            href="division/create"
            variant="base"
            className="scale-150"
          >
            Create
          </LinkButton>
          <h1 className="place-items-center flex ">Or</h1>
          <LinkButton href="division/join" variant="base" className="scale-150">
            Join
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
