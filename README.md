# Assistente Pessoal Florencio 🤖

## 🚀 Inicialização do Projeto

Siga estes passos para configurar e executar o projeto localmente:

### 1. Configuração Inicial
```bash
# Clone o repositório
git clone https://github.com/SlmKng772/ProjetoIA.git
cd ProjetoIA

# Instale as dependências do backend
cd backend
npm install

# Volte para a raiz e instale o frontend
cd ..
cd frontend
npm install

#Execute o Sistema
Abra dois terminais separados:

#Terminal 1 (Backend)
cd backend
npm start
✔ Servidor estará rodando em: http://localhost:5000

#Terminal 2 (Frontend)
cd frontend
npm run dev
✔ Acesse a interface em: http://localhost:5173

Erro de porta: Se as portas 5000 ou 5173 estiverem ocupadas:
# No backend/server.js e frontend/vite.config.js
# Altere as portas conforme necessário