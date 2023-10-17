import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './features/Home';
import { createContext, lazy, Suspense } from 'react';
import { Navbar } from './features/Navbar';
import { Provider } from 'jotai';
import { useGlobalSync, CartDataProvider } from '@mfe-monorepo/shared-state';
import { Product } from './types/Products';

const Products = lazy(() => import('./features/Products/components/Products'));
const Cart = lazy(() => import('./features/Cart/components/Cart'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: (
          <Suspense>
            <Products />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense>
            <Cart />
          </Suspense>
        ),
      },
    ],
  },
]);

const ProductContext = createContext<{
  products: Product[];
}>({
  products: [],
});

export { ProductContext };

const App = () => {
  const { store } = useGlobalSync();

  return (
    <ProductContext.Provider value={{ products: store.products as Product[] }}>
      <CartDataProvider>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </CartDataProvider>
    </ProductContext.Provider>
  );
};

export default App;
