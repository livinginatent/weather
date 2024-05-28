import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type MainDetailsT = {
  country: string | undefined;
  city: string | undefined;
  temp: any;
  condition: string | undefined;
  date: string | undefined;
  loading: boolean;
  logo: any;
};
