import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { ethers } from "ethers";
import "./GameWallet.css";

const GameWallet = () => {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showWithdrawFundsModal, setShowWithdrawFundsModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [percentageToRemove, setPercentageToRemove] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("Base ETH");
  const [userBalance, setUserBalance] = useState(null);
  const [generatedWalletBalance, setGeneratedWalletBalance] = useState(null);
  const [bonusTokens, setBonusTokens] = useState(null);

  useEffect(() => {
    if (isConnected) {
      fetchUserDetails();
      fetchUserBalance(address, setUserBalance);
    } else {
      resetState();
    }
   
  }, [isConnected]);

  useEffect(() => {
    if (walletDetails && walletDetails.WalletPublicAddress) {
      fetchUserBalance(
        walletDetails.WalletPublicAddress,
        setGeneratedWalletBalance
      );
    }
  }, [walletDetails]);

  useEffect(() => {
    if (address) {
      fetchBonusTokens(address);
    }
  }, [address]);

  const resetState = () => {
    setUsername("");
    setUsernameAvailable(null);
    setWalletGenerated(false);
    setWalletDetails(null);
    setErrorMessage("");
    setAmount("");
    setSelectedCoin("Base ETH");
    setUserBalance(null);
    setIsMaxAmount(false);
    setGeneratedWalletBalance(null);
    setBonusTokens(null);
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "fetchUserDetailsAddress",
          additional_params: { PublicAddress: address },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response, "response");
      if (response.status === 200 && response.data) {
        setWalletDetails(response.data);
        setWalletGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setErrorMessage("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBalance = async (address, setBalance) => {
    console.log(address, "my address");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://959vielcfh.execute-api.ap-southeast-2.amazonaws.com/dev/fetchBalanceAPI",
        {
          method: "fetchUserBalance",
          additional_params: { address },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response, "balance api");
      if (response.status === 200 && response.data) {
        console.log(`Fetched balance for ${address}: ${response.data.balance}`);
        setBalance(response.data.balance);
      } else {
        setBalance(null);
        console.error(
          `Error fetching balance for ${address}: ${response.data.message}`
        );
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBonusTokens = async (publicAddress) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dzej2dfwk6.execute-api.ap-southeast-2.amazonaws.com/dev/readBonus",
        {
          method: "fetchBonusByUserPublicAddress",
          additional_params: { UserPublicAddress: publicAddress },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "nRBEd2cBjB3N892nTswg34w6VIwgpD6S5kgQrFTm",
          },
        }
      );
      if (response.status === 200 && response.data) {
        console.log(
          `Fetched bonus tokens for ${publicAddress}: ${response.data.BonusTokens}`
        );
        setBonusTokens(response.data.BonusTokens);
      } else {
        setBonusTokens(null);
        console.error(
          `Error fetching bonus tokens for ${publicAddress}: ${response.data.message}`
        );
      }
    } catch (error) {
      console.error("Error fetching bonus tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkUsername = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "checkUsername",
          additional_params: { Username: username },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data === "Username available") {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setErrorMessage("Error checking username");
    } finally {
      setLoading(false);
    }
  };

  const generateGameWallet = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "generateWallet",
          additional_params: {
            Username: username,
            UserPublicAddress: address,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setWalletGenerated(true);
        setWalletDetails({
          PlayerUsername: username,
          PublicAddress: address,
          WalletPublicAddress: response.data.WalletPublicAddress,
          WalletPrivateKey: response.data.WalletPrivateKey,
          WalletLSAAddress: null,
        });
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.error("Error generating game wallet:", error);
      setErrorMessage("Error generating game wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setErrorMessage("Invalid amount");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      if (typeof window.ethereum !== "undefined" && address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const value = ethers.utils.parseEther(amount);

        const tx = await signer.sendTransaction({
          to: walletDetails.WalletPublicAddress,
          value,
        });
        await tx.wait();
        fetchUserBalance(address, setUserBalance); // Update balance after transaction
        fetchUserBalance(
          walletDetails.WalletPublicAddress,
          setGeneratedWalletBalance
        ); // Update generated wallet balance after transaction
        setShowAddFundsModal(false);
        setAmount("");
        setIsMaxAmount(false); // Reset max amount state
        setErrorMessage(""); // Reset error message
      }
    } catch (error) {
      console.error("Error adding funds:", error);
      setErrorMessage("Error adding funds");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawFunds = async () => {
    if (
      !percentageToRemove ||
      isNaN(percentageToRemove) ||
      parseFloat(percentageToRemove) <= 0 ||
      parseFloat(percentageToRemove) > 100
    ) {
      setErrorMessage("Invalid percentage");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://aod1hrtvnb.execute-api.ap-southeast-2.amazonaws.com/dev/withdrawFunds",
        {
          method: "withdrawFunds",
          additional_params: {
            UserPublicAddress: walletDetails.PublicAddress,
            percentageToRemove: parseFloat(percentageToRemove),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "wuDVhnz8t013fFTECZUsR8D9IMdk7fKy6qcuITqC",
          },
        }
      );
      if (response.status === 200) {
        fetchUserBalance(address, setUserBalance); // Update user balance after transaction
        fetchUserBalance(
          walletDetails.WalletPublicAddress,
          setGeneratedWalletBalance
        ); // Update generated wallet balance after transaction
        setShowWithdrawFundsModal(false);
        setPercentageToRemove("");
        setErrorMessage(""); // Reset error message
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Error withdrawing funds: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMaxClick = async () => {
    if (userBalance) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 21000; // typical gas limit for ETH transfer
      const txFee = ethers.utils.formatEther(gasPrice.mul(gasLimit));
      const maxAmount = parseFloat(userBalance) - parseFloat(txFee);
      setAmount(maxAmount.toFixed(18)); // Set the maximum transferable amount
      setIsMaxAmount(true); // Set max amount state
    }
  };

  const handleWithdrawMaxClick = async () => {
    setPercentageToRemove("100");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setIsMaxAmount(false); // Reset max amount state when user manually changes the amount
  };

  const handlePercentageChange = (e) => {
    setPercentageToRemove(e.target.value);
  };

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
  };

  return (
    <div className="game-wallet-container">
      <div className="game-wallet-box">
        {!isConnected ? (
          <p className="connect-message">Please connect your wallet.</p>
        ) : !walletGenerated ? (
          <div>
            <h2>Create Your Game Wallet</h2>
            <p>Choose a username for your game wallet.</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="username-input"
            />
            <button
              className="check-username-button"
              onClick={checkUsername}
              disabled={loading || !username}
            >
              {loading && usernameAvailable === null
                ? "Checking..."
                : "Check Username"}
            </button>
            {usernameAvailable === true && (
              <div>
                <p className="username-available">Username available</p>
                <button
                  className="generate-wallet-button"
                  onClick={generateGameWallet}
                  disabled={loading}
                >
                  {loading && walletDetails === null
                    ? "Generating..."
                    : "Generate Game Wallet"}
                </button>
              </div>
            )}
            {usernameAvailable === false && (
              <p className="username-unavailable">Username is already taken</p>
            )}
            {errorMessage && usernameAvailable !== null && (
              <p className="error-message">{errorMessage}</p>
            )}
          </div>
        ) : (
          <div>
            {walletDetails ? (
              <div>
                <p className="wallet-generated-message">
                  Your Peer2Play account details:
                </p>
                <div className="wallet-details">
                  <p>
                    <strong>Username:</strong> {walletDetails.PlayerUsername}
                  </p>
                  <p>
                    <strong>Game Wallet Address:</strong>{" "}
                    {walletDetails.WalletPublicAddress}
                  </p>
                  <p>
                    <strong>Generated Wallet Balance:</strong>{" "}
                    {generatedWalletBalance !== null
                      ? `${generatedWalletBalance} ETH`
                      : "Fetching..."}
                  </p>
                  <p>
                    <strong>Bonus Tokens:</strong>{" "}
                    {bonusTokens !== null
                      ? `${bonusTokens} tokens`
                      : "Fetching..."}
                  </p>
                </div>
                <button
                  className="add-funds-button"
                  onClick={() => {
                    setShowAddFundsModal(true);
                    setErrorMessage(""); // Reset error message
                  }}
                >
                  Add Coins
                </button>
                <button
                  className="withdraw-funds-button"
                  onClick={() => {
                    setShowWithdrawFundsModal(true);
                    setErrorMessage(""); // Reset error message
                  }}
                >
                  Withdraw Coins
                </button>
              </div>
            ) : (
              <p className="wallet-generated-message">
                Game Wallet has been generated successfully!
              </p>
            )}
          </div>
        )}
      </div>
      {showAddFundsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Coins to {walletDetails.WalletPublicAddress}</h3>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="amount-input"
            />
            <button className="max-button" onClick={handleMaxClick}>
              Max
            </button>
            <p className="balance-display">
              Balance: {userBalance ? `${userBalance} ETH` : "Fetching..."}
            </p>
            <div className="coin-selector-wrapper">
              <select
                value={selectedCoin}
                onChange={handleCoinChange}
                className="coin-selector"
              >
                <option value="Base ETH">Base ETH</option>
                {/* Add more coin options here if needed */}
              </select>
              <img
                src="assets/images/baseeth.png"
                alt="BASE ETH Icon"
                className="coin-icon"
              />
            </div>
            <div className="modal-buttons">
              <button
                className="confirm-button"
                onClick={handleAddFunds}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setShowAddFundsModal(false);
                  setErrorMessage(""); // Reset error message
                }}
              >
                Cancel
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
      {showWithdrawFundsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Withdraw Coins from {walletDetails.WalletPublicAddress}</h3>
            <input
              type="text"
              value={percentageToRemove}
              onChange={handlePercentageChange}
              placeholder="Enter percentage"
              className="percentage-input"
            />
            <button className="max-button" onClick={handleWithdrawMaxClick}>
              Max
            </button>
            <p className="balance-display">
              Balance:{" "}
              {generatedWalletBalance
                ? `${generatedWalletBalance} ETH`
                : "Fetching..."}
            </p>
            <div className="coin-selector-wrapper">
              <select
                value={selectedCoin}
                onChange={handleCoinChange}
                className="coin-selector"
              >
                <option value="Base ETH">Base ETH</option>
                {/* Add more coin options here if needed */}
              </select>
              <img
                src="assets/images/baseeth.png"
                alt="BASE ETH Icon"
                className="coin-icon"
              />
            </div>
            <div className="modal-buttons">
              <button
                className="confirm-button"
                onClick={handleWithdrawFunds}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setShowWithdrawFundsModal(false);
                  setErrorMessage(""); // Reset error message
                }}
              >
                Cancel
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameWallet;
