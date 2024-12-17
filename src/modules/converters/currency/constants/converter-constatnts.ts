import { CurrencyDetailsType } from "../types";

export const MAX_INPUT_GROUP_LIMIT = 5;
export const MAX_INPUT_FIELD_LIMIT = 5;
export const DEFAULT_COLORS = {
    inputGroup: ["teal", "tomato", "royalblue", "gold", "deeppink"],
    inputField: ["lime", "aqua", "darkviolet", "khaki", "lightpink"],
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
                        relativeValueToUSD: 0.007
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
                        relativeValueToUSD: 0.032
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
                        relativeValueToUSD: 1.09
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
                        relativeValueToUSD: 0.052
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
                        relativeValueToUSD: 0.0012
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
                        relativeValueToUSD: 0.59
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
        marketValueToUSD: 1.00
    },
    {
        cryptoName: "Ethereum",
        cryptoShortForm: "ETH",
        marketValueToUSD: 0.067
    },
    {
        cryptoName: "Binance Coin",
        cryptoShortForm: "BNB",
        marketValueToUSD: 0.22
    },
    {
        cryptoName: "Ripple",
        cryptoShortForm: "XRP",
        marketValueToUSD: 0.47
    },
    {
        cryptoName: "Litecoin",
        cryptoShortForm: "LTC",
        marketValueToUSD: 0.35
    }
];


export const combinedCurrencyDetailsList: CurrencyDetailsType = (() => {
    const newCombinedCurrency = fiatCurrencyDetailsList.map(countinentObj => {
        const subCategoryList = countinentObj.countryList.map((countryObj) => {

            return {
                subCategoryName: countryObj.countryName,
                currencyList: structuredClone(countryObj.currencyList)
            }
        })
        return {
            category: countinentObj.continent,
            subCategoryList,
        }

    })

    const newCurrencyList = cryptoCurrencyDetailsList.map(currencyObj => ({
        currencyName: currencyObj.cryptoName,
        currencyShortForm: currencyObj.cryptoShortForm,
        relativeValueToUSD: currencyObj.marketValueToUSD,
    }))

    newCombinedCurrency.push({
        category: "CryptoCurrency",
        subCategoryList: [
            {
                subCategoryName: "Crypto",
                currencyList: newCurrencyList
            }
        ]
    })

    return newCombinedCurrency
})();
