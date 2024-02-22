import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { IMeetingInfo } from "../Models/MeetingInfoModel";
import { Grid, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MeetingDetails({
  open,
  setOpen,
  meeting,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meeting: IMeetingInfo;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Meeting Details"}</DialogTitle>
        <DialogContent>
          <Grid container>
            {meeting.meetingType === "online" ? (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Meeting Type</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.meetingType}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Agenda</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.agenda}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Start Time</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {new Date(meeting?.startTime).toDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Link</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.joinUrl}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Meeting Type</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.meetingType}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Location</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.location}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Contact email</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.contactEmail}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Contact Phone Number</Typography>
                  <Typography
                    color={"text.secondary"}
                    sx={{ marginBottom: "20px" }}
                    gutterBottom
                  >
                    {meeting?.contactPhoneNumber}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
