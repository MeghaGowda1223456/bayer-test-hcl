import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './Excel.css';

const Excel = () => {
    const apiPassword = process.env.REACT_APP_PASSWORD;
    // console.log("Environment Password:", apiPassword); // Debugging line

    const [excel, setExcel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://peerplay-backend.vercel.app/email');
                // console.log(response);
                const allemails = response.data.message.map((obj) => obj.email);
                setExcel(allemails);
                setLoading(false);
            } catch (error) {
                console.log('error', error.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDownloadExcel = () => {
        setShowModal(true);
    };

    const verifyPasswordAndDownload = () => {
        // console.log("Entered Password:", password); // Debugging line
        if (password === apiPassword) {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(excel.map((email) => ({ email })));
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Emails');
            XLSX.writeFile(workbook, 'emails.xlsx');
            setShowModal(false);
        } else {
            alert('Incorrect password! Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="excel-container">
            <div className="excel-box">
                <h2>Welcome to User Data Download</h2>
                <button className="export-button" onClick={handleDownloadExcel}>
                    Download Excel
                </button>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 className="modal-title">Enter Password</h2>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="password-input"
                            />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    className="password-toggle-icon"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <AiFillEye
                                    className="password-toggle-icon"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                        <button className="verify-button" onClick={verifyPasswordAndDownload}>
                            Verify and Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Excel;
