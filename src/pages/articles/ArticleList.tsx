import { useState } from 'react';
import useArticles from '../../hooks/useArticles';
import ArticleCard from './components/ArticleCard';
import Shimmer from '../../components/Shimmer';
import ErrorComponent from '../../components/Error';
import { Article } from './types/articles';
import Select from '../../components/Select';

const Options = [
  {
    label: 'last day',
    value: 1,
  },
  {
    label: 'last week',
    value: 7,
  },
  {
    label: 'last month',
    value: 30,
  },
];

function ArticleList() {
  const [period, setPeriod] = useState<number>(1);
  const {
    articles,
    isLoading,
    error,
  } = useArticles(period);

  return (
    <div className="bg-white text-black flex flex-col justify-between items-center pt-10 m-0 w-[100%]">
      <div className="flex gap-5">
        <h1 data-testid="heading">NY Times Most Popular Articles</h1>
        <Select
          onChange={(value) => setPeriod(+value)}
          options={Options}
        />
      </div>
      {
        error ? <ErrorComponent message={error.message} />
          : (
            <div>
              {
              isLoading ? <Shimmer />
                : articles?.results?.map(
                  (article:Article, index: number) => (
                    <ArticleCard key={`${article.title}-${period}`} article={article} index={index} />
                  ),
                )
            }
            </div>
          )
      }
    </div>
  );
}

export default ArticleList;
