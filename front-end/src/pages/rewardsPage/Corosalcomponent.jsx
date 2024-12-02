import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const MyCarousel = ({ daysArray }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6, // 6 items for super large screens
      slidesToSlide: 1, // Scroll one item at a time
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6, // 6 items for regular desktop screens
      slidesToSlide: 1, // Scroll one item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3, // 3 items for tablet screens
      slidesToSlide: 1, // Scroll one item at a time
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2, // 2 items for mobile screens
      slidesToSlide: 1, // Scroll one item at a time
    },
  };
  const carouselContainerStyle = {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    display: "flex",
  };

  const carouselItemStyle = {
    padding: 0,
    margin: "0 10px",
    transition: "transform 0.5s ease-in-out",
  };
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
      arrows={false}
      containerClass="carousel-container"
      itemClass="carousel-item"
    >
      {daysArray.map((val, index) => (
        <Card
          key={index}
          sx={{
            width: "80%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#F6F9FD",
            gap: "10px",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">{val.day}</Typography>
              {index < 3 ? (
                <Typography my={1} fontSize={30}>
                  🍐
                </Typography> // Show string for the first 3 elements
              ) : (
                <Box
                  component="img"
                  src={val.img} // Replace with your image URL
                  alt="Placeholder"
                  //   my={1}
                />
              )}
              <Typography variant="h6">{val.val}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
