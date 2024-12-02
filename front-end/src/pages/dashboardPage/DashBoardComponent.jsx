import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Snackbar } from '@mui/material';
import { useAccount } from 'wagmi';
import axios from 'axios';
import balanceBanner from '../../assets/group.png';
import { IoCopyOutline } from 'react-icons/io5';
import wifi from '../../assets/Paypass.png';
import './DashBoardComponent.css';

const DashboardComponent = () => {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [bonusTokens, setBonusTokens] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isConnected) {
      fetchUserDetails();
    }
  }, [isConnected]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(
        'https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI',
        {
          method: 'fetchUserDetailsAddress',
          additional_params: { PublicAddress: address },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 && response.data) {
        setWalletDetails(response.data);
        setUsername(response.data.PlayerUsername);
        setWalletGenerated(true);
        fetchUserBalance(response.data.WalletPublicAddress);
        fetchBonusTokens(address);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setErrorMessage('Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBalance = async (walletAddress) => {
    try {
      const response = await axios.post(
        'https://959vielcfh.execute-api.ap-southeast-2.amazonaws.com/dev/fetchBalanceAPI',
        {
          method: 'fetchUserBalance',
          additional_params: { address: walletAddress },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 && response.data) {
        setUserBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
    }
  };

  const fetchBonusTokens = async (publicAddress) => {
    try {
      const response = await axios.post(
        'https://dzej2dfwk6.execute-api.ap-southeast-2.amazonaws.com/dev/readBonus',
        {
          method: 'fetchBonusByUserPublicAddress',
          additional_params: { UserPublicAddress: publicAddress },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'nRBEd2cBjB3N892nTswg34w6VIwgpD6S5kgQrFTm',
          },
        }
      );
      if (response.status === 200 && response.data) {
        setBonusTokens(response.data.BonusTokens);
      }
    } catch (error) {
      console.error('Error fetching bonus tokens:', error);
    }
  };

  const checkUsername = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(
        'https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI',
        {
          method: 'checkUsername',
          additional_params: { Username: username },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data === 'Username available') {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setErrorMessage('Error checking username');
    } finally {
      setLoading(false);
    }
  };

  const generateGameWallet = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(
        'https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI',
        {
          method: 'generateWallet',
          additional_params: {
            Username: username,
            UserPublicAddress: address,
          },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        setWalletGenerated(true);
        setWalletDetails({
          PlayerUsername: username,
          PublicAddress: address,
          WalletPublicAddress: response.data.WalletPublicAddress,
        });
        fetchUserBalance(response.data.WalletPublicAddress);
        fetchBonusTokens(address);
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.error('Error generating game wallet:', error);
      setErrorMessage('Error generating game wallet');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Typography fontSize="2rem" fontWeight="bold" color="black">
        Please connect your wallet.
      </Typography>
    );
  }
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(walletDetails.WalletPublicAddress)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!walletGenerated ? (
        <Box
          sx={{ width: '100%', maxWidth: '600px', backgroundColor: '#DBDBDB', padding: '2rem', borderRadius: '25px' }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
            Create Your Game Wallet
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={checkUsername}
            disabled={loading || !username}
            sx={{ mb: 2, backgroundColor: '#35CCE4' }}
          >
            {loading && usernameAvailable === null ? 'Checking...' : 'Check Username'}
          </Button>
          {usernameAvailable === true && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" color="green" sx={{ mb: 2 }}>
                Username available
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={generateGameWallet}
                disabled={loading}
                sx={{ mb: 2, backgroundColor: '#35CCE4' }}
              >
                {loading && walletDetails === null ? 'Generating...' : 'Generate Game Wallet'}
              </Button>
            </Box>
          )}
          {usernameAvailable === false && (
            <Typography variant="body1" color="red" sx={{ mb: 2 }}>
              Username is already taken
            </Typography>
          )}
          {errorMessage && usernameAvailable !== null && (
            <Typography variant="body1" color="red" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Game Wallet Details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative', flex: 1, mr: 2 }}>
              <img
                src={balanceBanner}
                alt="balance banner"
                className='responsive-imag'
                style={{
                  borderRadius: '25px',
                  maxWidth: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  width: 'calc(100% - 2.5rem)',
                  bottom: '2rem',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
                className="walletDetails-wrapper"
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  className="walletDetails"
                >
                  <Typography fontSize="1rem" fontWeight="bold">
                    {walletDetails ? address : '0x'}
                  </Typography>
                  <img src={wifi} alt="balance component" style={{ height: '24px', width: '24px' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1.25rem',
                  }}
                  className="walletInfo"
                >
                  {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{display:"flex", flexDirection:"row"}}>
                    <Typography fontSize="0.875rem">Name:</Typography>
                    <Typography fontSize="0.875rem">{toSentenceCase(username)}</Typography>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"row"}}>
                    <Typography fontSize="0.875rem" color="white">
                      Game Wallet Address: 
                    </Typography>
                    <Typography>
                    {walletDetails.WalletPublicAddress}
                    </Typography>
                      </Box>
                    <Typography fontSize="1rem" color="white">
                      Generated Wallet Balance: {userBalance ? userBalance : "0.00"} ETH
                    </Typography>
                    <Typography fontSize="1rem" color="white">
                      Bonus Tokens: {bonusTokens !== null ? bonusTokens : "0"} tokens
                    </Typography>
                  </Box> */}
                  {/* <img
                    src={p2p}
                    alt="logo"
                    style={{ height: "3.4375rem", maxWidth: "3.75rem" }}
                  /> */}

                  <Grid container direction="column" flexWrap="wrap">
                    <Grid item container alignItems="center">
                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" className="game-wallet-details">
                          Name:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" className="game-wallet-details">
                         {username}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="top" flexWrap="wrap">
                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" color="white" className="game-wallet-details">
                          Game Wallet Address:
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" sx={{ wordBreak: 'break-word' }} className="game-wallet-details">
                          {walletDetails.WalletPublicAddress}
                          <span onClick={handleCopyClick} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                            <IoCopyOutline />
                          </span>
                        </Typography>
                      </Grid>
                      <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="Wallet address copied to clipboard!"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      />
                    </Grid>
                    <Grid item container alignItems="top" flexWrap="wrap">
                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" color="white" className="game-wallet-details">
                          Generated Wallet Balance:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          fontSize="0.875rem"
                          sx={{ wordBreak: 'break-word' }}
                          className="game-wallet-details"
                        >
                          {' '}
                          {userBalance ? userBalance : '0.00'} ETH
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid item container>
        <Grid item xs={12}>
          <Typography fontSize="1rem" color="white">
            Bonus Tokens: {bonusTokens !== null ? bonusTokens : '0'} tokens
          </Typography>
        </Grid>
      </Grid> */}
                    <Grid item container alignItems="center" flexWrap="wrap">
                      <Grid item xs={6}>
                        <Typography fontSize="0.875rem" color="white" className="game-wallet-details">
                          Bonus Tokens:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          fontSize="0.875rem"
                          sx={{ wordBreak: 'break-word' }}
                          className="game-wallet-details"
                        >
                          {bonusTokens !== null ? bonusTokens : '0'} tokens
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DashboardComponent;

