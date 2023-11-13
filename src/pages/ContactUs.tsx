import React, { FormEventHandler, useRef } from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
  AlertColor,
  SnackbarCloseReason,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Card
          sx={{
            maxWidth: "85vw",
            borderRadius: "20px",
            backgroundColor: "#FFC0CB",
          }}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h4" align="center" mb={2}>
                    Contact Us
                  </Typography>
                  <Typography variant="h6" align="center" mb={2}>
                    We would love to hear from you!
                  </Typography>
                  <form
                    ref={form}
                    id="contact-form"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          fullWidth
                          label="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          margin="normal"
                          name="from_name"
                          variant="filled"
                          color="error"
                          sx={{ background: "white" }}
                          required
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          margin="normal"
                          required
                          name="email"
                          type="email"
                          variant="filled"
                          color="error"
                          sx={{ background: "white" }}
                        />
                        <TextField
                          fullWidth
                          label="Message"
                          margin="normal"
                          required
                          name="message"
                          multiline
                          rows={4}
                          variant="filled"
                          color="error"
                          sx={{ background: "white" }}
                        />
                        <Button
                          disabled={loading}
                          variant="contained"
                          type="submit"
                          sx={{
                            mt: 2,
                            backgroundColor: "darkred",
                            ":hover": { backgroundColor: "black" },
                          }}
                        >
                          {loading ? "Sending..." : "Submit"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
