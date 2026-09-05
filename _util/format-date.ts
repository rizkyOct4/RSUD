export const FormatDate = (value: Date) => {
  return new Date(value).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // ! Z at the end
  });
};

export const formatLocalDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}; // ? 05/09/2026 - 08/09/2026

export const ConvertDateLocalIntoDate = (dateLocal: Date):string => {
  const converted = [
    dateLocal.getFullYear(),
    String(dateLocal.getMonth() + 1).padStart(2, "0"),
    String(dateLocal.getDate()).padStart(2, "0"),
  ].join("-");

  return converted;
};

export const ConvDateIntl = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date)); // ? sabtu, 04 january 2026
}