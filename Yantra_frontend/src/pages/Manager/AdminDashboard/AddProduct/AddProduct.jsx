import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from "../../../../redux/constants/productConstants";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actions/productActions";
import { Spinner } from "react-bootstrap";
import { Loader } from "../../../../components";
import ImageUploader from 'react-images-upload';


const initialstate = {
  name: "",
  description: "",
  Stock: 0,
  price: 0,
  categoryId: 0,
  imageUrl:"",
};



const AddProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [selectedFile,setSelectedFile]=useState()

  const [product, setProduct] = useState({
    ...initialstate,
    categoryId: null,
  });

  const [images, setImages] = useState({ url: "" });  // Modify this line
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const { addToast } = useToasts();

  const token = useSelector((state) => state.userLogin?.userInfo?.access_token);
  const { products, error, loading } = useSelector(
      (state) => state.createProduct
  );
  const productData = useSelector((state) => state.allProducts);

  const { name, description, Stock, price } = product;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category/getAll");
      console.log('Fetched Categories::: ', response.data);
      setCategories(response.data); // Update the state with fetched categories
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    if (productId) {
      setOnEdit(true);

      productData?.products?.forEach((product) => {
        if (product?._id === productId) {
          setProduct(product);

          // Check if product has images and images is an array
          if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
            setImages(product.images[0]);  // Assuming you want to set the first image
          } else {
            setImages({ url: "" });  // Set a default empty image
          }
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialstate);
      setImages({ url: "" });
    }
  }, [productId, productData?.products]);

  // image upload here
  const handleUpload = async (files) => {
    try {
      const file = files.target.files[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      console.log(file)

      setSelectedFile(file);

      // let formData = new FormData();
      // formData.append("file", file);
      // formData.append("categoryId", product.categoryId); // Include the category ID
      //
      // setIsLoading(true);
      // setUploadError("");
      // const res = await axios.post("http://localhost:8080/product/save", formData);
      // setIsLoading(false);


      //
      // if (res.data && res.data.url) {
      //   // Log the selected image URL
      //   console.log('Selected Image URL:', res.data.url);
      //   setImages({ url: res.data.url, public_id: res.data.public_id });
      //   setUploadSuccess(res.data.message);
      // } else {
      //   console.error('Invalid response from the server:', res);
      //   setUploadError("Invalid response from the server");
      // }
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image:", error);
      setUploadError("Error uploading image");
    }
  };

  const defaultImage = "dummy-1.jpg";

// delete image
  const handleDestroy = async () => {
    try {
      setIsLoading(true);
      setUploadError("");
      const res = await axios.post(
          "http://localhost:8080/product/",
          { public_id: images.public_id },
          {
            headers: { Authorization: token },
          }
      );
      setIsLoading(false);
      setImages({ url: "" });
      setUploadSuccess(res.data.message);
    } catch (error) {
      setIsLoading(false);
      setUploadSuccess("");
      setUploadError(
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      );
    }
  };

  // get the all input value update the state
  // Update the handleChangeInput function
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === 'categoryId') {
      handleCategorySelect(value);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Add a function to handle category selection
  const handleCategorySelect = (categoryId) => {
    setProduct({ ...product, categoryId: categoryId });
  };


  const { id } = product;
  // submit the product
  // submit the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if product.images is defined and has a file property or is an empty string
    if (!selectedFile) {
      // Log the product to check the state
      console.error("Product images or file is not set. Product:", product);

      // Set a default file or handle the case appropriately
      // For example, you can set a default image or show an error message
      return;
    }

    if (onEdit) {
      // update product call here
      console.log("Updating product:", { ...product, images });
      dispatch(updateProduct({ ...product, images: { url: product.images.url } }, id, addToast));
    } else {
      // create product API call here
      const formData = new FormData();
      formData.append("itemName", product.name);
      formData.append("description", product.description);
      formData.append("availableQuantity", product.Stock);
      formData.append("price", product.price);
      formData.append("categoryId", product.categoryId);
      formData.append("image", selectedFile);

      // Log the formData to check if it contains the image file
      console.log("Creating product. FormData:", formData);

      dispatch(createProduct(formData, navigate, addToast));
    }
  };




  // show the toast message error or succes
  useEffect(() => {
    if (error) {
      dispatch({ type: CREATE_PRODUCT_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (products) {
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [products, addToast, error, dispatch]);

  useEffect(() => {
    if (uploadError) {
      addToast(uploadError, { appearance: "error", autoDismiss: true });
    } else if (uploadSuccess) {
      addToast(uploadSuccess, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [addToast, uploadSuccess, uploadError]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <section className="addproduct container-div">
      <h3 className="addproduct__title">
        {onEdit ? "Update Product" : "Add Product"}
      </h3>
      <div className="addproduct__container">
        <form className="addproduct__form  grid" onSubmit={handleSubmit}>
          <div className="addproduct__form__left">
            <div className="contact__form__div">
              <label htmlFor="name" className="contact__form__div-tag">
                Product Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product title here"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="contact__form__div pass">
              <label htmlFor="price" className="contact__form__div-tag">
                Price
              </label>
              <input
                className="contact__form__div-input"
                type="number"
                name="price"
                id="price"
                placeholder="Product price here"
                value={price}
                onChange={handleChangeInput}
              />
            </div>
            <div className="contact__form__div pass">
              <label htmlFor="quantity" className="contact__form__div-tag">
                Count of Stock
              </label>
              <input
                className="contact__form__div-input"
                type="number"
                name="Stock"
                id="Stock"
                placeholder="Product stock"
                value={Stock}
                onChange={handleChangeInput}
              />
            </div>

            <div className="contact__form__div pass">
              <label htmlFor="description" className="contact__form__div-tag">
                Product description
              </label>
              <textarea
                className="contact__form__div-input"
                name="description"
                id="description"
                rows="7"
                column="10"
                placeholder="Product description"
                value={description}
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="contact__form__div pass">
            <label htmlFor="categoryId" className="contact__form__div-tag">
              Category
            </label>
            <select
                className="contact__form__div-input"
                name="categoryId"
                id="categoryId"
                value={product.categoryId || ''}
                onChange={(e) => handleCategorySelect(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {categories?.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
              ))}
            </select>
          </div>



          {/*<div className="addproduct__form__right">*/}
          {/*  <h4>Upload Image</h4>*/}
          {/*  <div className="addproduct__form__right__box">*/}

          {/*    <div className="addproduct__form__right__box__upload">*/}
          {/*      <input*/}
          {/*          type="file"*/}
          {/*          name="file"*/}
          {/*          id="file_up"*/}
          {/*          onChange={handleUpload}*/}
          {/*      />*/}
          {/*      {isLoading ? (*/}
          {/*          <div id="file_img">*/}
          {/*            <Loader inline backdrop />*/}
          {/*          </div>*/}
          {/*      ) : (*/}
          {/*          <div id="file_img" style={styleUpload}>*/}
          {/*            {images && <img src={images.url} alt="" />}*/}

          {/*            <span >X</span>*/}
          {/*          </div>*/}
          {/*      )}*/}
          {/*    </div>*/}
          {/*    /!*<div className="addproduct__form__right__box__upload">*!/*/}
          {/*    /!*  <input*!/*/}
          {/*    /!*    type="file"*!/*/}
          {/*    /!*    name="file"*!/*/}
          {/*    /!*    id="file_up"*!/*/}
          {/*    /!*    onChange={handleUpload}*!/*/}
          {/*    /!*  />*!/*/}
          {/*    /!*  {isLoading ? (*!/*/}
          {/*    /!*    <div id="file_img">*!/*/}
          {/*    /!*      <Loader inline backdrop />*!/*/}
          {/*    /!*    </div>*!/*/}
          {/*    /!*  ) : (*!/*/}
          {/*    /!*    <div id="file_img" style={styleUpload}>*!/*/}
          {/*    /!*      {images && <img src={images.url} alt="" />}*!/*/}

          {/*    /!*      <span onClick={handleDestroy}>X</span>*!/*/}
          {/*    /!*    </div>*!/*/}
          {/*    /!*  )}*!/*/}
          {/*    /!*</div>*!/*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="addproduct__form__right__box__upload">
            <input type={"file"} onChange={handleUpload}/>
            {/*<ImageUploader*/}
            {/*    withIcon={true}*/}
            {/*    buttonText="Choose images"*/}
            {/*    onChange={handleUpload}*/}
            {/*    imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}*/}
            {/*    maxFileSize={5242880}*/}
            {/*    singleImage={true}*/}
            {/*    withPreview={true}*/}
            {/*    defaultImages={selectedFile?selectedFile?.name:""}*/}
            {/*/>*/}
            {isLoading ? (
                <div id="file_img">
                  <Loader inline backdrop />
                </div>
            ) : (
                <div id="file_img" style={styleUpload}>
                  {images.url ? (
                      <img src={images.url} alt="" />
                  ) : (
                      <img src={defaultImage} alt="Default" />
                  )}
                  {images.url && (
                      <span onClick={handleDestroy}>&times;</span>
                  )}
                </div>
            )}
          </div>

          <div className="addproduct__form__button">
            <button
              style={{ fontSize: "15px", fontWeight: "500" }}
              className="button"
              type="submit"
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>{onEdit ? "Update" : "Public Now"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
