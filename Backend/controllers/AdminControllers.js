const TestModel = require("../model/TestModel");
const UserModel = require("../model/UserModel");
const ResultModel = require("../model/ResultModel");

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
  
    
    try {
      const { title, description, questions } = req.body;
      const newTest = new TestModel({ title, description, questions });
      await newTest.save();
      res.status(201).send(newTest);
  } catch (err) {
      res.status(400).send({ error: 'Error adding test' });
  }

  }

  
  const getResults = async (req, res) => {
    try {
        // Fetch all results
        const results = await ResultModel.find();
       
        // Collect all test and user IDs
        const testIds = [...new Set(results.map(result => result.test))];
        const userIds = [...new Set(results.map(result => result.user))];

        // Fetch all tests and users
        const tests = await TestModel.find({ _id: { $in: testIds } });
        const users = await UserModel.find({ _id: { $in: userIds } });


        // Create lookup maps for tests and users
        const testMap = tests.reduce((acc, test) => {
            acc[test._id] = test;
            return acc;
        }, {});

        const userMap = users.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
        }, {});

        // Combine results with test and user details
        const resultsWithDetails = results.map(result => ({
            ...result.toObject(), // Convert mongoose document to plain object
            test: testMap[result.test],
            user: userMap[result.user],
        }));

        // Send the results with details to the frontend
        res.status(200).json({ data: resultsWithDetails });
    } catch (error) {
        console.error('Failed to fetch results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
};
   
const deleteTest= async(req,res)=>{
  try {
    console.log("sdf,req.pa",req.params);
    
    const { id } = req.params;
    await TestModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Test deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error deleting test', error });
}
};

const updateStatus= async(req,res)=>{
  try {
    // Update the status of all results (adjust filter logic as necessary)
    const results = await ResultModel.updateMany(
        { status: { $ne: 'published' } }, // Filter condition, adjust as necessary
        { $set: { status: 'published' } }
    );

    res.json({ msg: 'All results have been published' });
} catch (err) {
    res.status(500).json({ msg: 'Error publishing all results' });
}
}
  
    


   
    
   
module.exports={
    getUsers,
    addTest,
    getResults,
    deleteTest,
    updateStatus
  
}