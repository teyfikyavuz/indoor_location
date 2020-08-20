"use strict"

const { ClientError } = require("../_helpers/errors")
const Beacon = require("../beacon")
const Zone = require("../zone")

const getLocation = async ({ positions }) => {
    const beacons = []

    // ... Get beacons
    for (let i = 0; i < positions.length; i++) {
        beacons.push({
            ...await Beacon.service.byUuid({ uuid: positions[i].uuid }),
            distance: positions[i].distance
        })
    }
    // ... Check beacon count. Min: 3
    if (beacons.length < 3)
        throw new ClientError("Please add at least three beacons!", "MISSING_BEACON_COUNT")

    // ... Calculate points by distance
    const currentPoints = pointsCalculate({ beacons })

    // ... Get beacons zone
    const zone = await Zone.service.details({ zoneId: beacons[0].zoneId })

    let isSafeZone = false
    for (let i = 0; i < zone.polygons.length; i++) {
        const polygon = zone.polygons[i];
        
        const inside = isInside({ point: currentPoints.points, polygon: polygon.polygonPoints })
        isSafeZone = polygon.type === Zone.POLYGON_TYPE.SAFE ? inside : !inside
    }

    delete zone.polygons
    return { 
        ...currentPoints,
        zone,
        isSafeZone
    }
}

/**
 * Calculate points
 */
const pointsCalculate = ({ beacons }) => {
    if (beacons.length < 3)
        throw new Error("Please add at least three beacons!")

    const sqr = (a) => {
        return Math.pow(a, 2)
    }

    let j, k, x, y

    k = (sqr(beacons[0].points.x) + sqr(beacons[0].points.y) - sqr(beacons[1].points.x) - sqr(beacons[1].points.y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / 
        (2 * (beacons[0].points.y - beacons[1].points.y)) - (sqr(beacons[0].points.x) + sqr(beacons[0].points.y) - sqr(beacons[2].points.x) - sqr(beacons[2].points.y) - sqr(beacons[0].distance) + sqr(beacons[2].distance)) / 
        (2 * (beacons[0].points.y - beacons[2].points.y))
    
    j = (beacons[2].points.x - beacons[0].points.x) / 
        (beacons[0].points.y - beacons[2].points.y) - (beacons[1].points.x - beacons[0].points.x) / 
        (beacons[0].points.y - beacons[1].points.y)
        
    x = k / j

    y = ((beacons[1].points.x - beacons[0].points.x) / 
        (beacons[0].points.y - beacons[1].points.y)) * x + (sqr(beacons[0].points.x) + sqr(beacons[0].points.y) - sqr(beacons[1].points.x) - sqr(beacons[1].points.y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / 
        (2 * (beacons[0].points.y - beacons[1].points.y))
        
    return { points: { x, y }}
}

/**
 * Verify if point of coordinates is inside polygon  
 */
const isInside = ({ point, polygon }) => {
    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, 
              yi = polygon[i].y, 
              xj = polygon[j].x, 
              yj = polygon[j].y
        
        const intersect = ((yi > point.y) != (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)

        if (intersect) inside = !inside
    }
    
    return inside
}

module.exports = {
    getLocation
}