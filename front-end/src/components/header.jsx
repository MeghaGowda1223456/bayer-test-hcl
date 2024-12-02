import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../styles/header.css';
import logo from '../assets/header_logo.png'; // Adjust the path as necessary

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="App Logo" className="logo" />
                </div>
                <nav className="nav-links">
                    {/* <Link to="/">Home</Link> */}
                    {/* <Link to="/game-wallet">Game Wallet</Link>
                    <Link to="/game-launch">Game Launch</Link> */}
                </nav>
                <div className="wallet-button">
                    <ConnectButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
