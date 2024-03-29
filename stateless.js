const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory data structure for demonstration
let claims = {};
let policies = {};

app.use(bodyParser.json());

// Create operation for policy
app.post('/policies', (req, res) => {
    const { id, user_name, amount, policytype } = req.body;
    policies[id] = {  user_name, amount, policytype };
    res.json({ message: "Policy created successfully." });
});

// Read operation for policies
app.get('/policies', (req, res) => {
    res.json(policies);
});

// Create operation for claim
app.post('/claims', (req, res) => {
    const { id, policy_id, amount, claimantName, claimDescription, user_name } = req.body;

    if (user_name !== claimantName) {
        return res.status(400).json({ message: "Policy holder name and claimant name do not match." });
    }

    // Check if policy exists
    if (!policies[policy_id]) {
        return res.status(404).json({ message: "Policy does not exist." });
    }

    // Check if claim amount exceeds policy amount
    if (amount > policies[policy_id].amount) {
        return res.status(400).json({ message: "Claim amount exceeds policy amount." });
    }

    claims[id] = { policy_id, amount, claimantName, claimDescription };
    res.json({ message: "Claim created successfully." });
});

// Read operation for claim
// dynamically reading and adding the claim
app.get('/claims/:id', (req, res) => {
    const claimId = req.params.id;
    const claim = claims[claimId];
    if (!claim) {
        return res.status(404).json({ message: "Claim not found." });
    }
    res.json(claim);
});

// Update operation for claim
app.put('/claims/:id', (req, res) => {
    const claimId = req.params.id;
    const { amount } = req.body;

    // Check if claim exists
    if (!claims[claimId]) {
        return res.status(404).json({ message: "Claim not found." });
    }

    // Check if new claim amount exceeds policy amount
    if (amount > policies[claims[claimId].policy_id].amount) {
        return res.status(400).json({ message: "Claim amount exceeds policy amount." });
    }

    claims[claimId].amount = amount;
    res.json({ message: "Claim updated successfully." });
});

// Delete operation for claim
app.delete('/claims/:id', (req, res) => {
    const claimId = req.params.id;
    if (!claims[claimId]) {
        return res.status(404).json({ message: "Claim not found." });
    }
    delete claims[claimId];
    res.json({ message: "Claim deleted successfully." });
});

//used to get routes on this port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
