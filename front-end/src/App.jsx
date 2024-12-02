// import React, { useEffect } from "react";
// import { useAccount } from "wagmi";
// import axios from "axios";
// import { Routes, Route } from "react-router-dom";
// // import Header from "../src/components/header";
// import GameWallet from "./pages/GameWallet";
// import GameLaunch from "./pages/GameLaunch";
// import Excel from "./pages/Excel";
// import Footer from "./components/Footer";
// import "./App.css"; // Import the CSS for main-content class
// import "./index.css"; // Import the CSS for background image
// import Header from "./components/header";
// // import Header from "./components/Header";

// function App() {
//   const { address, isConnected } = useAccount();

//   useEffect(() => {
//     if (isConnected && address) {
//       const sendWalletAddress = async () => {
//         try {
//           const response = await axios.post(
//             "https://0njsnm5i2a.execute-api.ap-southeast-2.amazonaws.com/dev/userLogs",
//             {
//               method: "addOrUpdateWalletAddress",
//               additional_params: {
//                 UserWalletAddress: address,
//               },
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           console.log("API call successful:", response.data);
//         } catch (error) {
//           console.error("Error making API call:", error);
//         }
//       };

//       sendWalletAddress();
//     }
//   }, [isConnected, address]);

//   return (
//     <div className="App">
//       {/* Render the Header component */}
//       <Header />
//       {/* Create a div with the class "main-content" */}
//       <div className="main-content">
//         {/* Use the React Router to define routes */}
//         <Routes>
//           {/* Render the GameWallet component when the path is "/" */}
//           <Route path="/" element={<GameWallet />} />
//           {/* Render the GameLaunch component when the path is "/game-launch" */}
//           <Route path="/game-launch" element={<GameLaunch />} />
//           {/* Render the Excel component when the path is "/excel" */}
//           <Route path="/excel" element={<Excel />} />
//         </Routes>
//       </div>
//       {/* Render the Footer component */}
//       <Footer />
//     </div>
//   );
// }
// export default App;
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css"; // Import the CSS for main-content class
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import router from "./routes/index";

// defaultTheme
import themes from "./themes/index";

// project imports
import NavigationScroll from "./layout/NavigationScroll";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
