import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function CartPage() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
  };

  return (
    <>
      <h1 className="display-4"> Items in your Cart 🛒</h1>
      <div>
        {cart.length === 0 ? (
          <p>There are no books in your cart... </p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookId}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeFromCart(item.bookId);
                        handleRemove();
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h3>Total Price: ${total.toFixed(2)}</h3>
      </div>
      <div>
        <button className="btn btn-info" onClick={() => navigate(-1)}>
          Continue Shopping
        </button>
      </div>
      <br />
      <div
        className={`alert alert-danger ${showAlert ? '' : 'd-none'}`}
        role="alert"
        id="remove-alert"
      >
        Item removed from your cart
      </div>
    </>
  );
}

export default CartPage;
