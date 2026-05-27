import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import App from '@/App';
import '@/i18n';
import '@/index.css';

async function enableMocking(): Promise<void> {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ThemeContextProvider>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeContextProvider>
      </ReduxProvider>
    </React.StrictMode>,
  );
});
