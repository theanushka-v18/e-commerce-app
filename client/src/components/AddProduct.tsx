import axios from 'axios';
import '../styles/addProduct.css';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productName, setProductName] = useState<string>("");
    const [productDesc, setProductDesc] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productImage, setProductImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [productRating, setProductRating] = useState<Number>(0.0);
    const [productCategory, setProductCategory] = useState<string>("");


    const navigate = useNavigate();

   async function handleAddProducts() {
        if(productDesc && productImage && productName && productPrice && productRating) {
          try {
            const response = await axios.post('/products/addProducts', {
                productName,
                productDesc,
                productPrice,
                productImage,
                productRating,
                productCategory
            })
            console.log(response);
            setProductDesc("");
            setProductPrice("");
            setProductName("");
            setProductRating(0.0);
            setProductImage("");
            setSelectedFile(null);
            setProductCategory("");
            navigate('/');
            
        } catch(error) {
            console.log('error', error);
        }
        } else {
          console.log('please fill all the details');
          
        }
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

  return (
    <div className="modal-container">
      <h1>Add Product</h1>
          <input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
          <input type="text" placeholder="Product Description" onChange={(e) => setProductDesc(e.target.value)} />
          <input type="text" placeholder="Product Price" onChange={(e) => setProductPrice(e.target.value)} />
          <input type="number" placeholder="Product rating" onChange={(e) => setProductRating(Number(e.target.value))} />
          <input type="text" placeholder="Product category" onChange={(e) => setProductCategory(e.target.value)} />
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleAddProducts}>Add</button>
        </div>
  )
}

export default AddProduct
