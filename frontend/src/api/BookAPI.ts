import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  numBooks: number;
}

const api_URL =
  'https://mission13-porterbackend-fcaeenfsbsdweadh.eastus-01.azurewebsites.net/Bookstore';

export const fetchAll = async (
  pageSize: number,
  pageNum: number,
  sortField: string,
  sortDirection: string,
  categoryQuery: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categories = categoryQuery.length
      ? `&bookCat=${encodeURIComponent(categoryQuery.join(','))}`
      : '';

    const response = await fetch(
      `${api_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortField=${sortField}&sortDirection=${sortDirection}${categories}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('error fetching projects:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${api_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    return await response.json();
  } catch (error) {
    console.error('ERror adding a project', error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${api_URL}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${api_URL}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete book number ${bookId}`);
    }
  } catch (error) {
    console.error('error deleting book: ', error);
    throw error;
  }
};
