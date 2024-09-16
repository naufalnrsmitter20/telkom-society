"use client";
import { FormButton } from "@/app/components/utils/Button";
import React from "react";

export default function Reload() {
  return (
    <FormButton onClick={() => window.location.reload()} variant="base" className="w-full text-center">
      Reload
    </FormButton>
  );
}
