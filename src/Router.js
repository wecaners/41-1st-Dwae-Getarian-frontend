import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Product from './pages/Main/Components/Product/Product';
import Recipe from './pages/Main/Components/Recipe/Recipe';
import Review from './pages/Main/Components/Review/Review';
import Search from './pages/Main/Components/search/Search';
import Nav from './components/Nav/Nav';
import Brand from './pages/Main/Components/Brand/Brand';
import ProductMeaKit from './pages/Main/Components/Product/components/ProductMealKit/ProductMeaKit';

const Router = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const convertPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/product"
          element={
            <ProductFood
              product={product}
              setProduct={setProduct}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
            />
          }
        />
        <Route
          path="/productMealkit"
          element={
            <ProductMeaKit
              product={product}
              setProduct={setProduct}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
            />
          }
        />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/review" element={<Review />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/productDetail/:id"
          element={
            <ProductDetail
              product={product}
              setProduct={setProduct}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
            />
          }
        />
        <Route path="/brand" element={<Brand />} />
        <Route
          path="/cart"
          element={
            <Cart
              product={product}
              setProduct={setProduct}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
