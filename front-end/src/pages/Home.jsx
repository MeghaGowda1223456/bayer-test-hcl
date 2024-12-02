import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import Cricket from "../components/Cricket";
import UserGenerated from "../components/UserGenerated";
import Header from "../components/header";

const Home = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email format");
    }

    if (!email) {
      return alert("This field is required");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://peerplay-backend.vercel.app/email",
        { email }
      );
      if (response.status === 200) {
        setSuccessMessage("Thank you for subscribing!");
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error submitting email:", error.response.data.message);
      const errorMessage =
        error.response.data.message || "Error submitting email";
      setSuccessMessage(errorMessage);
      // setSuccessMessage('Error submitting email');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail("");
    setSuccessMessage("");
  };

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Peer2Play</h1>
              <p>Connect, Invite, Challenge & Earn</p>
            </div>
            <div className="hero-images">
              <div></div>
              <img
                src="assets/images/img_message_1.png"
                alt="Message"
                className="hero-image top-right"
              />
              <img
                src="assets/images/img_cursor_2.png"
                alt="Cursor"
                className="hero-image top-left"
              />

              <img
                src="assets/images/img_torus_1.png"
                alt="Torus"
                className="hero-image bottom-left"
              />
              <img
                src="assets/images/img_cylinder_1.png"
                alt="Cylinder"
                className="hero-image bottom-right"
              />
              <img
                src="assets/images/Ellipse_2.png"
                alt="Ellipse"
                className="hero-ellipse"
              />
            </div>
          </div>
        </div>

        <div className="social-media-section">
          <div>
            <h2>Connect Your Social Media</h2>
            <p>
              Enjoy customizable lists, team work tools, and smart tracking all
              in one place. Set tasks, get reminders, and see your progress
              simply and quickly.
            </p>
          </div>

          <div className="social-media-links">
            <a
              href="https://x.com/Peer2playAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="assets/images/x.png"
                alt="Twitter"
                className="social-media-image"
              />
            </a>
            <a
              href="https://discord.gg/fN4MFFxC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="assets/images/discord.png"
                alt="Discord"
                className="social-media-image social-media-image2"
              />
            </a>
            <a
              href="https://t.me/+_jN0qLddLrw0ZjY1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="assets/images/tg.png"
                alt="Telegram"
                className="social-media-image social-media-image2"
              />
            </a>
          </div>
        </div>

        <div className="cricket-section">
          <div className="desktop-landing-box">
            <div className="gaming-platform-overview">
              <div className="social-gaming">
                <div className="social-gaming-content">
                  <h2>A Social Gaming Platform</h2>
                  <p>
                    PeerToPlay has the potential to revolutionize social gaming
                    by creating more interactive, community-driven, and secure
                    gaming experiences. By leveraging P2P technology, social
                    games can foster stronger player communities, encourage
                    creativity through user-generated content, and provide a
                    scalable and cost-effective platform for developers.
                    However, addressing challenges related to network
                    management, consistency, and fair play will be crucial to
                    fully realize the potential of PeerToPlay in social gaming.
                  </p>
                </div>
                <Cricket />
              </div>
            </div>
          </div>
        </div>

        <div className="user-generated-section">
          <UserGenerated />
        </div>

        <div className="subscription-section">
          <h2
            letterSpacing="-1.24px"
            style={{
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              textAlign: "center",
              fontSize: "54px",
            }}
          >
            Get access to Subscribe
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#CCC",
              letterSpacing: "-0.16px",
              textAlign: "center",
              width: "500px",
              margin: "0 auto 25px",
              lineHeight: "23px",
            }}
          >
            Get early access and be the first to experience the future of
            iGaming.Join the waitlist by providing your email below.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@peertoplay.ai"
            className="email-input"
          />
          <button
            onClick={handleEmailSubmit}
            className="subscribe-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>{successMessage}</p>
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
