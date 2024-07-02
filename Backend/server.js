// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors());  // Enable CORS for all routes

// // MongoDB connection
// mongoose.connect('mongodb+srv://raees:321@chaprone.pjmyphm.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // User schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   picture: String,
// });

// const User = mongoose.model('User', userSchema);

// // POST route to save user data
// app.post('/save-user', async (req, res) => {
//   const { name, email, picture } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(200).send('User already exists');
//       return;
//     }

//     const newUser = new User({ name, email, picture });
//     await newUser.save();
//     res.status(201).send('User saved');
//   } catch (err) {
//     res.status(500).send('Error saving user');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });