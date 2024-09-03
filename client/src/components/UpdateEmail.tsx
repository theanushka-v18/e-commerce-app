import { useState } from "react";
import Modal from '@mui/material/Modal';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {
    const [open, setOpen] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const {setUserData} = useAuth();
    const navigate = useNavigate();

    function isEmailValid(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async function getUserProfile() {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            // console.log(response.data);
            setUserData(response.data)
            navigate(-1);
          } catch (error) {
            console.log("Cannot get user profile", error);
          }
    }

    async function updateEmail() {
        try {
            const response = await axios.put('http://localhost:5000/auth/updateEmail', {
                email : newEmail,
                userId : localStorage.getItem("id"),
                otp
            })
            setOpen(false);
            getUserProfile();
        } catch(error) {
            console.log('error', error)
        }
    }

    const handleOpen = () => setOpen(true);
     const handleClose = () => {        
        if(currentEmail && currentEmail) {
            updateEmail();
        }
     }

     async function handleSendOtp(e:any) {
        if(currentEmail && isEmailValid(currentEmail) && newEmail && isEmailValid(newEmail)) {
            const response = axios.post('http://localhost:5000/auth/sendOtp', {
                email : currentEmail,
                userId : localStorage.getItem("id")
            })
            if((await response).status == 200) {
                setIsOtpSent(true);
            }
        }
     }

     
  return (
    <>
        <button onClick={handleOpen}>Update Email</button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="update-password-modal-container">
                <h2 className="modal-title">Update Email</h2>
                {/* <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                <input type="text" placeholder="Enter your current Email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
                <input type="text" placeholder="Enter your new Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                {isOtpSent && <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />}
                {isOtpSent ? <button onClick={handleClose}>Update</button> : <button onClick={(e) => handleSendOtp(e)}>Send OTP</button>}
                <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
        </Modal>
    </>
  )
}

export default UpdateEmail;
