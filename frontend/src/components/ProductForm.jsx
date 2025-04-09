// components/ProductForm.jsx
import { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const ProductForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  
  const { addProduct, isLoading } = useProductContext(); //can it get any functions , objects used inside context provider?
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addProduct(formData);
      setFormData({ name: '', price: '', description: '' });   //clear the form data after submitting the form
      onComplete(); // Close modal after successful submission
    } catch (error) {
      // Error is already handled in context
      console.log('Form submission failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      
      <div className="mb-4">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 border rounded"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;