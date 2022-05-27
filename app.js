const express = require("express");
const bodyParser = require("body-parser");
var axios = require('axios');
require("dotenv").config();

const app = express();
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

var amountHave;
var currencyHave = 'USD';
var currencyWant = 'INR';
var amountResult;

app.get("/", (req, res) =>
    res.render("index", {
        wantAmount: amountResult,
        haveAmount: amountHave,
        currencyHave: currencyHave,
        currencyWant: currencyWant
    })
);

app.post("/", (req, res) => {
    amountHave = req.body.amountHave;
    currencyHave = req.body.currencyHave;
    currencyWant = req.body.currencyWant;

    var config = {
        method: 'get',
        url: `${process.env.API_ENDPOINT}?have=${currencyHave}&want=${currencyWant}&amount=${amountHave}`,
        headers: {
            'X-Api-Key': process.env.API_KEY
        }
    };

    axios(config)
        .then((response) => {
            amountResult = JSON.stringify(response.data.new_amount);
            res.render("index", {
                wantAmount: amountResult,
                haveAmount: amountHave,
                currencyHave: currencyHave,
                currencyWant: currencyWant
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(process.env.PORT || 3000, () =>
    console.log("Server started")
);