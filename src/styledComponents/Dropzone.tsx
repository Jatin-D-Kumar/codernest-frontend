import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface DropzoneProps {
  onDrop: (files: FileList) => void;
  selectedImage: string | null;
  loading?: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onDrop,
  selectedImage,
  loading,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onDrop(files);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onDrop(files);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getBorder = () => {
    if (selectedImage) {
      return isDragging ? `4px dashed ${theme.palette.primary.main}` : "none";
    }
    return `2px dashed ${theme.palette.primary.main}`;
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: getBorder(),
        padding: 2,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragging ? "lightgrey" : "white",
        borderRadius: "50%",
        width: "14vw",
        height: "14vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down("sm")]: {
          width: "28vw",
          height: "28vw",
        },
      }}
      onClick={handleClick}
    >
      {!!loading ? (
        <CircularProgress size={30} />
      ) : (
        <>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleInputChange}
          />
          {!selectedImage && (
            <Typography
              variant={isSmallScreen ? "caption" : "body1"}
              color={"gray"}
            >
              {isDragging
                ? "Drop the image here..."
                : "Drag & drop an image here, or click to select an image"}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Dropzone;
