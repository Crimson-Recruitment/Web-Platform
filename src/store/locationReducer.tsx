const initState = {
  location: "",
};

export const locationReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return { ...state, location: action.payload };
    default:
      return state;
  }
};
