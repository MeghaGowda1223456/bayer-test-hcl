import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{ padding: "16px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* Header */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight="bold">
          Welcome, John
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar alt="User Icon" />
          <Typography>John Doe</Typography>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={2} mt={2}>
        {/* Upcoming Appointments */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Upcoming Appointments
              </Typography>
              <Typography>
                Next appointment: Dr. Smith on June 15, 2023 at 10:00 AM
              </Typography>
              <Typography>
                Following: Dr. Johnson on June 22, 2023 at 2:00 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Reminders */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Health Reminders
              </Typography>
              <ul>
                <li>
                  <Typography>Take medication A at 9:00 AM daily</Typography>
                </li>
                <li>
                  <Typography>Schedule annual check-up</Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Tip of the Day */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Health Tip of the Day
              </Typography>
              <Typography>
                Stay hydrated! Aim to drink at least 8 glasses of water per day.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Grid container spacing={2} mt={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="success">
            Book Appointment
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success">
            View Health Records
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success">
            Message Provider
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
