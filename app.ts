import {DatabaseConnector} from './DatabaseConnector';
import {Db} from 'mongodb';
async function main(){
    const databaseConnector = await DatabaseConnector.getInstance();
    const db = databaseConnector.getDb();
    if (db) {
        console.log('Database name:', db.databaseName);
    } else {
        console.error('Failed to connect to the database');
    }
    console.log("==============Closing mongodb connection==============");
    await databaseConnector.close();
}

main().catch(console.error);
