// Importer les bibliothèques nécessaires
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai'); // Changement ici, on utilise OpenAI au lieu de Configuration

// Initialiser le serveur Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialisation de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Assure-toi d'avoir ta clé API dans .env
});

// Route pour gérer les messages du chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Appeler l'API OpenAI pour générer la réponse
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo', // ou 'gpt-4' si tu veux utiliser GPT-4
    });

    // Envoyer la réponse générée par OpenAI
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).send('Erreur lors de la communication avec OpenAI');
  }
});

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});
