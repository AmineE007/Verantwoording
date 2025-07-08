// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/verantwoording_war/',
    server: {
        historyApiFallback: true
    }
});