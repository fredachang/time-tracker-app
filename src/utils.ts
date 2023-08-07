import { format } from "date-fns";

export const formatCount = (MiliSeconds: number) => {
  const formatted = format(MiliSeconds, "mm:ss");
  return formatted;
};
