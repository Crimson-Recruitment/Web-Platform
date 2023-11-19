const userInitState = {
  location: "",
  profession: "",
  skills: [],
  cv: null,
  phoneNumber: "",
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
      return { ...state, cv: action.payload };
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
  category: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
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
      return { ...state, category: action.payload };
    case "SET_LOGO":
      return { ...state, logo: action.payload };
    case "SET_PRIMARY_PHONENUMBER":
      return { ...state, primaryPhoneNumber: action.payload };
    case "SET_SECONDARY_PHONENUMBER":
      return { ...state, secondaryPhoneNumber: action.payload };
    default:
      return state;
  }
};
