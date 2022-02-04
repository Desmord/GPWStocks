const express = require('express');
const app = express();
const cros = require(`cors`);
const PORT = process.env.PORT || 8080;
const {
    getWig20PageText,
    getStockPageText
} = require(`./Utilities`)
// const MENU_SITE_SRC = `build`;

app.use(cros());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// app.use(express.static(MENU_SITE_SRC));

app.post('/getStock', (req, res) => {
    const { shortcut } = req.body;
    getStockPageText(res, shortcut)
})

app.get(`/getWig20`, (req, res) => {
    getWig20PageText(res)
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