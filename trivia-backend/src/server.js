import path from "path"; 
import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
const jsonParser = bodyParser.json();

app.use(express.urlencoded({extended: false}))
app.use(express.json({strict: false}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});


app.get("/api/questions", async (req, res) => {
	const client = new MongoClient(process.env.MONGO_CONNECT);
	await client.connect();

	const db = client.db("triviaio-cloud");

	const questionData = await db.collection("questions").find({}).toArray();
	res.json(questionData);
});


// API route for adding a new question to the database.
app.post("/api/addQuestion", jsonParser, async (req, res) => {
	const client = new MongoClient(process.env.MONGO_CONNECT);
	await client.connect();
	const db = client.db("triviaio-cloud");

	const insertOperation = await db
		.collection("questions")
		.insertOne({
			questionText: req.body.questionText,
			options: req.body.options,
			correctAnswerIndex: req.body.correctAnswerIndex,
		});

	console.log(insertOperation);
	res.sendStatus(200);
});

// API route for overwriting all data (delete).
app.post("/api/overwrite/DeleteAll", jsonParser, async (req, res) => {
	const client = new MongoClient(process.env.MONGO_CONNECT);
	await client.connect();

	const db = client.db("triviaio-cloud");

	const deleteAllOperation = await db.collection("questions").deleteMany({});
	console.log("Deleted Documents ====> ", deleteAllOperation);

	res.sendStatus(200);
});

// API route for overwriting all data (insert new).
app.post("/api/overwrite/InsertNew", jsonParser, async (req, res) => {
	const client = new MongoClient(process.env.MONGO_CONNECT);
	await client.connect();

	const db = client.db("triviaio-cloud");

	const insertNewDataOperation = await db
		.collection("questions")
		.insertMany(req.body);
	console.log("Inserted Documents ====> ", insertNewDataOperation);

	res.sendStatus(200);
});

app.listen(8000, () => {
	console.log("Server is running on port: 8000.");
});