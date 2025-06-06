const axios = require('axios');
const { GEMINI_API_KEY } = require('../config/api.config');

exports.handleChatMessage = async (req, res) => {
  const { message } = req.body;

  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          role: "user",
          parts: [{ text: message }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1000
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const reply = response.data.candidates[0]?.content?.parts[0]?.text || "Não obtive resposta.";
    res.json({ reply });

  } catch (error) {
    console.error("Erro na API:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    res.status(500).json({
      error: "Erro ao processar sua mensagem",
      details: error.response?.data?.error || "Erro desconhecido"
    });
  }
};