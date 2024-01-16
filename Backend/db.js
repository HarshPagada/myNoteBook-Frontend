// const mongoose = require ('mongoose');

// const mongoURI = 'mongodb://localhost:27017';

// const connectMongo =()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log('successfully connected');
//     })
// }

// mongoose.connect('mongodb://localhost/mydatabase', (error) => {
//   if (error) {
//     console.error('Error connecting to MongoDB:', error);
//   } else {
//     console.log('Connected to MongoDB');
//   }
// });

// module.exports = connectMongo;


const mongoose = require('mongoose');


connectMongo= async()=> {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mynotebook');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectMongo;
