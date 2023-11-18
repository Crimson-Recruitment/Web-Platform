import { styled } from "@mui/material";

export const StyledDropzone = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(5),
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

export const StyledLabel = styled("label")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: theme.spacing(16), // Adjust height as needed
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  backgroundColor: theme.palette.grey[100],
}));

export const StyledIcon = styled("svg")(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[600],
}));
