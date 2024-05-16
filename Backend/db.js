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
    await mongoose.connect('mongodb+srv://harshpagada:oCtzKF5pFc4wVCIV@cluster1.emrs1g7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectMongo;


