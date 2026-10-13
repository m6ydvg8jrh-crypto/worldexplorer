
const regionNames = new Intl.DisplayNames(
    ["lt"],
    { type: "region" }
  );
  
  export function getCountryName(code) {
    if (!code || typeof code !== "string") {
      return "Nežinoma valstybė";
    }
  
    try {
      return regionNames.of(code.toUpperCase()) || code;
    } catch {
      return code;
    }
  }
  