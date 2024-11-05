// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listCategories, deleteCategory } from "../redux/actions/CategoryActions";
// import { Table, Button } from "react-bootstrap";
// import Loading from "../components/Loading";
// import Message from "../components/Message";

// const CategoryListScreen = () => {
//   const dispatch = useDispatch();
//   const { loading, error, categories } = useSelector((state) => state.categoryList);

//   useEffect(() => {
//     dispatch(listCategories());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       dispatch(deleteCategory(id));
//     }
//   };

//   return (
//     <>
//       <h2>Category List</h2>
//       {loading ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.length ? (
//               categories.map((category) => (
//                 <tr key={category._id}>
//                   <td>{category._id}</td>
//                   <td>{category.name}</td>
//                   <td>
//                     <Button variant="danger" className="btn-sm" onClick={() => handleDelete(category._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No categories found.</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default CategoryListScreen;
