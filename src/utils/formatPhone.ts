export const formatPhoneNumber = (phoneNumber: string | null | undefined): string => {
  if (!phoneNumber) {
    return "";
  }
  if (phoneNumber.startsWith("0")) {
    return "62" + phoneNumber.slice(1);
  }
  return phoneNumber;
};
