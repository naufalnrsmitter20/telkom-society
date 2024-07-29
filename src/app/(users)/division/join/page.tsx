import { FormButton } from "@/app/components/utils/Button";
import { TextField } from "@/app/components/utils/Form";

export default function joinPage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <div className="flex flex-col place-items-center h-full mt-40">
        <h1 className="text-[48px] font-bold opacity-60 text-center mt-32 mb-12">Input Division Id</h1>
        <div className="mx-auto w-full max-w-lg flex gap-x-4 items-center">
          <TextField type="text" className="w-full" />
          <FormButton variant="base" className="h-auto mb-6">
            Enter
          </FormButton>
        </div>
      </div>
    </main>
  );
}
