module.exports = {
    port: 3000,
    jwtSecretKey: "MyWonderApp :D",
    testDbUrl: "mongodb://mongo-server:27017/test",
    collections: {
        devices: "devices",
        params: "params",
        users: "users"
    }
}