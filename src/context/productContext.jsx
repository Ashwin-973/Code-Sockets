// context/ProductContext.jsx
import { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {   //does this provider function have some special ability?
  const [products, setProducts] = useState([]); //holding all the availabe products
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (productData) => {    //when does this run?
    setIsLoading(true);
    setError(null);
    
    try {
      // API call would go here
      // const response = await productService.createProduct(productData);       //wtf is this?
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 500));    //POST req to the backend for storing into the db
      const newProduct = { 
        id: Date.now().toString(), // In real app, ID would come from backend  ,(Cannot understand)
        ...productData 
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);   //updating the total avail products
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, isLoading, error, addProduct }}>  {/*can't understand*/}
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);  //can't understand