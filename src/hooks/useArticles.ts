import { useQuery } from '@tanstack/react-query';
import http from '../config/http';

const useArticles = (interval:number) => {
  const {
    data: articles,
    isLoading,
    isLoadingError,
    error,
  } = useQuery({
    queryKey: ['articles', interval],
    queryFn: async () => {
      const response = await http().get(`${import.meta.env.VITE_API_ENDPOINT}/${interval}.json?api-key=${import.meta.env.VITE_API_KEY}`);
      return response.data || [];
    },
    // enabled: !!interval,
    retry: 0,
    staleTime: 0,
    // refetchOnWindowFocus: false,
  });

  return {
    articles,
    isLoading,
    isLoadingError,
    error,
  };
};

export default useArticles;
