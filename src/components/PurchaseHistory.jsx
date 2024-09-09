import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
import { FaShoppingBag } from 'react-icons/fa';

const PurchaseHistory = () => {
  const purchases = useSelector((state) => state.purchases.purchases); // Access the purchase history
  const navigate = useNavigate();  // Use navigate hook

  // Checkout button handler (Redirect to Product Store page)
  const handleCheckout = () => {
    alert('Proceeding to Checkout');
    navigate('/');  // Navigate to the Product Store page (root path)
  };

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
      {purchases.length === 0 ? (
        <p>No purchases made yet.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={purchase.product[0].image}
                alt={purchase.product[0].title}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="font-bold">{purchase.product[0].title}</h3>
                <p>Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}  // Checkout button redirects to Product Store
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
      >
        <FaShoppingBag className="mr-2" />
        Checkout
      </button>
    </div>
  );
};

export default PurchaseHistory;
