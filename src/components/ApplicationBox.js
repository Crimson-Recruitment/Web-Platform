import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ApplicationBox({needCoverLetter, onClose, open}) {

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Job Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your resume and contact details will be submitted!<br/>
            <span className="text-red-700">Confirm submission.</span>
          </DialogContentText>
          {needCoverLetter === "on" ?
          <>
          <DialogTitle>A cover letter is required for this job.</DialogTitle>
          <textarea
            id="coverletter"
            name="coverLetter"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Describe yourself,..."
          ></textarea>
          </>:null}
        
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}