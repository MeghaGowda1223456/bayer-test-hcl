// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">@ 2024 Peer2Play. All rights reserved</p>
                    <div className="footer-icons">
                        <a href="https://x.com/Peer2playAI" target="_blank" rel="noopener noreferrer">
                            <img src="assets/images/xlogo.png" alt="Twitter" className="footer-icon" />
                        </a>
                        <a href="https://discord.gg/fN4MFFxC" target="_blank" rel="noopener noreferrer">
                            <img src="assets/images/disblue.png" alt="Discord" className="footer-icon" />
                        </a>
                        <a href="https://t.me/+_jN0qLddLrw0ZjY1" target="_blank" rel="noopener noreferrer">
                            <img src="assets/images/tgicons.png" alt="Telegram" className="footer-icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
