import { useEffect } from 'react';
import {DatabaseConnection} from './conn';


const db = DatabaseConnection.getConnection();


const clients =  `create table if not exists clients (
    id integer primary key autoincrement,
    name text(60) not null,
    alias text(40) ,
    phone text(11) not null,
    email text(100) not null,
    desc text (200),
    isOpen integer default 0
    );`;

const sql = [clients];

export function initDB() {
    console.log('Database start');
    useEffect(()=>{
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('   -Foreign keys turned on')
 );
    },[]);
    db.transaction(
        tx => {
            for (var i = 0; i < sql.length; i++) {
                // console.log("execute sql : " + sql[i]);
                tx.executeSql(sql[i]);
            }
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("   -transaction complete");
        }
    );
    
}
export function cleanDatabases() {
    const databasesDrop = ['clients','cachorro'];
    
    db.transaction(
        tx => {
            for (var i = 0; i < databasesDrop.length; i++) {
                console.log("deleting : " + databasesDrop[i]);
                tx.executeSql(`drop table IF EXISTS ${databasesDrop[i]};`);
            }
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("transaction complete");
        }
    );
}