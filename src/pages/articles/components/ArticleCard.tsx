import { useState } from 'react';
import ArticleDetail from './ArticleDetail';
import { Article } from '../types/articles';

function ArticleCard({ article, index }:{ readonly article: Article, readonly index: number }) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <article
      className="border border-gray-200 w-[40rem] shadow-md my-2 rounded-md list-none"
    >
      <div
        className="p-2 border-b-gray-200 border-b-2 border-0 font-semibold cursor-pointer flex justify-between"
        aria-hidden
        onClick={() => {
          setShowDetails(!showDetails);
        }}
        aria-label={`Article: ${article.title}`}
        data-testid={`article-card-${index}`}
      >
        <div>
          <div>{article.title}</div>
          <small className="font-normal text-xs">
            {article.byline ? `${article.byline} |` : ''}
            {' '}
            {article.published_date}
          </small>
        </div>
        <div className="text-xl text-gray-600 select-none flex items-center">
          {showDetails ? <span data-testid={`chevron-${index}`}>&#9650;</span> : <span data-testid={`chevron-${index}`}>&#9660;</span>}
        </div>
      </div>
      {
        showDetails && <ArticleDetail article={article} index={index} key={article.title} />
      }
    </article>
  );
}

export default ArticleCard;
