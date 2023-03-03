const userModel = require('../models/user.model');

// /api/users/list
const listUser = (req, res) => {
    userModel.find({}, (err, users) => {
        if(err){
            res.send({status: 500, message: 'Unable to Find Users'});
          } else {
            const userCount = users.length;
            res.send({status: 200, userCount: userCount, data: users});
        }
    });
};

// /api/users/view?userId=2
const viewUser = (req, res) => {
    const userId = req.query.userId
    userModel.findOne({ userId: userId }, (err, user) => {
      if (err) {
        console.error('No user found:', err);
        return res.send({status: 500, message: 'API Error'});
      }
      if (!user) {
        console.error('User not found:', err);
        return res.status(404).send('User not found');
      }
      res.send({status: 200, data: user});
    });
};

// /api/users/add
const createUser = (req, res) => {
    let username = req.body.username
    let email = req.body.email
  
    // Validate request
    if (!username) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
  
    userModel.findOne({ $or: [{ username: username }, { email: email }] }, function (err, existingUser) {
      if (err) {
        console.error('Error checking if user already exists:', err);
        return res.send({status: 500, message: 'Unable to Add User'});
      }

      if (existingUser) {
        if (existingUser.username === username) {
            res.status(409).send({ message: "Username already exists" });
        } else {
            res.status(409).send({ message: "Email already exists" });
        }
        return;
      }
  
      // Create a User
      let userObj = new userModel({
          username: username,
          email: email,
      });
  
      userModel.findOne().sort({ userId: -1 }).exec(function(err, maxUser) {
          if (err) {
            console.error('Error generating userId:', err);
          } else {
            const nextUserId = maxUser ? maxUser.userId + 1 : 1;
            userObj.userId = nextUserId;
            userObj.save()
              .then(savedUser => {
                console.log('New user created:', savedUser);
                res.send({status: 200, message: 'User Added Successfully', userData: savedUser});
              })
              .catch(error => {
                console.error('Error creating user:', error);
                res.send({status: 500, message: 'Unable to Add User'});
              });
          }
      });
    });
  };

// /api/users/update
const updateUser = (req, res) => {
    const userId = req.body.userId
    let username = req.body.username
    let email = req.body.email

    let userObj = ({
        username: username,
        email: email,
    });

    userModel.findOneAndUpdate({ userId: userId }, userObj, (err, user) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.send({status: 500, message: 'Unable to Update User'});
      }
      if (!user) {
        console.error('User not found:', err);
        return res.status(404).send('User not found');
      }
      res.send({status: 200, data: userObj, message: 'User Updated Success'});
    });
};

// /api/users/delete?userId=3
const deleteUser = (req, res) => {
    const userId = req.query.userId
    userModel.findOneAndRemove({ userId: userId }, (err, user) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.send({status: 500, message: 'Unable to Delete User'});
      }
      if (!user) {
        console.error('User not found:', err);
        return res.status(404).send('User not found');
      }
      res.send({status: 200, message: 'User Delete Success'});
    });
};

module.exports = {
    listUser,
    viewUser,
    createUser,
    updateUser,
    deleteUser
};

//params check