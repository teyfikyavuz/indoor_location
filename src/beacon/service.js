"use strict"

const { Beacon } = require("./models")

const byUuid = async ({ uuid }) => {
    return await Beacon.findOne({ raw: true, where: { isDeleted: false, uuid }})
}

module.exports = {
    byUuid
}