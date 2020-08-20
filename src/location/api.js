"use strict"

const { HttpCode } = require("../_helpers/types")
const service = require("./service")

const calculate = async (req, res, next) => {
    try {
        const result = await service.getLocation({ ...req.body })

        return res.status(HttpCode.OK).send(result)
    } catch (error) {
        return next(error)
    }
}

// ... Define routes
const api = ({ router, apiAccess }) => {
    router.post("/calculate", calculate)
    
    return router
}

module.exports = api