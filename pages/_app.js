import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from "../components/Layout";
import '../app/globals.css';

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
    </QueryClientProvider>
  );
}

export default MyApp;
