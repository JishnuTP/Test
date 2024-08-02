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

  
   
   
    
   
module.exports={
    getUsers,
  
}