import React, { useRef } from "react";
import { useState } from "react";
import { TextField, Button, Typography, Grid, Box, Snackbar, Alert } from "@mui/material";
import emailjs from "emailjs-com";
import { API_KEY_EMAILJS, SERVICE_ID, TEMPLATE_ID } from "../credentials";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({message:"", severity:""});
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

const form = useRef();



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    emailjs.sendForm(
      SERVICE_ID, 
      TEMPLATE_ID, 
      form.current, API_KEY_EMAILJS)
    .then(async () => {
      setMessage({message:"You have successfully sent a message, we will be contacting you soon!", severity:"success"})
      setOpen(true)
      setLoading(false)
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/')
    }, (error) => {
      setMessage({message:`Error: ${error.text}`, severity:"error"})
      setOpen(true)
      setLoading(false)
    });
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
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" align="center" mb={2}>
              Contact Us
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
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    margin="normal"
                    required
                    name="message"
                    multiline
                    rows={4}
                  />
                  <Button disabled={loading} variant="contained" type="submit" sx={{ mt: 2 }}>
                    {loading ? "Sending...": "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
