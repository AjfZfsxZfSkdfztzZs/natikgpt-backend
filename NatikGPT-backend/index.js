const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Permet de lire les données JSON envoyées dans la requête

// Configuration de l'API OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // ou autre modèle de ton choix
            messages: [{ role: 'user', content: message }]
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('Erreur OpenAI:', error);
        res.status(500).json({ reply: "Désolé, une erreur est survenue." });
    }
});

app.listen(port, () => {
    console.log(`Backend en écoute sur http://localhost:${port}`);
});
