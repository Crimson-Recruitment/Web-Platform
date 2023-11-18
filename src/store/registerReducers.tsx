const userInitState = {
  location: "",
  profession: "",
  skills: [],
  resume: null,
  phoneNumber:"",
  profileImage: null,
};

export const userRegisterReducer = (
  state: any = userInitState,
  action: any,
) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return { ...state, location: action.payload };
    case "SET_PROFESSION":
      return { ...state, profession: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_RESUME":
      return { ...state, resume: action.payload };
    case "SET_PROFILE_IMAGE":
      return { ...state, profileImage: action.payload };
    case "SET_PHONENUMBER":
      return { ...state, phoneNumber: action.payload };
    default:
      return state;
  }
};

const companyInitState = {
  location: "",
  companyType: "",
  logo: null,
};

export const companyRegisterReducer = (
  state: any = companyInitState,
  action: any,
) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return { ...state, location: action.payload };
    case "SET_COMPANY_TYPE":
      return { ...state, companyType: action.payload };
    case "SET_LOGO":
      return { ...state, logo: action.payload };
    default:
      return state;
  }
};
