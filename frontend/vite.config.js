import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração básica para React + Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta padrão (pode mudar se necessário)
    strictPort: true,
    open: true   // Abre o navegador automaticamente
  }
});