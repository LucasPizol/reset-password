import { BadRequest } from "@/main/adapters/http-response";

export const formatPhone = (phone: string): string => {
  const phoneWithoutExtraChars = phone.replace(/\D/g, "");
  const countryCode = "55";

  if (!phoneWithoutExtraChars.startsWith(countryCode))
    phone = countryCode + phoneWithoutExtraChars;

  if (phone.length !== 13)
    phone = `${phone.substring(0, 4)}9${phone.substring(4)}`;

  if (phone.length !== 13) throw new BadRequest("Phone number was incorrect");

  return phone;
};
