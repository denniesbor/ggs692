// This dictionary maps the dishes to the country of origin
// The countries flags of the countries are downloaded from "https://github.com/legacy-icons/famfamfam-flags/tree/master"

const cuisineCountryMap = {
  mexican: "mx",
  thai: "th",
  vietnamese: "vn",
  seafood: "", // Not country-specific
  italian: "it",
  deli: "", // Deli is not country-specific
  pizza: "it",
  steak_house: "", // Steak houses are not country-specific
  salad: "", // Salad is not country-specific
  indian: "in",
  chinese: "cn",
  asian: "", // Asian is a continent, not a country
  latin_american: "", // Latin America is a region
  american: "us",
  regional: "",
  ethiopian: "et",
  "Middle East": "",
  tapas: "es",
  kebab: "tr",
  sandwich: "",
  balkan: "",
  international: "",
  french: "fr",
  pasta: "it",
  "american;steak": "us",
  korean: "kr",
  japanese: "jp",
  salvadorian: "sv",
  spanish: "es",
  middle_eastern: "",
  burger: "us",
  afghan: "af",
  caribbean: "",
  mediterranean: "",
  greek: "gr",
  uyghur: "cn",
  "bar&grill": "", // Not country-specific
  "breakfast;pancake": "us",
  "korean;wings": "kr",
  "chicken;portuguese": "pt",
  noodle: "cn", 
  American: "us",
  america: "us",
  sushi: "jp",
  moroccan: "ma",
  fondue: "ch", // Swiss
  portuguese: "pt",
  turkish: "tr",
  peru: "pe",
  steak: "", // Not country-specific
  barbecue: "us",
  lebanese: "lb",
  Ghanaian: "gh",
  "mediterranean;middle_eastern": "", // These are regions, not a specific country
  irish: "ie",
  guatemalan: "gt",
  "french;steak;brunch;lunch": "fr",
  "steak_house;brazilian": "br",
  "tex-mex": "us", // Tex-Mex cuisine
  Korean_Tacos: "kr", // Korean cuisine
  hawaiian: "us", // Hawaiian cuisine, part of the United States
};

// Function to get flag icon URL
function getFlagIconUrlByCountryCode(countryCode) {
  return `./flags/${countryCode}.png`;
}

const get_flag_icon = (dish) => {
  const countryCode = cuisineCountryMap[dish] || "location";

  //   Get the URL of the flag from the dowloaded files
  const flagIconUrl = getFlagIconUrlByCountryCode(countryCode);

  return flagIconUrl;
};

export default get_flag_icon;
