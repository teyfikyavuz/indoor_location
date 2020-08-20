"use strict"

// ... Env file config
require("dotenv").config()

const app = require("./src/app")

app.listen(process.env.PORT, () => {
    console.log("Server is running on port: %d", process.env.PORT)
})