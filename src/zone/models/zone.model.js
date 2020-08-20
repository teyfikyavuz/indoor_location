"use strict"

const Sequelize = require("sequelize")
const { postgres } = require("./connection")

const Zone = postgres().define("zones", {
    zoneId: {
        field: "zone_id",
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
    name: {
        field: "name",
        type: Sequelize.STRING(255),
        allowNull: false
    },
    dataCollectionFrequency: {
        field: "data_collection_frequency",
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 500
    },
    dataTransmissionPeriod: {
        field: "data_transmission_period",
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2500
    },
    externalParameter: {
        field: "external_parameter",
        type: Sequelize.STRING(32),
        allowNull: false
    },
    createOn: {
        field: "create_on",
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { timestamps: false })

module.exports = Zone