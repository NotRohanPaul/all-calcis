import { CurrencyDetailsType } from "../types";

export const MAX_INPUT_GROUP_LIMIT = 5;
export const MAX_INPUT_FIELD_LIMIT = 5;
export const DEFAULT_COLORS = {
    inputGroup: ["teal", "tomato", "royalblue", "purple", "deeppink"],
    inputField: ["lime", "aqua", "violet", "khaki", "lightpink"],
} as const;


const fiatCurrencyDetailsList = [
    {
        continent: "Asia",
        countryList: [
            {
                countryName: "United Arab Emirates",
                currencyList: [
                    {
                        currencyName: "Dirham",
                        currencyShortForm: "AED",
                        currencySymbol: "د.إ",
                        relativeValueToUSD: 0.27
                    }
                ]
            },
            {
                countryName: "Afghanistan",
                currencyList: [
                    {
                        currencyName: "Afghani",
                        currencyShortForm: "AFN",
                        currencySymbol: "؋",
                        relativeValueToUSD: 0.011
                    }
                ]
            },
            {
                countryName: "India",
                currencyList: [
                    {
                        currencyName: "Rupee",
                        currencyShortForm: "INR",
                        currencySymbol: "₹",
                        relativeValueToUSD: 0.012
                    }
                ]
            },
            {
                countryName: "China",
                currencyList: [
                    {
                        currencyName: "Yuan",
                        currencyShortForm: "CNY",
                        currencySymbol: "¥",
                        relativeValueToUSD: 0.14
                    }
                ]
            },
            {
                countryName: "Japan",
                currencyList: [
                    {
                        currencyName: "Yen",
                        currencyShortForm: "JPY",
                        currencySymbol: "¥",
                        relativeValueToUSD: 0.007
                    }
                ]
            },
            {
                countryName: "Armenia",
                currencyList: [
                    {
                        currencyName: "Dram",
                        currencyShortForm: "AMD",
                        currencySymbol: "֏",
                        relativeValueToUSD: 0.0026
                    }
                ]
            },
            {
                countryName: "Bangladesh",
                currencyList: [
                    {
                        currencyName: "Taka",
                        currencyShortForm: "BDT",
                        currencySymbol: "৳",
                        relativeValueToUSD: 0.0095
                    }
                ]
            },
            {
                countryName: "Singapore",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "SGD",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.74
                    }
                ]
            },
            {
                countryName: "Indonesia",
                currencyList: [
                    {
                        currencyName: "Rupiah",
                        currencyShortForm: "IDR",
                        currencySymbol: "Rp",
                        relativeValueToUSD: 0.000065
                    }
                ]
            },
            {
                countryName: "South Korea",
                currencyList: [
                    {
                        currencyName: "Won",
                        currencyShortForm: "KRW",
                        currencySymbol: "₩",
                        relativeValueToUSD: 0.00076
                    }
                ]
            }
        ]
    },
    {
        continent: "Africa",
        countryList: [
            {
                countryName: "South Africa",
                currencyList: [
                    {
                        currencyName: "Rand",
                        currencyShortForm: "ZAR",
                        currencySymbol: "R",
                        relativeValueToUSD: 0.067
                    }
                ]
            },
            {
                countryName: "Nigeria",
                currencyList: [
                    {
                        currencyName: "Naira",
                        currencyShortForm: "NGN",
                        currencySymbol: "₦",
                        relativeValueToUSD: 0.0013
                    }
                ]
            },
            {
                countryName: "Egypt",
                currencyList: [
                    {
                        currencyName: "Pound",
                        currencyShortForm: "EGP",
                        currencySymbol: "ج.م",
                        relativeValueToUSD: 0.032
                    }
                ]
            },
            {
                countryName: "Kenya",
                currencyList: [
                    {
                        currencyName: "Shilling",
                        currencyShortForm: "KES",
                        currencySymbol: "KSh",
                        relativeValueToUSD: 0.0074
                    }
                ]
            },
            {
                countryName: "Ghana",
                currencyList: [
                    {
                        currencyName: "Cedi",
                        currencyShortForm: "GHS",
                        currencySymbol: "₵",
                        relativeValueToUSD: 0.084
                    }
                ]
            }
        ]
    },
    {
        continent: "Europe",
        countryList: [
            {
                countryName: "United Kingdom",
                currencyList: [
                    {
                        currencyName: "Pound Sterling",
                        currencyShortForm: "GBP",
                        currencySymbol: "£",
                        relativeValueToUSD: 1.26
                    }
                ]
            },
            {
                countryName: "Germany",
                currencyList: [
                    {
                        currencyName: "Euro",
                        currencyShortForm: "EUR",
                        currencySymbol: "€",
                        relativeValueToUSD: 1.06
                    }
                ]
            },
            {
                countryName: "Switzerland",
                currencyList: [
                    {
                        currencyName: "Franc",
                        currencyShortForm: "CHF",
                        currencySymbol: "Fr.",
                        relativeValueToUSD: 1.09
                    }
                ]
            },
            {
                countryName: "Norway",
                currencyList: [
                    {
                        currencyName: "Krone",
                        currencyShortForm: "NOK",
                        currencySymbol: "kr",
                        relativeValueToUSD: 0.093
                    }
                ]
            },
            {
                countryName: "Sweden",
                currencyList: [
                    {
                        currencyName: "Krona",
                        currencyShortForm: "SEK",
                        currencySymbol: "kr",
                        relativeValueToUSD: 0.09
                    }
                ]
            }
        ]
    },
    {
        continent: "North America",
        countryList: [
            {
                countryName: "United States",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "USD",
                        currencySymbol: "$",
                        relativeValueToUSD: 1.00
                    }
                ]
            },
            {
                countryName: "Canada",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "CAD",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.73
                    }
                ]
            },
            {
                countryName: "Mexico",
                currencyList: [
                    {
                        currencyName: "Peso",
                        currencyShortForm: "MXN",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.052
                    }
                ]
            },
            {
                countryName: "Cuba",
                currencyList: [
                    {
                        currencyName: "Peso",
                        currencyShortForm: "CUP",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.039
                    }
                ]
            }
        ]
    },
    {
        continent: "South America",
        countryList: [
            {
                countryName: "Brazil",
                currencyList: [
                    {
                        currencyName: "Real",
                        currencyShortForm: "BRL",
                        currencySymbol: "R$",
                        relativeValueToUSD: 0.20
                    }
                ]
            },
            {
                countryName: "Argentina",
                currencyList: [
                    {
                        currencyName: "Peso",
                        currencyShortForm: "ARS",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.0027
                    }
                ]
            },
            {
                countryName: "Chile",
                currencyList: [
                    {
                        currencyName: "Peso",
                        currencyShortForm: "CLP",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.0012
                    }
                ]
            },
            {
                countryName: "Peru",
                currencyList: [
                    {
                        currencyName: "Nuevo Sol",
                        currencyShortForm: "PEN",
                        currencySymbol: "S/",
                        relativeValueToUSD: 0.26
                    }
                ]
            },
            {
                countryName: "Colombia",
                currencyList: [
                    {
                        currencyName: "Peso",
                        currencyShortForm: "COP",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.00027
                    }
                ]
            }
        ]
    },
    {
        continent: "Australia",
        countryList: [
            {
                countryName: "Australia",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "AUD",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.64
                    }
                ]
            },
            {
                countryName: "New Zealand",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "NZD",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.59
                    }
                ]
            },
            {
                countryName: "Fiji",
                currencyList: [
                    {
                        currencyName: "Dollar",
                        currencyShortForm: "FJD",
                        currencySymbol: "$",
                        relativeValueToUSD: 0.46
                    }
                ]
            }
        ]
    }
];



