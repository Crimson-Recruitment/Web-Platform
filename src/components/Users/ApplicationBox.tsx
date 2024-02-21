import { Alert, AlertColor, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { ApplicationApplyModel } from "../../Models/ApplicationApplyModel";
import { createApplication } from "../../core/applicationApi";

export default function ApplicationBox(props: {
  needCoverLetter: any;
  onClose: any;
  isOpen: any;
  jobId: any;
  jobName: any;
  companyId: any;
}) {
  const { needCoverLetter, onClose, isOpen, jobId, jobName, companyId } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{
    message: string | null;
    type: string | null;
  }>({ message: null, type: null });
  const handleClick = (val: { message: string; type: string }) => {
    setMessage(val);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = async (e: any) => {
    setLoading(true);
    if (needCoverLetter) {
      let val: any = document.getElementById("coverLetter");
      if (val.value == "") {
        handleClick({ message: "Please add a cover letter!", type: "error" });
        return;
      }
      if (val.value.length < 200) {
        handleClick({
          message: "Please enter atleast 200 characters!",
          type: "error",
        });
        return;
      }
      let application: ApplicationApplyModel = {
        coverLetter: val.value,
        timeStamp: new Date().toISOString(),
      };
      let res = await createApplication(application, jobId);
      if (res.status == 200) {
        handleClick({
          message: "You have applied to the job, cheers!",
          type: "success",
        });
        await new Promise((res) => setTimeout(res, 1000));
        onClose();
      } else {
        handleClick({ message: `Error: ${res?.data?.message}`, type: "error" });
      }
    } else {
      let application: ApplicationApplyModel = {
        coverLetter: "",
        timeStamp: new Date().toISOString(),
      };

      let res = await createApplication(application, jobId);
      if (res.status == 200) {
        handleClick({
          message: "You have applied to the job, cheers!",
          type: "success",
        });
        onClose();
      } else {
        handleClick({ message: `Error: ${res?.data?.message}`, type: "error" });
      }
    }

    setLoading(false);
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
          {needCoverLetter ? (
            <>
              <DialogTitle>
                A cover letter is required for this job.
              </DialogTitle>
              <TextField
                required
                id="coverLetter"
                name="coverLetter"
                multiline
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                variant="outlined"
                fullWidth
              />
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
          severity={message.type as AlertColor}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
