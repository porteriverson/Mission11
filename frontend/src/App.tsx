import './App.css';
import BookList from './BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryFilter from './components/CategoryFilter';
import { useState } from 'react';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  return (
    <>
      <div className="row">
        <h1>Mission 11</h1>
        {/* <h3>BookList</h3> */}
      </div>
      <div className="row">
        <div className="col-md-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </div>
        <div className="col-md-8">
          <BookList
            selectedCategories={selectedCategories}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </div>
      </div>
    </>
  );
}

export default App;
