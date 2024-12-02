import React from "react";
import "../styles/Cricket.css";


function Cricket() {
    return (
        <div className="cricket-container">
            <div className="cricket-flex">
                <div className="cricket-box">
                    <div className="cricket-box-image" >
                        {/* <img  src={batsmenImg} className="cricket-image" alt="Peers to Play" /> */}
                     
                        <div className="cricket-text">
        
                                <h2 className="cricket-heading">Decentralized</h2>
                                <h2 className="cricket-heading">Cricket League</h2>
                                <p className="cricket-text-lg">
                                    Free-2-Play & Play to Earn Blockchain game. It is an ideal
                                    game in the sports tycoon simulation game. This game is one
                                    of the first blockchain game for men and women. This
                                    Decentralized Cricket League game is a half a billion dollar
                                    market with global impact: video games, cricket, sports.
                                    Where players can play around in Blockchain, NFT, Metaverse
                                    technologies, which is another multi-billion dollar
                                    industry.
                                </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cricket;
