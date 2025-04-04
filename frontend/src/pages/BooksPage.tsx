import BookList from '../components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryFilter from '../components/CategoryFilter';
import Banner from '../components/Banner';
import CartIcon from '../components/CartIcon';

function BooksPage({
  selectedCategories,
  pageNum,
  setPageNum,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
  setSelectedCategories: (selectedCategories: string[]) => void;
}) {
  return (
    <>
      <div className="container">
        <CartIcon />
        <div className="row">
          <Banner />
        </div>
        <div className="row">
          <div className="col-md-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
          <div className="col-md-10">
            <BookList
              selectedCategories={selectedCategories}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
