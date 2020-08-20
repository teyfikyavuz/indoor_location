"use strict"

const { HttpCode } = require("../_helpers/types")

const errorHandler = (err, req, res, next) => {

    // ... Custom application error
    if (err.type && err.type === "CLIENT_ERROR")
        return res.status(HttpCode.BAD_REQUEST).send({ message: err.message, code: err.code })

    else if (err.type && err.type === "UNAUTHORIZED_ERROR")
        return res.status(HttpCode.UNAUTHORIZED).send({ message: err.message, code: "UNAUTHORIZED" })

    console.error(err)

    // ... Default to 500 server error
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({ message: err.message, code: "SERVER_ERROR" })
}

module.exports = errorHandler