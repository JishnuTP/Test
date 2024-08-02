const ResultModel = require("../model/ResultModel");
const TestModel = require("../model/TestModel")

const getTest = async (req, res) => {
    try {
        // Fetch all tests from the database and sort them by date in descending order
        const tests = await TestModel.find().sort({ createdAt: -1 });
        
        // Log the fetched tests (for debugging purposes)
        console.log('Fetched tests:', tests);
        
        // Send the fetched tests as a JSON response
        res.status(200).json({ data: tests });
    } catch (error) {
        // Log the error (for debugging purposes)
        console.error('Error fetching tests:', error.message);
        
        // Respond with an error message
        res.status(500).json({ error: 'Server error while fetching tests' });
    }
};



// const getTestbyId = async(req,res)=>{
   
    
//     try {
//         const { testId } = req.query;
//         const test = await TestModel.findById(testId);
//         if (!test) {
//             return res.status(404).json({ error: 'Test not found' });
//         }
//         res.json(test);
//     } catch (err) {
//         console.error('Error fetching test details:', err.message);
//         res.status(500).json({ error: 'Server error while fetching test details' });
//     }
// };


const getTestbyId = async (req, res) => {
    try {
        const { testId } = req.query;
        if (!testId) return res.status(400).json({ msg: 'Test ID is required' });

        const test = await TestModel.findById(testId);
        if (!test) return res.status(404).json({ msg: 'Test not found' });

        res.json(test);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const submit = async(req,res)=>{
    
    try {
        const { userId, testId, testName, score } = req.body;

        // Check if a result for the same user and test already exists
        const existingResult = await ResultModel.findOne({ userId, testId });

        if (existingResult) {
            // If a result already exists, return an error
            return res.status(400).send({ error: 'Test already submitted' });
        }
        // If no result exists, create a new result
        const newResult = new ResultModel({ userId, testId, testName, score ,});
        await newResult.save();
        res.status(201).send(newResult);
    } catch (err) {
        console.error('Error submitting test results:', err);
        res.status(400).send({ error: 'Error submitting test results' });
    }
};

const checkCompletion= async(req,res)=>{
    console.log("dfghj");
    try {
        const { userId, testId } = req.query;
       
        
        const result = await ResultModel.findOne({ userId, testId });

        if (result) {
            res.status(200).send({ completed: true });
        } else {
            res.status(200).send({ completed: false });
        }
    } catch (err) {
        res.status(500).send({ error: 'Error checking test completion' });
    }
};


const publishedResults = async (req, res) => {
    try {
        const { userId } = req.query; // Get the userId from the query parameters
        console.log(userId);

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch all published results for the given user, sorted by date in descending order
        const results = await ResultModel.find({
            userId: userId,
            status: 'published' // Ensure only published results are fetched
        }).sort({ createdAt: -1 }); // Sort by createdAt field in descending order

        console.log(results);

        res.status(200).json({ data: results });
    } catch (error) {
        console.error('Failed to fetch results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
};



module.exports={
    getTest,
    getTestbyId,
    submit,
    checkCompletion,
    publishedResults,
   
    
}