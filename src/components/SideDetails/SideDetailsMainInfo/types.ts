import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type MainDetailsT = {
  country?: string | undefined;
  city: string | undefined | null;
  temp: string;
  feelsLike:string,
  condition: string | undefined;
  date: string | undefined;
  logo: any;
  loading?:boolean
};
