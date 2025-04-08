// pages/HomePage.jsx
import HeroBarNew from '../components/HeroBar';
import { useProductContext } from '../context/ProductContext';

const HomePage = () => {
  const { products } = useProductContext();   //get's products from the service
  
  return (
    <div>
      <HeroBarNew />
      
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        
        {products.length === 0 ? (
          <p >No products yet. Add your first product!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-xl">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;