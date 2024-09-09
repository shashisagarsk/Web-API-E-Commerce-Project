import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PurchaseHistory from './components/PurchaseHistory';
import { FaShoppingCart, FaHistory } from 'react-icons/fa';

const App = () => {
  const [showCart, setShowCart] = useState(false); // State to toggle Cart visibility
  const [showHistory, setShowHistory] = useState(false); // State to toggle Purchase History visibility

  // Toggle Cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
    setShowHistory(false); // Hide Purchase History when showing Cart
  };

  // Toggle Purchase History visibility
  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setShowCart(false); // Hide Cart when showing Purchase History
  };

  return (
    <Router>
      <div className="h-screen">
        {/* Store Heading */}
        <h1 className="text-8xl font-bold text-center mt-8 mb-8 rainbow-text">
          A2Z Store 
        </h1>

        {/* Icons for Cart and Purchase History on the Top Right */}
        <div className="absolute top-4 right-4 flex space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaShoppingCart className="mr-2" />
            {showCart ? 'Hide' : 'Show'} Cart Item
          </button>

          {/* Purchase History Icon */}
          <button
            onClick={toggleHistory}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaHistory className="mr-2" />
            {showHistory ? 'Hide' : 'Show'} History
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex w-full transition-all duration-500 ease-in-out">
          {/* Product List Section */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              showCart || showHistory ? 'w-2/3' : 'w-full'
            }`}
          >
            <ProductList showCart={showCart} showHistory={showHistory} />
          </div>

          {/* Conditionally render Cart */}
          {showCart && (
            <div className="w-1/3 transition-all duration-500 ease-in-out">
              <Cart />
            </div>
          )}

          {/* Conditionally render Purchase History */}
          {showHistory && (
            <div className="w-1/3 transition-all duration-500 ease-in-out">
              <PurchaseHistory />
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
