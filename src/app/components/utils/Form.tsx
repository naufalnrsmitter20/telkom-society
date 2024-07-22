import clsx from "clsx";
import { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  className?: string;
  value?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}
interface TextFieldProps extends InputProps {
  type: "email" | "text" | "password" | "number" | string;
}

interface OptionFieldProps {
  label: string;
  required?: boolean;
  options: { id: string; value: string }[];
  className?: string;
  value?: string | Array<string>;
  name: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
interface SelectFieldProps {
  label?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  className?: string;
  value?: string | Array<string>;
  name: string;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

// const mentor: DropdownProps[] = [
//   {
//     text: "M. Chusni Agus",
//     value: "M. Chusni Agus",
//     id: 1,
//   },
//   {
//     text: "Muhammad Bagus Arifin S.Pd",
//     value: "Muhammad Bagus Arifin S.Pd",
//     id: 2,
//   },
//   {
//     text: "Firmansyah Ayatullah",
//     value: "Firmansyah Ayatullah",
//     id: 3,
//   },
//   {
//     text: "More",
//     value: "More",
//     id: 4,
//   },
// ];

export function TextField({ required, placeholder, type, name, label, className, value, handleChange, disabled }: Readonly<TextFieldProps>) {
  return (
    <main className={clsx("flex flex-col gap-y-2", className)}>
      {label && (
        <label htmlFor={name} className={clsx(`text-[17px] font-normal ${required ? "after:text-red-500 after:content-['*']" : ""}`)}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={clsx("rounded-[8px] py-2.5 w-full mb-6 p-[10px] border border-slate-400", "placeholder:text-slate-600 placeholder:font-normal placeholder:tracking-wide")}
        required={required === true}
      />
    </main>
  );
}

export function TextArea({ className, handleChange, label, name, placeholder, required, value, disabled }: Readonly<InputProps>) {
  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      {label && (
        <label htmlFor={name} className={clsx(`text-[17px] font-normal ${required ? "after:text-red-500 after:content-['*']" : ""}`)}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        className={clsx("rounded-[8px] py-2.5 w-[575px] mb-6 p-[10px] border border-slate-400", "placeholder:text-slate-600 placeholder:font-normal placeholder:tracking-wide")}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export function DropDown({ name, options, className, disabled, handleChange, label, required, value }: Readonly<SelectFieldProps>) {
  return (
    <main className={clsx("flex flex-col gap-y-2", className)}>
      {label && (
        <label htmlFor={name} className={clsx(`text-[17px] font-normal ${required ? "after:text-red-500 after:content-['*']" : ""}`)}>
          {label}
        </label>
      )}
      <select className="rounded-[8px] py-2.5 w-[335px] xl:w-[575px] mb-6 p-[10px] border border-slate-400" name={name} value={value} onChange={handleChange} disabled={disabled} required={required}>
        <option value="null" disabled>
          Select
        </option>
        {options &&
          options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </main>
  );
}
