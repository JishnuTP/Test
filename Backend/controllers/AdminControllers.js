const TestModel = require("../model/TestModel");


const UserModel = require("../model/UserModel");


const getUsers = async (req, res) => {
    try {
      const users = await UserModel.find(); // Await the promise returned by find()
      res.json({
        users,
        message: "Successfully fetched users",
        success: true
      });
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).json({
        message: "An error occurred while fetching users",
        success: false
      });
    }
  };

  const addTest = async(req,res)=>{
    console.log("fgh",req.body);
    
    try {
      const { title, description, questions } = req.body;
      const newTest = new TestModel({ title, description, questions });
      await newTest.save();
      res.status(201).send(newTest);
  } catch (err) {
      res.status(400).send({ error: 'Error adding test' });
  }

  }

  
   
   
    
   
module.exports={
    getUsers,
    addTest
  
}