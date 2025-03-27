import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['comprasDiretasEstado'],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL);
      return response.data;
    },
    staleTime: Infinity,
  });

  return { data, isLoading, isError };
}


