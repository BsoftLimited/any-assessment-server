import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

console.log(db.state);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.HOST}:${port}`);
});
