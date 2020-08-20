"use strict"

const error = require("./error.handler")
const apiAccess = require("./api-access.handler")

module.exports = {
    handler: {
        error,
        apiAccess
    }
}