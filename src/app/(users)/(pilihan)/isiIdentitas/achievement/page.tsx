import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { TextArea, TextField } from "@/app/components/utils/Form";
import React from "react";

export default function Achievement() {
  return (
    <>
      <main className="mt-[150px] flex w-full">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px]">Isi Identitas</p>
          <h1 className="text-[48px] font-[700] opacity-60">Achievement</h1>
          <form className="mt-[40px] grid gap-0 xl:gap-[105px] grid-cols-1 lg:grid-cols-2">
            <div>
              <TextArea name="Biography" placeholder="type your Biography" label="Biography" />
              <div>
                <TextField label="Certificate" name="Certificate" type="text" placeholder="Achievement Name" />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField name="Instagram Username" placeholder="Instagram Username" label="Instagram Username" type="text" />
                <TextField name="Github Username" placeholder=" Github Username" label="Github Username" type="text" />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField name="Whatsapp Number" placeholder="Whatsapp Number" label="Whatsapp Number" type="text" />
                <TextField name="Linkedin Username" placeholder=" Linkedin Username" label="Linkedin Username" type="text" />
              </div>
              <div className="flex justify-between my-6 xl:my-12">
                <div className="flex gap-[45px] items-center justify-end w-full">
                  <LinkButton variant="white" href="/profile">
                    Skip
                  </LinkButton>

                  <FormButton type="submit" className="text-[20px]" variant="base">
                    Save Identity
                  </FormButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
