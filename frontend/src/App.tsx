import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <BooksPage
                  selectedCategories={selectedCategories}
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                  setSelectedCategories={setSelectedCategories}
                />
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/admin"
              element={
                <AdminPage
                  selectedCategories={selectedCategories}
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                />
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
