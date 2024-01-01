import { CheckCircleRounded } from "@mui/icons-material";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MuiPhoneNumber from "material-ui-phone-number";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeZones } from "../../Data/Meeting";
import LocationInput from "../LocationInput";
import { IMeetingInfo } from "../../Models/MeetingInfoModel";
import { getRefreshToken, scheduleMeeting } from "../../core/applicationApi";

const steps = ["Select Meeting Type", "Schedule Meeting"];

export default function MeetingDialogBox({
  open,
  handleClose,
  applicationId,
}: {
  open: boolean;
  handleClose: () => void;
  applicationId: number;
}) {
  const location = useSelector((state: any) => state.location);
  const state = useSelector((state: any) => state.schedule);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log(state);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmitHandler = async () => {
    dispatch({ type: "SET_SCHEDULE_SEND", payload: true });
    if (new Date(state.startTime) < new Date()) {
      console.log("Start Date has to be later than today!");
      dispatch({ type: "SET_SCHEDULE_SEND", payload: false });
      return;
    }
    let meeting: IMeetingInfo = state;
    await scheduleMeeting(meeting, applicationId);
    console.log(state);
    dispatch({ type: "SET_SCHEDULE_SEND", payload: false });
  };

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Schedule Meeting</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "100%",
            }}
          >
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <CheckCircleRounded color="success" /> Successfully scheduled
                  meeting!
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    variant="contained"
                    onClick={async () => {
                      handleClose();
                      await new Promise((res) => setTimeout(res, 1000));
                      window.location.reload();
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box component="form" noValidate={false} sx={{ mt: 1 }}>
                  {activeStep === 0 ? (
                    <Grid container sx={{ margin: "10px" }}>
                      <FormControl>
                        <Typography
                          sx={{
                            marginBottom: "10px",
                            color: "black",
                            fontSize: "20px",
                          }}
                          id="demo-radio-buttons-group-label"
                          variant="h6"
                        >
                          Select the meeting type
                        </Typography>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          value={state.meetingType}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_MEETING_TYPE",
                              payload: val.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="physical"
                            control={<Radio />}
                            label="Physical Meeting"
                          />
                          <FormControlLabel
                            value="online"
                            control={<Radio />}
                            label="Online Meeting"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  ) : activeStep === 1 ? (
                    state.meetingType === "online" ? (
                      <Box>
                        <label
                          htmlFor="agenda"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Agenda
                        </label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          autoFocus
                          placeholder="First Interview..."
                          value={state.agenda}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_AGENDA",
                              payload: val.target.value,
                            })
                          }
                          className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          name="agenda"
                          label="Agenda"
                        />
                        <label
                          htmlFor="topic"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Topic
                        </label>
                        <TextField
                          required
                          margin="normal"
                          fullWidth
                          placeholder="Oral interview..."
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          value={state.topic}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_TOPIC",
                              payload: val.target.value,
                            })
                          }
                          name="topic"
                          label="Topic"
                        />
                        <label
                          htmlFor="topic"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Duration (in mins)
                        </label>
                        <TextField
                          required
                          margin="normal"
                          type="number"
                          fullWidth
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          value={state.duration}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_DURATION",
                              payload: val.target.value,
                            })
                          }
                          name="duration"
                          label="Duration"
                        />
                        <label
                          htmlFor="password"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        ></label>
                        Password
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          value={state.password}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_PASSWORD",
                              payload: val.target.value,
                            })
                          }
                          name="password"
                          label="Password"
                          type="text"
                        />
                        <label
                          htmlFor="start_date"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Start Date
                        </label>
                        <TextField
                          fullWidth
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          type="datetime-local"
                          margin="normal"
                          value={state.startTime}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_START_TIME",
                              payload: val.target.value,
                            })
                          }
                          variant="outlined"
                          name="start_date"
                        />
                        <label
                          htmlFor="time_zone"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Time Zones
                        </label>
                        <FormControl fullWidth margin="normal">
                          <Autocomplete
                            id="selectedType"
                            options={timeZones}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  required
                                  label="TimeZone"
                                  variant="outlined"
                                  defaultValue={state.timeZone}
                                  onChange={(val) =>
                                    dispatch({
                                      type: "SET_TIME_ZONE",
                                      payload: val.target.value,
                                    })
                                  }
                                  name="time_zone"
                                />
                              </>
                            )}
                          />
                        </FormControl>
                        <Button
                          fullWidth
                          color="info"
                          variant="contained"
                          onClick={async () => {
                            if (
                              JSON.parse(sessionStorage.getItem("company")!)
                                .zoomAccessToken !== null
                            ) {
                              let data = await getRefreshToken();
                              console.log(data);
                            } else {
                              window.open(
                                "https://zoom.us/oauth/authorize?response_type=code&client_id=MdO1TJWIRyvU8kP2Wwcg&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fzoom-success",
                                "_blank",
                              );
                            }
                          }}
                        >
                          Connect Zoom
                        </Button>
                      </Box>
                    ) : state.meetingType === "physical" ? (
                      <Box>
                        <label
                          htmlFor="location"
                          className="block mb-1 mt-3 text-sm font-medium text-gray-900 w-full"
                        >
                          Location
                        </label>
                        <LocationInput />
                        <label
                          htmlFor="street_name"
                          className="block mb-1 mt-3 text-sm font-medium text-gray-900 w-full"
                        >
                          Street Name
                        </label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          defaultValue={state.streetName}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_STREET_NAME",
                              payload: val.target.value,
                            })
                          }
                          name="street_name"
                          label="Street Name"
                        />
                        <label
                          htmlFor="other_details"
                          className="block mb-1 mt-3 text-sm font-medium text-gray-900 w-full"
                        >
                          Other Details
                        </label>
                        <TextField
                          required
                          name="other_details"
                          multiline
                          rows={3}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          placeholder="Any additional helpful information..."
                          defaultValue={state.otherDetails}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_OTHER_DETAILS",
                              payload: val.target.value,
                            })
                          }
                          variant="outlined"
                          fullWidth
                        />
                        <label
                          htmlFor="contact_phone_number"
                          className="block mb-1 mt-3 text-sm font-medium text-gray-900 w-full"
                        >
                          Contact Phone Number
                        </label>
                        <MuiPhoneNumber
                          required
                          variant="outlined"
                          id="phonenumber"
                          label="Secondary Phone Number"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          defaultValue={state.contactPhoneNumber}
                          onChange={(val: any) =>
                            dispatch({
                              type: "SET_CONTACT_PHONE_NUMBER",
                              payload: val,
                            })
                          }
                          name="contact_phone_number"
                          fullWidth
                          defaultCountry={"ug"}
                        />
                        <label
                          htmlFor="contact_email"
                          className="block mb-1 mt-3 text-sm font-medium text-gray-900 w-full"
                        >
                          Contact Email
                        </label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                          defaultValue={state.contactEmail}
                          onChange={(val) =>
                            dispatch({
                              type: "SET_CONTACT_EMAIL",
                              payload: val.target.value,
                            })
                          }
                          name="contact_email"
                          label="Contact Email"
                        />
                      </Box>
                    ) : null
                  ) : null}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep === steps.length - 1 ? (
                      <Button
                        disabled={state.scheduleSend}
                        sx={{ backgroundColor: "#8B0000" }}
                        color="error"
                        variant="contained"
                        onClick={onSubmitHandler}
                      >
                        {state.scheduleSend ? (
                          <CircularProgress
                            thickness={8}
                            size="20px"
                            sx={{ color: "#8B0000" }}
                          />
                        ) : (
                          "Finish"
                        )}
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
