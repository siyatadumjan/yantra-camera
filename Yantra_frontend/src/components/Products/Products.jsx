import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../redux/actions/productActions";
import Loader from "../Loader/Loader";
import SingleProduct from "./SingleProduct/SingleProduct";

const Products = () => {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.allProducts);
    const { loading, products, error } = productsData;

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    return (
        <section className="products container-div">
            <SectionTitle title="Featured Products" />

            <div className="products__container grid">
                {loading ? (
                    <Loader backdrop />
                ) : error ? (
                    <h3 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
                        {error}
                    </h3>
                ) : (
                    <>
                        {Array.isArray(products?.data) && products.data.length > 0 ? (
                            products.data.map((product) => (
                                <SingleProduct key={product.id} product={product} />
                            ))
                        ) : (
                            <h3 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
                                No product found.
                            </h3>
                        )}
                    </>
                )}
            </div>
            {Array.isArray(products?.data) && products.data.length === 0 && (
                <h3 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
                    No product found.
                </h3>
            )}
        </section>
    );
};

export default Products;
