import axios from 'axios';
import '../styles/addProduct.css';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const AddProduct = () => {
  const [productName, setProductName] = useState<string>('');
  const [productDesc, setProductDesc] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productImage, setProductImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productRating, setProductRating] = useState<Number>(0.0);
  const [productCategory, setProductCategory] = useState<string>('');

  const navigate = useNavigate();

  async function handleAddProducts() {
    if (
      productDesc &&
      productImage &&
      productName &&
      productPrice &&
      productRating
    ) {
      try {
        const response = await axios.post(
          'http://localhost:5000/products/addProducts',
          {
            productName,
            productDesc,
            productPrice,
            productImage,
            productRating,
            productCategory,
          }
        );
        // console.log(response);
        toast.success('Product added', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        setProductDesc('');
        setProductPrice('');
        setProductName('');
        setProductRating(0.0);
        setProductImage('');
        setSelectedFile(null);
        setProductCategory('');
        navigate('/');
      } catch (error:any) {
        toast.error(error.response.data, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    } else {
      toast.warn('please fill all the details', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
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
    <div className='modal-container'>
      <h1>Add Product</h1>
      <input
        type='text'
        placeholder='Product Name'
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Product Description'
        onChange={(e) => setProductDesc(e.target.value)}
      />
      <input
        type='text'
        placeholder='Product Price'
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <input
        type='number'
        placeholder='Product rating'
        onChange={(e) => setProductRating(Number(e.target.value))}
      />
      <input
        type='text'
        placeholder='Product category'
        onChange={(e) => setProductCategory(e.target.value)}
      />
      <input type='file' onChange={handleImageUpload} />
      <button onClick={handleAddProducts}>Add</button>
    </div>
  );
};

export default AddProduct;
