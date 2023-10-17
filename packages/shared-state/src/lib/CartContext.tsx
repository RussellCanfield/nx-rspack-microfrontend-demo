import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});
const context = React.createContext<QueryClient | undefined>(queryClient);

//@ts-ignore
window.REACT_QUERY_CLIENT = queryClient;

//@ts-ignore
window.REACT_QUERY_CONTEXT = context;

// queryClient.setMutationDefaults(['addProduct'], {
//   mutationFn: (product: unknown) => {
//     return Promise.resolve([product]);
//   },
// });

export const useCartQuery = () => {
  return useQuery(['products'], {
    queryFn: (product: unknown) => {
      return Promise.resolve([]);
    },
    context,
  });
};

export const useProducts = () => {
  return useMutation({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => {
      queryClient.setQueryData(
        ['products'],
        [{ id: new Date().getTime(), name: 'test' }]
      );
    },
    mutationKey: ['addProduct'],
    context,
  });
};

console.log(context);

export const CartDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
    </QueryClientProvider>
  );
};
