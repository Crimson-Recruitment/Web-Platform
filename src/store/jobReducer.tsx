const createJobInitialState = {
  requirements: [],
  benefits: [],
  loading: false,
  selectedSkills: null,
  jobsList: [],
  open: false,
  hideSalary: false,
  requestCoverLetter: false,
  value: 0,
  message: { type: null, message: null },
};

export const createJobReducer = (
  state = createJobInitialState,
  action: any,
) => {
  switch (action.type) {
    case "SET_SELECTED_SKILLS":
      return { ...state, selectedSkills: action.payload };

    case "SET_REQUIREMENTS":
      return { ...state, requirements: action.payload };

    case "SET_BENEFITS":
      return { ...state, benefits: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_OPEN":
      return { ...state, open: action.payload };

    case "SET_VALUE":
      return { ...state, value: action.payload };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_JOBLIST":
      return { ...state, jobsList: action.payload };
    case "SET_HIDE_SALARY":
      return { ...state, hideSalary: !state.hideSalary };
    case "SET_REQUEST_COVER_LETTER":
      return { ...state, requestCoverLetter: !state.requestCoverLetter };

    default:
      return state;
  }
};
