const axios = require('axios');
const express = require('express');
const app = express();
const cros = require(`cors`);
const PORT = process.env.PORT || 8080;
const { getStockData } = require(`./Utilities`)
// const MENU_SITE_SRC = `build`;

const getStockPageText = async (res, shortcut) => {

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

app.use(cros());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// app.use(express.static(MENU_SITE_SRC));

app.post('/getStock', (req, res) => {
    const { shortcut } = req.body;
    getStockPageText(res, shortcut)
})

app.use((req, res) => {
    res.status(404).json(`Bład w adresie`);
})

app.listen(PORT, () => {
    try {
        console.log(`Serwer uruchomiony na porcie ${PORT}`);
    } catch (err) {
        console.log(`Bład podczas uruchamiania serweru.`);
    }
});