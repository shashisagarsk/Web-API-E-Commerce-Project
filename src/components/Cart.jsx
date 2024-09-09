import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../features/cartSlice';
import { addPurchase } from '../features/purchaseSlice'; // Import addPurchase action
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaTimes } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [showDeliveryForm, setShowDeliveryForm] = useState(false); // State for showing the delivery form
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', address: '', phone: '', deliveryDate: '' });
  const [purchasedProduct, setPurchasedProduct] = useState(null);  // State for selected product
  const [showThanksPopup, setShowThanksPopup] = useState(false);   // State for showing the thank you message
  const [buyAll, setBuyAll] = useState(false);                     // State to track if we're buying all items

  // "Buy Now" button action for cart items: shows delivery form
  const handleBuyNowFromCart = (item) => {
    setPurchasedProduct([item]);      // Set the single product to purchase in an array
    setShowDeliveryForm(true);        // Show the delivery form
    setBuyAll(false);                 // Reset buy all state
  };

  // "Buy All" button action for all cart items
  const handleBuyAllItems = () => {
    setPurchasedProduct(cartItems);   // Set all cart items as the products to be purchased
    setShowDeliveryForm(true);        // Show the delivery form
    setBuyAll(true);                  // Indicate that we are buying all items
  };

  // Handle form submission for both individual and "Buy All" purchases
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the purchase details for each product being purchased
    purchasedProduct.forEach((product) => {
      const purchaseDetails = {
        product,
        deliveryDetails,
        purchaseDate: new Date().toISOString(), // Purchase date
      };

      // Add the purchase to the purchase history
      dispatch(addPurchase(purchaseDetails));
    });

    // Clear the form, clear the cart, and show thank you popup
    setShowDeliveryForm(false);    
    dispatch(clearCart());         
    setShowThanksPopup(true);      
  };

  // Handle cancel form
  const handleCancel = () => {
    setShowDeliveryForm(false);    
    setPurchasedProduct(null);     
  };

  return (
    <div className="w-1/3 p-6 flex flex-col justify-center items-center fixed right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaShoppingBag className="mr-2" />
        Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty please add to cart.</p>
      ) : (
        <div className="w-full">
          {/* Scrollable section for cart items */}
          <ul className="max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => dispatch(incrementQuantity(item))}
                    className="bg-green-500 text-white p-2 rounded-l"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => dispatch(decrementQuantity(item))}
                    className="bg-yellow-500 text-white p-2"
                  >
                    <FaMinus />
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="bg-red-500 text-white p-2 rounded-r"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Buy Now Button for each cart item */}
                <button
                  onClick={() => handleBuyNowFromCart(item)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaShoppingBag className="mr-2" />
                  Buy Now
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <h3 className="font-bold">Total: ${total.toFixed(2)}</h3>

            {/* Buy All Items Button */}
            <button
              onClick={handleBuyAllItems}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Buy All Items
            </button>
          </div>
        </div>
      )}

      {/* Delivery Form Modal */}
      {showDeliveryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 relative">
            {/* Cancel Icon */}
            <button
              onClick={handleCancel}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Enter Delivery Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={deliveryDetails.name}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                  required
                  className="w-full  border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-lg font-medium">Address:</label>
                <input
                  id="address"
                  type="text"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-lg font-medium">Phone:</label>
                <input
                  id="phone"
                  type="tel"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                  required
                  className="w-full  border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deliveryDate" className="block text-lg font-medium">Expected Delivery Date:</label>
                <input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDetails.deliveryDate}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, deliveryDate: e.target.value })}
                  required
                  className="w-full  border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThanksPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you for your purchase!</h2>
            <p>We appreciate your order. You can now proceed to checkout.</p>
            <button
              onClick={() => setShowThanksPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
