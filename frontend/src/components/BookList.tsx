import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';
import { fetchAll } from '../api/BookAPI';
import Pagination from './Pagination';

function BookList({
  selectedCategories,
  pageNum,
  setPageNum,
}: {
  selectedCategories: string[];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [sortField, setSortField] = useState<string>('Title');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await fetchAll(
          pageSize,
          pageNum,
          sortField,
          sortDirection,
          selectedCategories
        );
        setBooks(data.books);
        setTotalBooks(data.numBooks);
        setTotalPageNum(Math.ceil(totalBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [
    pageSize,
    pageNum,
    sortField,
    sortDirection,
    selectedCategories,
    totalBooks,
  ]);

  if (loading) return <p>Loading projects... </p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleSort = (field: string) => {
    // If clicking the same field, toggle direction
    // If clicking a different field, set that field and default to ascending
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Helper function to show sort indicator
  const getSortIndicator = (field: string) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? ' ↓' : ' ↑';
    }
    return '';
  };

  const handleAddBook = (book: Book) => {
    const newItem: CartItem = {
      bookId: book.bookId,
      title: book.title || 'Book Not Found',
      quantity: 1,
      price: book.price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <div className="container">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th
                onClick={() => {
                  handleSort('Title');
                }}
              >
                Book Title{getSortIndicator('Title')}
              </th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Price</th>
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>${b.price}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddBook(b)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Pagination
          currentPage={pageNum}
          totalPages={totalPageNum}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}

export default BookList;
