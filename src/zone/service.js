"use strict"

const polygon = require("../_helpers/polygon")
const { Zone, ZonePolygon } = require("./models")

const details = async ({ zoneId }) => {
    return {
        ...await Zone.findOne({ raw: true, where: { isDeleted: false, zoneId }}),
        polygons: (await ZonePolygon.findAll({ raw: true, where: { isDeleted: false, zoneId }})).map((zp) => {
            return {
                ...zp,
                polygonPoints: polygon.parser({ polygon: zp.polygonPoints })
            }
        })
    }
}

module.exports = {
    details
}