const config = {
    dbName: "database",
    adminUsername: "database",
    adminPassword: "00000000",
    salt: 8,
    secret: "ABCDEFGHIJKLMNOP",
    expiresIn: process.env.EXPIRESIN || "14 days",
    port: process.env.PORT || 3000,
    portDB: process.env.PORTDB || 27017
};

export default config;