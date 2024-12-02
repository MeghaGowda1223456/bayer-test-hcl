import React from 'react';
import '../styles/UserGenerated.css';

function UserGenerated() {
    return (
        <div className="user-generated-container">
            <h3 className="user-generated-heading">User Generated Content</h3>
            <div className="simple-grid">
                <div className="user-generated-box">
                    <img src="assets/images/Frame_21.png" alt="Influencers" className="icon-button" />
                    <h4 className="user-generated-subheading">INFLUENCERS OR USER MANAGED TOURNAMENTS</h4>
                </div>
                <div className="user-generated-box">
                    <img src="assets/images/Frame_21.png" alt="User Content" className="icon-button" />
                    <h4 className="user-generated-subheading">USERS GENERATED CONTENTS</h4>
                </div>
                <div className="user-generated-box">
                    <img src="assets/images/Frame_21.png" alt="Multiplayer" className="icon-button" />
                    <h4 className="user-generated-subheading">MULTIPLAYER GAMING PLATFORM</h4>
                </div>
                <div className="user-generated-box">
                    <img src="assets/images/Frame_21.png" alt="Social Hubs" className="icon-button" />
                    <h4 className="user-generated-subheading">SOCIAL HUBS</h4>
                </div>
            </div>
        </div>
    );
}

export default UserGenerated;
