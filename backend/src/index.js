import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gmailRoutes from './routes/gmail.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5175'];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // Allow tools like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed from this origin'), false);
  }
}));

app.use(express.json());

app.use('/api/gmail', gmailRoutes);


app.get('/', (req, res) => res.send('Backend is running!'))
app.get('/api/status', (req, res) => res.json({ message: 'Backend connected!' }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})