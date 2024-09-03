import { useState } from "react";
import Modal from '@mui/material/Modal';
import axios from "axios";

const UpdatePassword = () => {
    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function updatePassword() {
        try {
            const response = await axios.put('http://localhost:5000/auth/updatePassword', {
                currentPassword: currentPassword,
                newPassword: newPassword,
                userId : localStorage.getItem("id")
            })
            setOpen(false);
        } catch(error) {
            console.log('error', error)
        }
    }

    const handleOpen = () => setOpen(true);
     const handleClose = () => {        
        if(currentPassword && newPassword) {
            updatePassword();
        }
     }
  return (
    <>
        <button onClick={handleOpen}>Update Password</button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="update-password-modal-container">
                <h2 className="modal-title">Update Password</h2>
                {/* <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                <input type="text" placeholder="Enter your current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <input type="text" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={handleClose}>Update</button>
                <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
        </Modal>
    </>
  )
}

export default UpdatePassword
