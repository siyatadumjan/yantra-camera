import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SectionTitle, Footer, Loader } from "../../components";
import { getAllProduct } from "../../redux/actions/productActions";
import SingleItem from "./SingleItem/SingleItem";

const Shop = () => {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.allProducts);

    const { loading, products, error } = productsData; // Access 'products' property

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    return (
        <>
            <section className="products container-div shop">
                <SectionTitle title="Products" />

                <div className="products__container grid">
                    {loading ? (
                        <Loader backdrop />
                    ) : error ? (
                        <h2 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
                            {error}
                        </h2>
                    ) : (
                        <>
                            {Array.isArray(products?.data) && products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <SingleItem key={product.id} product={product} />
                                ))
                            ) : (
                                <h3 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
                                    No product found.
                                </h3>
                            )}
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Shop;
