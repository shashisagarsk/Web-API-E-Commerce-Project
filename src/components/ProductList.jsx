import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { addToCart, clearCart } from '../features/cartSlice';
import { FaCartPlus, FaShoppingBag, FaTimes } from 'react-icons/fa';

const ProductList = ({ showCart, showHistory }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', address: '', phone: '' });
  const [purchasedProduct, setPurchasedProduct] = useState(null);
  const [showThanksPopup, setShowThanksPopup] = useState(false);

  // Fetch products initially
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // "Buy Now" button action: shows delivery form
  const handleBuyNow = (product) => {
    setPurchasedProduct(product);
    setShowDeliveryForm(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDeliveryForm(false);  // Close the delivery form
    dispatch(clearCart());       // Clear the cart
    dispatch(addToCart(purchasedProduct));  // Add purchased product to cart (just for example)
    setShowThanksPopup(true);    // Show the Thank You popup
  };

  // Handle cancel form
  const handleCancel = () => {
    setShowDeliveryForm(false);
    setPurchasedProduct(null);
  };

  // Filter products based on selected category and price range
  const filteredProducts = products.filter((product) => {
    const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const inPriceRange =
      selectedPriceRange === 'all' ||
      (selectedPriceRange === 'low' && product.price < 50) ||
      (selectedPriceRange === 'medium' && product.price >= 50 && product.price <= 100) ||
      (selectedPriceRange === 'high' && product.price > 100);

    return inCategory && inPriceRange;
  });

  return (
    <div className="w-full p-6 relative">
      {/* Logo positioned in the top-left corner */}
      <div className="absolute top-0 left-0 p-4">
        <img 
          src="src/assets/logo.png" // Replace with your logo URL
          alt="Logo"
          className="h-12 w-auto md:h-16 lg:h-20" // Responsive logo size
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex justify-between items-center mt-20"> {/* Added margin to accommodate logo */}
        {/* Category Filter */}
        <div>
          <label className="mr-2 font-semibold">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="mr-2 font-semibold">Price:</label>
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="low">Below $50</option>
            <option value="medium">$50 - $100</option>
            <option value="high">Above $100</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`grid gap-6 ${showCart || showHistory ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
            <h3 className="mt-2 text-lg font-bold">{product.title}</h3>
            <p className="mt-1 text-gray-700">${product.price}</p>

            {/* Buttons for Add to Cart and Buy Now */}
            <div className="flex space-x-4 mt-4">
              {/* Add to Cart Button */}
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </button>

              {/* Buy Now Button */}
              <button
                onClick={() => handleBuyNow(product)}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaShoppingBag className="mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Form Modal */}
      {showDeliveryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 relative">
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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

export default ProductList;
