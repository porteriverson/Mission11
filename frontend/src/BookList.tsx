import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:4000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.numBooks);
      setTotalPageNum(Math.ceil(totalBooks / pageSize));
    };
    fetchProjects();
  }, [pageSize, pageNum]);

  return (
    <>
      <h3>BookList</h3>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Number of Pages</th>
            <th>Price</th>
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
              <td>{b.pageCount}</td>
              <td>${b.price}</td>
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
    </>
  );
}

export default BookList;
