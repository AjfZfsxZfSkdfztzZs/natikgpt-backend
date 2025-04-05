// Importation des bibliothèques nécessaires
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Création du serveur Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de l'API OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Ta clé API ici
});

const openai = new OpenAIApi(configuration);

// Route d'API pour recevoir un message et renvoyer une réponse d'OpenAI
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
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
