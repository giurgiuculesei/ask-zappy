import neo4j, { Driver, auth } from "neo4j-driver";

declare global {
    // eslint-disable-next-line no-var
    var __neo4jDriver: Driver | undefined;
}

function createDriver() {
    const uri = process.env.NEO4J_URI!;
    const username = process.env.NEO4J_USERNAME!;
    const password = process.env.NEO4J_PASSWORD!;
    const driver = neo4j.driver(uri, auth.basic(username, password), {
        // optional tuning
        maxConnectionPoolSize: 50,
        disableLosslessIntegers: true
    });
    return driver;
}

export const driver: Driver =
    global.__neo4jDriver ?? createDriver();

if (process.env.NODE_ENV !== "production") {
    global.__neo4jDriver = driver;
}