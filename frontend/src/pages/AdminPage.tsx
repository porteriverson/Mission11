import { useEffect, useState } from 'react';
import { deleteBook, fetchAll } from '../api/BookAPI';
import { Book } from '../types/Book';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

function AdminPage({
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
  const [sortField] = useState<string>('Title');
  const [sortDirection] = useState<string>('asc');
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

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

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book? '
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId != bookId));
    } catch {
      alert('failed to delete this book. please try again.');
    }
  };

  if (loading) return <p>Loading books... </p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <>
      <div className="row">
        <h1>This is the page for an admin</h1>
        {!showForm && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
          >
            Add Book
          </button>
        )}

        {showForm && (
          <NewBookForm
            onSuccess={() => {
              setShowForm(false);
              fetchAll(
                pageSize,
                pageNum,
                sortField,
                sortDirection,
                selectedCategories
              ).then((data) => setBooks(data.books));
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingBook && (
          <EditBookForm
            book={editingBook}
            onSuccess={() => {
              setEditingBook(null);
              fetchAll(
                pageSize,
                pageNum,
                sortField,
                sortDirection,
                selectedCategories
              ).then((data) => setBooks(data.books));
            }}
            onCancel={() => setEditingBook(null)}
          />
        )}
      </div>
      <div className="row">
        <div className="col-2">
          <p>Filter box and such</p>
        </div>
        <div className="col-10">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Pages</th>
                <th>Price</th>
                <th>Buttons</th>
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
                  <td>${Math.round(b.price * 100) / 100}</td>
                  <td>
                    <button
                      onClick={() => setEditingBook(b)}
                      className="btn btn-primary btn-sm w-100 mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.bookId)}
                      className="btn btn-danger btn-sm w-100 mb-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </>
  );
}

export default AdminPage;
