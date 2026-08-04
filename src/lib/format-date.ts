const MONTHS = {
  ka: [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
} as const;

/** Deterministic date formatting (no Intl/ICU) so SSR and client always match. */
export function formatDate(date: string | Date, lang: "ka" | "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  const month = MONTHS[lang][d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return lang === "ka" ? `${day} ${month}, ${year}` : `${month} ${day}, ${year}`;
}
