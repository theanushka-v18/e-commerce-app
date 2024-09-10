import { useState } from 'react';
import '../styles/orderHistory.css';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const OrderHistory = (props: any) => {
  const [value, setValue] = useState<number | null>(0);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (review) {
      submitReview();
      setOpen(false);
    }
  };

  async function submitReview() {
    try {
      const productId = props?.cartDetails?.items[0]?.productId;
      const userId = props?.cartDetails?.userId;
      console.log('productId', productId);

      const response = await axios.post(
        `http://localhost:5000/products/${productId}/reviews`,
        {
          userId: userId,
          rating: value,
          comment: review,
        }
      );
      if (response.status === 200) {
        setSuccess('Review submitted successfully!');
        setOpen(false);
        setReview('');
        setValue(value);
        toast.success('Review submitted Successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce
          ,
        });
      } else {
        setError('Failed to submit the review. Please try again.');
        toast.success('Failed to submit the review. Please try again.', {
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
    } catch (error:any) {
      console.error('Error submitting review:', error);
      setError(
        'An error occurred while submitting the review. Please try again.'
      );
      toast.success(error.response.data, {
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

  return (
    <div className='order-history-container'>
      <div className='orders'>
        <div className='product-image-container'>
          <img
            src={props?.cartDetails?.items[0]?.productImage}
            alt='product-image'
          />
        </div>
        <div className='product-details-container'>
          <h2>{props?.cartDetails?.items[0]?.productName}</h2>
          <h4>
            {props?.cartDetails?.items[0]?.productCount},{' '}
            {props?.cartDetails?.items[0]?.productSize}
          </h4>
          {/* <h4>Ordered on: {props?.cartDetails?.orderDate}</h4> */}
          <h4>
            Ordered on:{' '}
            {
              new Date(props?.cartDetails?.orderDate)
                .toISOString()
                .split('T')[0]
            }
          </h4>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          {!value ? (
            <p>Rate this product now</p>
          ) : (
            <button className='review-btn' onClick={handleOpen}>
              Write/Edit a review
            </button>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <div className='review-container'>
              <h3>Write a review</h3>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button onClick={handleClose}>Ok</button>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </Modal>
          {/* {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
