import express from 'express'; 
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'; 

dotenv.config(); 
const app = express();
app.use(express.json()); 


// API route to get questions from database
app.get('/api/questions', async (req, res) => {
   
  	const client = new MongoClient(process.env.MONGO_CONNECT); 
    await client.connect();

    const db = client.db('triviaiodb')

	const questionData = await db.collection('questions').find({}).toArray();
	res.json(questionData)

	console.log("Database connection successful!"); 

});


app.listen(8000, () => {
    console.log('Server is running on port: 8000.')
}); 