const express = require("express");
const cors = require("cors");
const mysql = require('mysql')
var weather = require("weather-js");

const app = express();


const connection = mysql.createConnection({
    host: "172.18.0.2",
    port: 3306, 
    user: "root",
    password: "secret",
    database: "MetraTrainTimesDB",
    
});

connection.connect(err => {
    if (err) {
        return err
    }
})


garbage = [];

app.use(cors());

// ************** WEATHER ********************
app.get("/Weather", (req, res) => {
    weather.find({ search: "Chicago, IL", degreeType: "F" }, function (err, result) {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
})
// ******************************************


app.get("/WeatherPictures", (req, res) => {
    connection.query("SELECT * FROM WeatherPictures", (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })

})
app.get("/WeekdaysToTheCity", (req, res) => {
    connection.query("SELECT * FROM WeekdaysToTheCity", (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })

})

app.get("/WeekdaysFromTheCity", (req, res) => {
    connection.query("SELECT * FROM WeekdaysFromTheCity", (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })

})



app.listen(4000, () => {
    console.log('Product server listening on port 4000')
})

