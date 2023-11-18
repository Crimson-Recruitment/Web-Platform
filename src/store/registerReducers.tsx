const userInitState = {
  location: "",
  profession: "",
  skills: [],
  resume: null,
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
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
