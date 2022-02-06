const axios = require('axios');

const getStock = async (res, shortcut) => {

    try {

        const rawData = await axios.get(`https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=${shortcut}`)
        const pageHTMLText = await JSON.stringify(rawData.data)
        const data = getStockData(pageHTMLText);

        if (getStockData === false) {
            res.send(`Błąd podczas pobierania danych.`)
        } else {
            res.send(data)
        }


    } catch (err) {
        res.send(`Bład`)
    }

}

const getStockData = (pageHTMLText) => {
    const searchIndex = pageHTMLText.search(`profilLast`)
    const isTextPartFound = searchIndex < 0 ? true : false;

    if (isTextPartFound) return false

    const searchText = pageHTMLText.substring(searchIndex, searchIndex + 300);
    const searchRegex = /[0-9,-]+/gim;
    const searchValues = searchText.match(searchRegex)
    const isValuesNotFound = searchValues.length === 3 ? false : true;

    if (isValuesNotFound) return false

    const stockData = {
        value: searchValues[0],
        percentageChange: searchValues[1],
        changeValue: searchValues[2],
    }

    return stockData
}


const getWig20Data = (pageHTMLText) => {
    const searchIndex = pageHTMLText.search(`profilLast`)
    const isTextPartFound = searchIndex < 0 ? true : false;

    if (isTextPartFound) return false

    let searchText = pageHTMLText.substring(searchIndex, searchIndex + 200);
    searchText = searchText.replace(`&nbsp;`, ``);
    const searchRegex = /[0-9,-]+/gim;
    const searchValues = searchText.match(searchRegex)
    const isValuesNotFound = searchValues.length === 3 ? false : true;

    if (isValuesNotFound) return false

    const wig20 = {
        value: searchValues[0],
        percentageChange: searchValues[1],
        changeValue: searchValues[2],
    }

    return wig20
}
const getWig20 = async (res) => {

    try {

        const rawData = await axios.get(`https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=WIG20`)
        const pageHTMLText = await JSON.stringify(rawData.data)
        const data = getWig20Data(pageHTMLText);

        if (getStockData === false) {
            res.send(`Błąd podczas pobierania danych.`)
        } else {
            res.send(data)
        }


    } catch (err) {
        res.send(`Bład`)
    }


}

module.exports = {
    getStock,
    getWig20,
}