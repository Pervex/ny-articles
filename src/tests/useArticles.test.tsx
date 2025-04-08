import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import http from '../config/http';
import useArticles from '../hooks/useArticles';

const mockGet = vi.fn();
vi.mock('../config/http', () => ({
  default: () => ({
    get: mockGet,
  }),
}));

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return function ({ children }: any) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches articles successfully', async () => {
    const mockData = {
      data: {
        results: [{ id: 1, title: 'Test Article' }],
      },
    };
    mockGet.mockResolvedValueOnce(mockData);
    const { result } = renderHook(() => useArticles(7), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.articles.results).toEqual(mockData.data.results);
    expect(result.current.error).toBeFalsy();
  });

  it('returns loading state initially', async () => {
    const mockData = {
      data: {
        results: [],
      },
    };

    (http as any)().get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useArticles(7), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });
});
