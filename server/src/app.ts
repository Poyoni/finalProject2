import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './data/db';
import dataRoutes from './routes/AttacksDataRoutes';
import attackRoutes from './routes/c_r_u_dAttackRoutes';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/', dataRoutes);
app.use('/api', attackRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;