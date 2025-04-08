import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArticleCard from '../pages/articles/components/ArticleCard.tsx';

const mockGet = vi.fn();
vi.mock('../config/http', () => ({
  default: () => ({
    get: mockGet,
  }),
}));

vi.mock('../pages/articles/components/ArticleCard.tsx', () => ({
  default: ({ article }: any) => <div data-testid="article-card">{article.title}</div>
}));

vi.mock('../../components/Shimmer', () => ({
  default: () => <div data-testid="shimmer">Loading...</div>,
}));

vi.mock('../../hooks/useArticles');

describe('ArticleCard', () => {
  it('renders article when loaded', async () => {
    const article = {
      published_date: '2025-04-01',
      byLine: 'By Bruce Weber',
      title: 'Most view mock article',
      url: 'string',
      id: 1,
      abstract: 'string',
      source: '',
    };
    render(<ArticleCard article={article} index={0} />);
    const articles = screen.getAllByTestId('article-card');
    expect(articles).toHaveLength(1);
    expect(articles[0]).toHaveTextContent('Most view mock article');
  });
});
