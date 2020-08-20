"use strict"

class ClientError extends Error {
    constructor(message, code) {
        super(message)
        this.type = "CLIENT_ERROR"
        this.code = code
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.type = "UNAUTHORIZED_ERROR"
    }
}

module.exports = {
    ClientError,
    UnauthorizedError
}