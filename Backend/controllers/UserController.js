const ResultModel = require("../model/ResultModel");
const TestModel = require("../model/TestModel")

const getTest = async (req, res) => {

    try {
        // Fetch all tests from the database
        const tests = await TestModel.find();
        
        // Log the fetched tests (for debugging purposes)
        console.log(tests);
        
        // Send the fetched tests as a JSON response
        res.status(200).json({ data: tests });
    } catch (error) {
        // Log the error (for debugging purposes)
        console.error('Error fetching tests:', error.message);
        
        // Respond with an error message
        res.status(500).json({ error: 'Server error while fetching tests' });
    }
};


const getTestbyId = async(req,res)=>{
   
    
    try {
        const test = await TestModel.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        res.json(test);
    } catch (err) {
        console.error('Error fetching test details:', err.message);
        res.status(500).json({ error: 'Server error while fetching test details' });
    }
};

const submit = async(req,res)=>{
    
    try {
        const { userId, testId, testName, score } = req.body;
        const newResult = new ResultModel({ userId, testId, testName, score });
        await newResult.save();
        res.status(201).send(newResult);
    } catch (err) {
        res.status(400).send({ error: 'Error submitting test results' });
    }
}


module.exports={
    getTest,
    getTestbyId,
    submit
    
}