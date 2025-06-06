import express from 'express';
import connectDb from './database.js';
import cors from 'cors';
import userRoutes from './router/user.router.js';
import adminRoutes from './router/admin.router.js'

const app = express();

//connect to mongodb
connectDb();

//set up middle ware
app.use(cors({
  // origin: 'http://localhost:5173' // React dev server URL
  origin: 'https://agenttaskmanagement.netlify.app' // React dev server URL
}));
app.use(express.json());
const PORT = process.env.PORT || 5000;

//test api
app.use('/api/test',(req,res,next)=>{
  res.json({message:"This is test "});
});
//user register
app.use('/api',userRoutes);

// admin registration

app.use('/api',adminRoutes);




app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})

