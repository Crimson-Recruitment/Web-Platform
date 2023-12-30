const initScheduleState = {
  streetName: null,
  otherDetails: null,
  contactPhoneNumber: null,
  contactEmail: null,
  meetingType: null,
  scheduleSend: false,
  duration: null,
  agenda: null,
  topic: null,
  password: null,
  startTime: null,
  timeZone: null,
};

export const meetingScheduleReducer = (
  state = initScheduleState,
  action: any,
) => {
  switch (action.type) {
    case "SET_SCHEDULE_SEND":
      return { ...state, scheduleSend: action.payload };
    case "SET_STREET_NAME":
      return { ...state, streetName: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_OTHER_DETAILS":
      return { ...state, otherDetails: action.payload };
    case "SET_CONTACT_PHONE_NUMBER":
      return { ...state, contactPhoneNumber: action.payload };
    case "SET_CONTACT_EMAIL":
      return { ...state, contactEmail: action.payload };
    case "SET_MEETING_TYPE":
      return { ...state, meetingType: action.payload };
    case "SET_AGENDA":
      return { ...state, agenda: action.payload };
    case "SET_TOPIC":
      return { ...state, topic: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_START_TIME":
      return { ...state, startTime: action.payload };
    case "SET_TIME_ZONE":
      return { ...state, timeZone: action.payload };
    default:
      return state;
  }
};
