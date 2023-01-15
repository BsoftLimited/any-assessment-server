import mysql from 'mysql2';
import { ErrorHandler } from './error';

export class Database{
    private db: mysql.Connection;
    private error: ErrorHandler;

    constructor(error: ErrorHandler) {
        this.error = error;
        this.db = mysql.createConnection({
            host: process.env.HOST, user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD, database: process.env.DATABASE
		});
		
		this.db.connect((error) => {
			if (error) {
				this.error.add(500, { message: error.message, error: error.code });
			}
		});
    }

    public getCommunication(): mysql.Connection { return this.db; }
    
    public checkTable(name: string): boolean{
        let query = `SELECT * FROM information_schema.tables WHERE table_schema = '${process.env.DATABASE}' AND table_name = '${name}'`;
        this.db.query(query, (error, data: mysql.RowDataPacket[]) => {
			if (error) {
				this.error.add(500, { message: error.message, error: error.code });
				return false;
			}
			return data.length > 0;
		});
		return false;
	}
		
	public createTable(query: string): boolean {
		this.db.query(query, (error, data: mysql.ResultSetHeader) => {
			if (error) {
				this.error.add(500, { message: error.message, error: error.code });
				return false;
			}
			return true;
		});
		return false;
	}
}