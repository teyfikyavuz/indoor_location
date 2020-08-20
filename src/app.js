"use strict"

const appPackage = require("../package.json")
const express = require("express")
const bodyParser = require("body-parser")
const { handler } = require("./_handlers")

const app = express()

// ... Config
app.use(bodyParser.json())

// ... Headers
app.use((req, res, next) => {
    res.set({
        "Application-Name": appPackage.name,
        "Application-Description": appPackage.description,
        "Application-Version": appPackage.version,
        "X-Powered-By": "Teyfik Yavuz application server ver. 1.0.2"
    })

    next()
})

// ... Ping
app.use("/ping", (req, res) => { res.send({ message: "Everything is perfect 🚀" }) })

// ... Global api access handler
app.use(handler.apiAccess.global)

// ... Define api route and import service
app.use("/location", require("./location").api({ router: express.Router(), apiAccess: handler.apiAccess }))

// ... Global error handler
app.use(handler.error)

module.exports = app