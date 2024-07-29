import { Job } from "@prisma/client";

export interface occupationProps {
  occupation: string;
  value: Job;
  id: number;
}

export const occupation: occupationProps[] = [
  {
    occupation: "Hipster (Product Innovation & Design)",
    value: "Hipster",
    id: 1,
  },
  {
    occupation: "Hacker (Software and Technology)",
    value: "Hacker",
    id: 2,
  },
  {
    occupation: "Hustler (Product Presenter and Finance)",
    value: "Hustler",
    id: 3,
  },
  // {
  //   occupation: "Undefined",
  //   value: "Undefined",
  //   id: 4,
  // },
];
