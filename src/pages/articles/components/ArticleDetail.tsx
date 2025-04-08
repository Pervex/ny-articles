import { Article } from '../types/articles';

function ArticleDetail({ article, index }:{ readonly article: Article, readonly index: number }) {
  return (
    <div className="flex flex-col p-5 gap-2" data-testid={`article-detail-${index}`}>
      <div className="flex flex-col gap-1">
        <h2>{article?.title}</h2>
        <p><strong>{article?.byline}</strong></p>
        <p><em>{article?.published_date}</em></p>
        <p>{article?.abstract}</p>
      </div>
      <a
        href={article.url}
        target="_blank"
        className="text-blue-400 self-end"
        rel="noreferrer"
        data-testid={`read-more-${index}`}
        aria-label={`Read more about ${article.title} (opens in new window)`}
      >
        Read more
      </a>
    </div>
  );
}

export default ArticleDetail;
