"use strict"

const parser = ({ polygon }) => {
    return polygon.replace("((", "").replace("))", "").replace(/\),\(/gi, ";").split(";").map((p) => {
        const parsed = p.split(",")
        return {
            x: parseFloat(parsed[0]),
            y: parseFloat(parsed[1])
        }
    })
}

module.exports = {
    parser
}