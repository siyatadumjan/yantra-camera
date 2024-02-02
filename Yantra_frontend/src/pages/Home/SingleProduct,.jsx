// Inside SingleProduct.jsx
const SingleProduct = ({ product }) => {
    return (
        <div className="single-product">
            <h2>{product.id}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            {/* Add other product details as needed */}
        </div>
    );
};

export default SingleProduct;
