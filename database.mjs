import { env } from "node:process";
import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(env.MONGO_URL);

const getDB = async () => {
    try {
        const connection = await client.connect();
        return connection.db("worddangler");
    } catch (e) {
        console.log(e);
    }
};

const closeDB = async () => {
    try {
        await client.close();
    } catch (e) {
        console.log(e);
    }
};

console.log(await getDB());

export { getDB, closeDB };
