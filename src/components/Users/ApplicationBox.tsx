import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Firestore from "../../Firebase/Firestore";
import { Alert, Snackbar } from "@mui/material";

export default function ApplicationBox({
  needCoverLetter,
  onClose,
  isOpen,
  jobId,
  jobName,
  companyId,
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({ message: null, type: null });
  const handleClick = (val) => {
    setMessage(val);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    await new Firestore()
      .createApplication(
        jobId,
        jobName,
        companyId,
        document.getElementsByName("coverLetter")[0].value
      )
      .then(async (val) => {
        if (val.code == 0) {
          handleClick({
            message: "Successfully applied for job!",
            type: "success",
          });
          await new Promise((res) => setTimeout(res, 2000));
          setLoading(false);
          onClose();
        } else {
          handleClick({
            message: "Already submitted an application!",
            type: "error",
          });
          setLoading(false);
          await new Promise((res) => setTimeout(res, 2000));
        }
      });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Job Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your resume and contact details will be submitted!
            <br />
            <span className="text-red-700">Confirm submission.</span>
          </DialogContentText>
          {needCoverLetter === "on" ? (
            <>
              <DialogTitle>
                A cover letter is required for this job.
              </DialogTitle>
              <textarea
                required
                id="coverletter"
                name="coverLetter"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Describe yourself,..."
              ></textarea>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={submitHandler}>
            Submit
          </Button>
          <Button disabled={loading} onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
