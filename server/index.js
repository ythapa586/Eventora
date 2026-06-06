const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');   
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/event.js');
const bookingRoutes = require('./routes/booking.js');

dotenv.config();    
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);
const app = express();
app.use(cors());
app.use(express.json());    

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/booking', bookingRoutes);
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
        console.log('Connected to MongoDB');
})
.catch((error) => {
   console.error('Error connecting to MongoDB:', error);
});     

app.use(express.json());


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
