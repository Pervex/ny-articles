import { Route, Routes } from 'react-router-dom';
import { ArticlesList } from './pages/articles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesList />} />
    </Routes>
  );
}

export default App;
