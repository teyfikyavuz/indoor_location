"use strict"

const { UnauthorizedError } = require("../_helpers/errors")

const global = async (req, res, next) => {
    try {
        if (req.headers["x-api-key"]) {
            switch (req.headers["x-api-key"].split("-")[0]) {
                case "internal":
                    if (req.headers["x-api-key"] === process.env.INTERNAL_API_KEY) {
                        req.apiAccessType = "INTERNAL"
                        return next()
                    }
                    break
                case "mobile":
                    if (req.headers["x-api-key"] === process.env.MOBILE_API_KEY) {
                        req.apiAccessType = "MOBILE"
                        return next()
                    }
                    break
            }
        }
        
        throw new UnauthorizedError("Unauthorized! Invalid api key.")
    } catch (error) {
        next(error)
    }
}

const mobile = (req, res, next) => {
    if (req.apiAccessType === "MOBILE")
        return next()

    throw new UnauthorizedError("Unauthorized!")
}

const internal = (req, res, next) => {
    if (req.apiAccessType === "INTERNAL")
        return next()
    
    throw new UnauthorizedError("Unauthorized!")
}

module.exports = {
    global,
    internal,
    mobile
}