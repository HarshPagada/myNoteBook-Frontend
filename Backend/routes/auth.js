const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'elephantismyfavoritanimal';


// ROUTE 1: create a user using : Post '/api/auth/createuser'. no login required
router.post('/createuser', [
  body('name', ('enter a valid name.')).isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password must be unique and 5 character').isLength({ min: 5 }),
],
  async (req, res) => {
    let success = false
    //  console.log(req.body) // it will show your database on terminal...
    //  const user = User(req.body);
    //  user.save();
    //  res.send(req.body)

    // if there are error, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the user with this email exists already 

      let user = await User.findOne({ email: req.body.email })
      if (user) {
        success = false
        return res.status(400).json({ success, errors: 'Sorry this email of your is already exists' });
        //  400 is Bad request
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)

      // res.json(user);  // it will show your data as a response
      // console.log(user)

      success = true
      res.json({ success, authtoken })
      console.log(authtoken)

      // when we use async/await then we not use .then

      // .then(user => res.json(user)).catch(err => {
      //   console.log(err)
      //   res.json({ error: 'please enter a unique value for email' })
      // })

    } catch (error) {
      console.error(error.message)
      res.status(500).send('some error occured')
      // 500 is Internal server request
    }
  })



// ROUTE 2: user login with using credential : Post '/api/auth/credential'. no login required
router.post('/credential', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter a valid password ').exists(),
],

  async (req, res) => {
    let success = false

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ errors: 'try to login with current credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        let success = false
        return res.status(400).json({ success, errors: 'try to login with current credentials' });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)

    let success = true
      res.json({ success, authtoken })
      console.log(authtoken)

    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error')
    }
  })



// ROUTE 3: Get loggedin user details : Post '/api/auth/getuser'. login required
// middleware function
//  ↓
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})

module.exports = router;