const cryptoCurrencyDetailsList = [
    {
        cryptoName: "Bitcoin",
        cryptoShortForm: "BTC",
        cryptoSymbol: "₿",
        marketValueToUSD: 1.00
    },
    {
        cryptoName: "Ethereum",
        cryptoShortForm: "ETH",
        cryptoSymbol: "Ξ",
        marketValueToUSD: 0.067
    },
    {
        cryptoName: "Binance Coin",
        cryptoShortForm: "BNB",
        cryptoSymbol: "BNB",
        marketValueToUSD: 0.22
    },
    {
        cryptoName: "Ripple",
        cryptoShortForm: "XRP",
        cryptoSymbol: "XRP",
        marketValueToUSD: 0.47
    },
    {
        cryptoName: "Litecoin",
        cryptoShortForm: "LTC",
        cryptoSymbol: "Ł",
        marketValueToUSD: 0.35
    }
];



export const combinedCurrencyDetailsList: CurrencyDetailsType = (() => {
    const newCombinedCurrency = fiatCurrencyDetailsList.map(countinentObj => {
        const subCategoryList = countinentObj.countryList.map((countryObj) => {

            return {
                subCategoryName: countryObj.countryName,
                currencyList: structuredClone(countryObj.currencyList)
            };
        });
        return {
            category: countinentObj.continent,
            subCategoryList,
        };

    });

    const newCurrencyList = cryptoCurrencyDetailsList.map(currencyObj => ({
        currencyName: currencyObj.cryptoName,
        currencyShortForm: currencyObj.cryptoShortForm,
        currencySymbol: currencyObj.cryptoSymbol,
        relativeValueToUSD: currencyObj.marketValueToUSD,
    }));

    newCombinedCurrency.push({
        category: "Crypto Currency",
        subCategoryList: [
            {
                subCategoryName: "Crypto",
                currencyList: newCurrencyList
            }
        ]
    });

    return newCombinedCurrency;
})();
