import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState('light');

  // Carrega o tema salvo ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Alterna entre temas e salva preferência
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { 
        message: input 
      });
      const botMessage = { 
        text: response.data.reply, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro:", error);
      setMessages(prev => [...prev, { 
        text: "Desculpe, tive um problema. Tente novamente.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container" data-theme={theme}>
      <div className="chat-header">
        <h2>Assistente Pessoal Florencio</h2>
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'Você' : 'Florencio'}:</strong> {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;