"use client";
import { ReactNode, useState } from "react";

interface FormProps {
  variants: "big" | "medium" | "small" | "dropdown";
  formText: ReactNode;
  formPlaceholder?: string;
  formName: string;
  formType?: string;
  className?: string;
  dropvar?: "gender" | "religion";
  inClassName?: string;
}

interface DropdownProps {
  text: string;
  value: string;
  id: number;
}

export default function Form({
  formText,
  formPlaceholder,
  formType,
  formName,
  variants,
  className,
  dropvar,
  inClassName,
}: FormProps) {
  const gender: DropdownProps[] = [
    {
      text: "Male",
      value: "Male",
      id: 1,
    },
    {
      text: "Female",
      value: "Female",
      id: 2,
    },
  ];

  const religion: DropdownProps[] = [
    {
      text: "Islam",
      value: "Islam",
      id: 1,
    },
    {
      text: "Kristen Protestan",
      value: "Kristen Protestan",
      id: 2,
    },
    {
      text: "Kristen Katolik",
      value: "Kristen Katolik",
      id: 3,
    },
    {
      text: "Budha",
      value: "Budha",
      id: 4,
    },
    {
      text: "Hindu",
      value: "Hindu",
      id: 5,
    },
    {
      text: "Konghucu",
      value: "Konghucu",
      id: 6,
    },
  ];

  const [selectedgender, setSelectedgender] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedgender = gender.find((e) => e.value === selectedValue);
    setSelectedgender(selectedgender ? selectedgender.id : null);
  };

  const bigForm = variants === "big";
  const mediumForm = variants === "medium";
  const smallForm = variants === "small";
  const dropdownForm = variants === "dropdown";

  if (bigForm) {
    return (
      <main className={className}>
        <label htmlFor="" className="flex flex-col opacity-80">
          <span className="text-[17px] font-normal mb-[10px]">{formText}</span>
          <textarea
            className={`rounded-[8px] h-[56px] w-[575px] mb-6 p-[10px] outline outline-gray-400`}
            // type={formType}
            placeholder={formPlaceholder}
            name={formName}
          />
        </label>
      </main>
    );
  } else if (mediumForm) {
    return (
      <main className={className}>
        <label htmlFor="" className="flex flex-col opacity-80">
          <span className="text-[17px] font-normal mb-[10px]">{formText}</span>
          <input
            className={`rounded-[8px] h-[56px] w-[335px] xl:w-[575px] mb-6 p-[10px] outline outline-gray-400`}
            type={formType}
            placeholder={formPlaceholder}
            name={formName}
          />
        </label>
      </main>
    );
  } else if (smallForm) {
    return (
      <main className={className}>
        <label htmlFor="" className="flex flex-col opacity-80">
          <span className="text-[17px] font-normal mb-[10px]">{formText}</span>
          <input
            className={`rounded-[8px] h-[56px] w-[335px] xl:w-[260px] mb-6 p-[10px] outline outline-gray-400`}
            type={formType}
            placeholder={formPlaceholder}
            name={formName}
          />
        </label>
      </main>
    );
  } else if (dropdownForm) {
    const drop1 = dropvar === "gender";
    const drop2 = dropvar === "religion";
    if (drop1) {
      return (
        <main className={className}>
          <label htmlFor="" className="flex flex-col opacity-80">
            <span className="text-[17px] font-normal mb-[10px]">
              {formText}
            </span>
            <select className="rounded-[8px] h-[56px] w-[335px] xl:w-[575px] mb-6 p-[10px] outline outline-gray-400">
              <option selected>Select Gender</option>
              {gender.map((e, i) => (
                <option key={i} value={e.value}>
                  {e.text}
                </option>
              ))}
            </select>
          </label>
        </main>
      );
    } else if (drop2) {
      return (
        <main className={className}>
          <label htmlFor="" className="flex flex-col opacity-80">
            <span className="text-[17px] font-normal mb-[10px]">
              {formText}
            </span>
            <select className="rounded-[8px] h-[56px] w-[335px] xl:w-[575px] mb-6 p-[10px] outline outline-gray-400">
              <option selected>Select Region</option>
              {religion.map((e, i) => (
                <option key={i} value={e.value}>
                  {e.text}
                </option>
              ))}
            </select>
          </label>
        </main>
      );
    }
  }
}
