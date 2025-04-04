import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BookAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add a new book to your collection!</h3>
      <div className="mb-3">
        <label className="form-label">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label className="form-label">
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label className="form-label">
          Publisher:
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="form-control"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          ISBN:
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label className="form-label">
          Classification:
          <input
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label className="form-label">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          # of Pages:
          <input
            type="number"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <label className="form-label">
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary me-2">
        Submit
      </button>
      <button type="button" className="btn btn-danger" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
