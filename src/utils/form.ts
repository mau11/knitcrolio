import { YarnFormFields } from "@custom-types/yarn";

export const parseFormQueryParams = (
  params: URLSearchParams
): Partial<YarnFormFields> => {
  const keys: (keyof YarnFormFields)[] = [
    "brand",
    "yarnType",
    "color",
    "colorFamily",
    "weight",
    "material",
    "care",
    "skeinWeight",
    "qty",
    "notes",
  ];

  return keys.reduce((acc, key) => {
    const value = params.get(key);
    if (value !== null) {
      if (key === "qty") {
        acc[key as keyof YarnFormFields] = Number(value) as any;
      } else {
        acc[key as keyof YarnFormFields] = value as any;
      }
    }
    return acc;
  }, {} as Partial<YarnFormFields>);
};
