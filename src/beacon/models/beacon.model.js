"use strict"

const Sequelize = require("sequelize")
const { postgres } = require("./connection")

const Beacon = postgres().define("beacons", {
    beaconId: {
        field: "beacon_id",
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
    uuid: {
        field: "uuid",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    name: {
        field: "name",
        type: Sequelize.STRING(255),
        allowNull: false
    },
    zoneId: {
        field: "zone_id",
        type: Sequelize.INTEGER,
        allowNull: false
    },
    points: {
        field: "points",
        type: Sequelize.GEOMETRY,
        allowNull: false
    },
    createOn: {
        field: "create_on",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false })

module.exports = Beacon