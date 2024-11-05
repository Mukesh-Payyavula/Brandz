// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProductsByCategory } from '../redux/actions/productActions';
// import { listCategories } from '../redux/actions/CategoryActions'; // Import categories action
// import Product from '../components/Product';
// import Loading from '../components/Loading';
// import Message from '../components/Message';
// import { Button } from 'react-bootstrap';

// const CategoryScreen = () => {
//   const { categoryName } = useParams();
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState(categoryName);

//   const { products, loading, error } = useSelector((state) => state.productList);
//   const { categories, loading: loadingCategories } = useSelector((state) => state.categoryList); // Use category state

//   useEffect(() => {
//     dispatch(listCategories()); // Fetch categories on mount
//     dispatch(listProductsByCategory(selectedCategory));
//   }, [dispatch, selectedCategory]);

//   const handleSelectCategory = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <>
//       <h2>{selectedCategory}</h2>
//       <div className="category-buttons">
//         {loadingCategories ? (
//           <Loading />
//         ) : categories.length > 0 ? (
//           categories.map((category) => (
//             <Button 
//               key={category._id} 
//               variant="outline-primary" 
//               onClick={() => handleSelectCategory(category.name)} // Change to category.name
//             >
//               {category.name}
//             </Button>
//           ))
//         ) : (
//           <Message>No categories found.</Message>
//         )}
//       </div>
//       {loading ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div className="products">
//           {products.length ? (
//             products.map((product) => (
//               <Product key={product._id} product={product} />
//             ))
//           ) : (
//             <Message>No products found in this category.</Message>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default CategoryScreen;
