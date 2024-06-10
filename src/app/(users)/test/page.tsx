import { FormButton, LinkButton } from "@/app/components/utils/Button";
import React from "react";

export default function page() {
  return (
    <div className="mt-48">
      <LinkButton href="#" variant="base" loading>
        Hello
      </LinkButton>
      <LinkButton href="#" variant="white" loading>
        Hello
      </LinkButton>
      <FormButton type="button" variant="disable">
        Hai
      </FormButton>
    </div>
  );
}
