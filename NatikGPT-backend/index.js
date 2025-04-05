const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Permet de lire le JSON envoyé dans la requête

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Route pour gérer le chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Utilisation de l'API OpenAI pour obtenir une réponse
        const openAiResponse = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150
        });

        // Envoi de la réponse au frontend
        res.json({ reply: openAiResponse.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Erreur OpenAI:', error);
        res.status(500).json({ reply: "Désolé, une erreur est survenue." });
    }
});

app.listen(port, () => {
    console.log(`Backend en écoute sur http://localhost:${port}`);
});
