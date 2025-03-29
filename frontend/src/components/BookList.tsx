import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

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
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryQuery = selectedCategories.length
        ? `&bookCat=${encodeURIComponent(selectedCategories.join(','))}`
        : '';

      const response = await fetch(
        `https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortField=${sortField}&sortDirection=${sortDirection}${categoryQuery}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.numBooks);
      setTotalPageNum(Math.ceil(totalBooks / pageSize));
    };
    fetchProjects();
  }, [
    pageSize,
    pageNum,
    sortField,
    sortDirection,
    selectedCategories,
    totalBooks,
  ]);

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
        <button
          className="btn btn-info"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPageNum)].map((_, i) => (
          <button
            disabled={pageNum === i + 1}
            className="btn"
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-info"
          disabled={pageNum === totalPageNum}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
        <br />
        <br />
        <label>
          Number of Rows per page
          <select
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList;
