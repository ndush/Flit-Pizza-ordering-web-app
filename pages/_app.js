// _app.js or _app.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from "../components/Layout";
import styles from '../app/globals.css';
import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../contexts/AuthContext';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </CartProvider>
      <ReactQueryDevtools /> 
    </QueryClientProvider>
  );
}

export default MyApp;
