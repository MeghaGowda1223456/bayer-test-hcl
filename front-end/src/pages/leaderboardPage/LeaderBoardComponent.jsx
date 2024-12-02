import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { leadetboardTableData } from "../../services/utils/leaderboardServices/leadetboard";
import proImg from "../../assets/Ellipse 580.png";
import { Link } from "react-router-dom";
import "./LeaderBoardComponent.css";
import GlobalRanking from "./GlobalRanking";
import Myranking from "./Myranking";

const Leaderboard = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [alignment, setAlignment] = useState("GLOBAL");

  const handleChange = (event, newAlignment) => {
    console.log(newAlignment, "newallignment", event.target.value);

    setAlignment(event.target.value);
  };
  console.log(alignment, "ffffffff");

  const fetchedTableData = async () => {
    const res = await leadetboardTableData({
      action: "fetchLeaderboard",
      additional_params: {
        Period: "all-time",
      },
    });
    if (res.data.length > 0) {
      setTableData(res.data);
    }
  };

  useEffect(() => {
    fetchedTableData();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: "center", my: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          size="small"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { sm: "space-around", md: "center" },
            alignItems: "center",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: "12px",
            "& .MuiToggleButtonGroup-grouped": {
              aspectRatio: "5/2",
              borderRadius: "0px",
            },
          }}
        >
          <ToggleButton
            value="GLOBAL"
            sx={{
              width: "125px",
              height: "41px",
              fontSize: "16px",
              color: "black",
              fontWeight: "400",
              textTransform: "none",
              border: "none",
              "&.Mui-selected": {
                background: "#F91AB0",
                color: "#fff",
                fontWeight: "400",
                border: 1,
                borderColor: "gray",
                borderRadius: "5rem !important",
                outline: "transparent !important",
              },
              "&.MuiToggleButton-root:hover": {
                background: "#F91AB0",
                borderRadius: "5rem !important",
                color: "#fff",
                border: "none",
              },
              "&.MuiToggleButton-root:focus": {
                outline: "none",
              },
            }}
          >
            Global Rank
          </ToggleButton>
          {/* <ToggleButton value="MYRANKING"
 sx={{
  width: '125px',
  height: '41px',
  fontSize: '16px',
  color: 'black',
  fontWeight: '400',
  textTransform: 'none',
 border:"none",
  '&.Mui-selected': {
    background: '#F91AB0',
    color: '#fff',
    fontWeight: '400',
    border: 1,
    borderColor: 'gray',
    borderRadius:"5rem !important",
    outline:"transparent !important"
  },
  '&.MuiToggleButton-root:hover':{
    background: '#F91AB0',
     borderRadius:"5rem !important",
     color:"#fff",
     border:"none"
  },
  '&.MuiToggleButton-root:focus':{
    outline:"none"
  }
}}
  >My Ranking</ToggleButton> */}
        </ToggleButtonGroup>
      </Box>

      {alignment === "GLOBAL" ? <GlobalRanking /> : <Myranking />}
    </>
  );
};

export default Leaderboard;
