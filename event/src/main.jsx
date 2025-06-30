import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import router from './routes/router.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>

    </QueryClientProvider>

  </React.StrictMode>
);
