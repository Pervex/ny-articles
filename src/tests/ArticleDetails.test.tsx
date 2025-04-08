import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleDetail from '../pages/articles/components/ArticleDetail';
import { Article } from '../pages/articles/types/articles';

const mockArticle:Article = {
  id: 1,
  title: 'Sample Article Title',
  byline: 'By Test Dev',
  published_date: '2025-04-06',
  abstract: 'details of the article',
  url: 'https://nytimes.com',
  source: '',
};

describe('ArticleDetail', () => {
  it('renders title, byline, date, and abstract', () => {
    render(<ArticleDetail article={mockArticle} index={0} />);
    expect(screen.getByText(/Sample Article Title/i)).toBeInTheDocument();
    expect(screen.getByText(/By Test Dev/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-04-06/i)).toBeInTheDocument();
    expect(screen.getByText(/details of the article/i)).toBeInTheDocument();
  });

  it('renders "Read more" link', () => {
    render(<ArticleDetail article={mockArticle} index={0} />);
    const link = screen.getByRole('link', { name: /Read more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockArticle.url);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders details strucutre', () => {
    render(<ArticleDetail article={mockArticle} index={0} />);
    const container = screen.getByTestId('article-detail-0');
    expect(container.childElementCount).toBe(2);
    const infoBlock = container.firstElementChild!;
    expect(infoBlock.childElementCount).toBe(4);
  });
});
