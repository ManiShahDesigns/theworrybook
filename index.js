const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes
//    description VARCHAR(255),
// mood VARCHAR(255),
// automaticthought VARCHAR(255),
// supportingfacts VARCHAR(255),
// contradictfacts VARCHAR(255),
// realisticthought VARCHAR(255),
// rateyourfeeling int

// Add/Post Thought
app.post('/thoughts', async (req, res) => {
    try {
        const { description, mood, automaticthought, supportingfacts, contradictfacts, realisticthought, rateyourfeeling } = req.body;

        const newThought = await pool.query('INSERT INTO thoughts (description, mood, automaticthought, supportingfacts, contradictfacts, realisticthought, rateyourfeeling) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *', [description, mood, automaticthought, supportingfacts, contradictfacts, realisticthought, rateyourfeeling]);

        res.json(newThought.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

// Get All Thoughts
app.get('/thoughts', async (req, res) => {
    try {
        const allThoughts = await pool.query('SELECT * FROM thoughts');
        res.json(allThoughts.row)
    } catch (error) {
        console.error(error.message);
    }
});

// Edit Thought
app.put('/thoughts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description, mood, automaticthought, supportingfacts, contradictfacts, realisticthought, rateyourfeeling } = req.body;

        const updateThought = await pool.query('UPDATE thoughts SET description = $1, mood = $2, automaticthought = $3, supportingfacts = $4, contradictfacts = $5, realisticthought = $6, rateyourfeeling = $7 where thought_id = $8', [description, mood, automaticthought, supportingfacts, contradictfacts, realisticthought, rateyourfeeling, id]);

        res.json('Thought was updated.')
    } catch (error) {
        console.error(error.message);
    }
});

// Delete Thought
app.delete('/thoughts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteThought = await pool.query('DELETE FROM thoughts WHERE thought_id = $1', [id]);

        res.json('Thought was deleted.')
    } catch (error) {
        console.error(error.message);
    }
});

// Listen for changes on Port 5000
app.listen(5000, () => {
    console.log('Server has started on port 5000');
})