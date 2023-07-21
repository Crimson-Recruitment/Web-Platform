import React from 'react'

function ScheduleMeetingDialog() {
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
  )
}

export default ScheduleMeetingDialog