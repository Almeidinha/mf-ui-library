import flagsLarge from "../assets/flags-large-32.png";
import flagsMedium from "../assets/flags-medium-32.png";
import flagsSmall from "../assets/flags-small-32.png";
import {
  FlagHeightValues,
  FlagSize,
  FlagWidthValues,
} from "../flag-size-flags";
import { CountryCodes } from "../types";

const flagSheets = {
  [FlagSize.Small]: flagsSmall,
  [FlagSize.Medium]: flagsMedium,
  [FlagSize.Large]: flagsLarge,
};

export function getSheetDimensionByCode(size: FlagSize) {
  switch (size) {
    case FlagSize.Small:
      return "209px 545px";
    case FlagSize.Medium:
      return "209px 545px";
    case FlagSize.Large:
      return "329px 649px";
    default:
      return "209px 545px";
  }
}

export function getFlagAssetByCode(size: FlagSize) {
  switch (size) {
    case FlagSize.Small:
      return flagSheets[FlagSize.Small];
    case FlagSize.Medium:
      return flagSheets[FlagSize.Medium];
    case FlagSize.Large:
      return flagSheets[FlagSize.Large];
    default:
      return flagSheets[FlagSize.Small];
  }
}

const codes: CountryCodes[] = [
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ-BO",
  "BQ-SA",
  "BQ-SE",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB-ENG",
  "GB-NIR",
  "GB-SCT",
  "GB",
  "GB-WLS",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GP-FR",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MQ-FR",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PM-FR",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT-UNF",
  "ZA",
  "ZM",
  "ZW",
];

const FLAG_SHEET_X = 10;

const getFlagPosition = (index: number, size: FlagSize) => {
  const w = FlagWidthValues[size];
  const h = FlagHeightValues[size];
  const x = Math.floor(index % FLAG_SHEET_X);
  const y = Math.floor(index / FLAG_SHEET_X);

  return `-${x * w + x}px -${y * h + y}px`;
};

const smallFlagPositions = codes.reduce(
  (indexedCodes: { [key in CountryCodes]: string }, code, index) => {
    const result = getFlagPosition(index, FlagSize.Small);

    indexedCodes[code] = result;

    return indexedCodes;
  },
  {} as { [key in CountryCodes]: string },
);

const mediumFlagPositions = codes.reduce(
  (indexedCodes: { [key in CountryCodes]: string }, code, index) => {
    const result = getFlagPosition(index, FlagSize.Medium);

    indexedCodes[code] = result;

    return indexedCodes;
  },
  {} as { [key in CountryCodes]: string },
);

const largeFlagPositions = codes.reduce(
  (indexedCodes: { [key in CountryCodes]: string }, code, index) => {
    const result = getFlagPosition(index, FlagSize.Large);

    indexedCodes[code] = result;

    return indexedCodes;
  },
  {} as { [key in CountryCodes]: string },
);

export function getPositionByCode(size: FlagSize, code: CountryCodes) {
  switch (size) {
    case FlagSize.Small:
      return smallFlagPositions[code];
    case FlagSize.Medium:
      return mediumFlagPositions[code];
    case FlagSize.Large:
      return largeFlagPositions[code];
    default:
      return smallFlagPositions[code];
  }
}
