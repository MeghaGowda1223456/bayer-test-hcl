import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Mail.css';

const Mail = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            return alert('Invalid email format');
        }

        if (!email) {
            return alert('This field is required');
        }

        try {
            setLoading(true);
            const response = await axios.post(
                'https://peerplay-backend.vercel.app/email',
                { email }
            );
            setMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            console.log(error.response.data);
            setMessage(error.response.data.message);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail('');
        setMessage('');
    };

    return (
        <div className="mail-container">
            <div className="mail-content">
                <h2>Subscribe to our Newsletter</h2>
                <p>
                    Get early access and be the first to experience the future of iGaming.
                    Join the waitlist by providing your email below.
                </p>
                <div className="mail-input-section">
                    <input
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="mail-input"
                    />
                    <button onClick={handleSubmit} className="mail-button" disabled={loading}>
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{message}</p>
                        <button onClick={closeModal} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mail;
