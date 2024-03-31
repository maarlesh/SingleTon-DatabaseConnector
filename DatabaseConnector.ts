import {MongoClient, Db} from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()

export class DatabaseConnector{
    private static databaseConnector: DatabaseConnector;
    private db: Db | null = null;
    private client: MongoClient | null = null;
    private constructor(){

    }
    public static async getInstance(): Promise<DatabaseConnector>{
        if(!DatabaseConnector.databaseConnector){
            DatabaseConnector.databaseConnector = new DatabaseConnector();
            await DatabaseConnector.databaseConnector.connect();
        }
        return DatabaseConnector.databaseConnector;
    }

    private async connect() : Promise<void>{
        const URL = process.env.URL;
        if(!URL){
            throw new Error('Mongo URL not found in environment variables');
        }
        const client = new MongoClient(URL);
        try{
            await client.connect();
            this.db = client.db('playlistDB');
            console.log('Connected to MongoDB');
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    public getDb(): Db | null {
        return this.db;
    }
    public async close(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log('Connection to MongoDB closed');
        }
    }
}