"use strict"

const Sequelize = require("sequelize")
const { postgres } = require("./connection")

const ZonePolygon = postgres().define("zone_polygons", {
    polygonId: {
        field: "polygon_id",
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        field: "is_active",
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDeleted: {
        field: "is_deleted",
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    zoneId: {
        field: "zone_id",
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        field: "type",
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    polygonPoints: {
        field: "polygon_points",
        type: Sequelize.GEOMETRY("POLYGON"),
        allowNull: false
    },
    createOn: {
        field: "create_on",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false })

module.exports = ZonePolygon