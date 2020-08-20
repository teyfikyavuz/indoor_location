"use strict";

const Sequelize = require("sequelize");

const postgres = () => {
    return new Sequelize(process.env.DATABASE, {
        dialect: "postgres",
        dialectOptions: { decimalNumbers: true },
        operatorsAliases: 0,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            freezeTableName: true,
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        }
    });
}

module.exports = {
    postgres
}