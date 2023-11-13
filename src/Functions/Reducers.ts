export const companyDetailsReducer = (
  state: any,
  action: {
    type?: any;
    selectedType?: any;
    loading?: any;
    image?: any;
    imagePath?: any;
    license?: any;
  },
) => {
  switch (action.type) {
    case "SETSELECTEDTYPE":
      return { ...state, selectedType: action?.selectedType };
    case "SETLOADING":
      return { ...state, loading: action?.loading };
    case "SETIMAGE":
      return { ...state, image: action?.image };
    case "SETIMAGEPATH":
      return { ...state, imagePath: action?.imagePath };
    case "SETLICENSE":
      return { ...state, license: action?.license };
    default:
      return state;
  }
};

export const updateCompanyProfileReducer = (
  state: any,
  action: {
    type: any;
    selectedType: any;
    loading: any;
    image: any;
    imagePath: any;
    license: any;
  },
) => {
  switch (action.type) {
    case "SETSELECTEDTYPE":
      return { ...state, selectedType: action.selectedType };
    case "SETLOADING":
      return { ...state, loading: action.loading };
    case "SETIMAGE":
      return { ...state, image: action.image };
    case "SETIMAGEPATH":
      return { ...state, imagePath: action.imagePath };
    case "SETLICENSE":
      return { ...state, license: action.license };
    default:
      return state;
  }
};

export const companyJobsReducer = (
  state: any,
  action: {
    type?: any;
    value?: any;
    requirements?: any;
    benefits?: any;
    loading?: any;
    selectedSkills?: any;
    selectedType?: any;
    jobsList?: any;
    open?: any;
    message?: any;
    jobType?: any;
    jobLocationType?: any;
  },
) => {
  switch (action.type) {
    case "SETVALUE":
      return { ...state, value: action.value };
    case "SETREQUIREMENTS":
      return { ...state, requirements: action.requirements };
    case "SETBENEFITS":
      return { ...state, benefits: action.benefits };
    case "SETLOADING":
      return { ...state, loading: action.loading };
    case "SETSELECTEDSKILLS":
      return { ...state, selectedSkills: action.selectedSkills };
    case "SETSELECTEDTYPE":
      return { ...state, selectedType: action.selectedType };
    case "SETJOBSLIST":
      return { ...state, jobsList: action.jobsList };
    case "SETOPEN":
      return { ...state, open: action.open };
    case "SETMESSAGE":
      return { ...state, message: action.message };
    case "SETJOBTYPE":
      return { ...state, jobType: action.jobType };
    case "SETJOBLOCATIONTYPE":
      return { ...state, jobLocationType: action.jobLocationType };
    default:
      return state;
  }
};

export const skillsReducer = (
  state: any,
  action: {
    type: any;
    loading: any;
    selectedProfession: any;
    jobsList: any;
    image: any;
    imagePath: any;
    resume: any;
  },
) => {
  switch (action.type) {
    case "SETLOADING":
      return { ...state, loading: action.loading };
    case "SETSELECTEDSKILLS":
      return { ...state, selectedSkills: action.loading };
    case "SETSELECTEDPROFESSION":
      return { ...state, selectedProfession: action.selectedProfession };
    case "SETJOBSLIST":
      return { ...state, jobsList: action.jobsList };
    case "SETIMAGE":
      return { ...state, image: action.image };
    case "SETIMAGEPATH":
      return { ...state, imagePath: action.imagePath };
    case "SETRESUME":
      return { ...state, resume: action.resume };
    default:
      return state;
  }
};

export const updateUserProfileReducer = (
  state: any,
  action: {
    type: any;
    loading: any;
    selectedProfession: any;
    jobsList: any;
    image: any;
    imagePath: any;
    resume: any;
  },
) => {
  switch (action.type) {
    case "SETLOADING":
      return { ...state, loading: action.loading };
    case "SETSELECTEDSKILLS":
      return { ...state, selectedSkills: action.loading };
    case "SETSELECTEDPROFESSION":
      return { ...state, selectedProfession: action.selectedProfession };
    case "SETJOBSLIST":
      return { ...state, jobsList: action.jobsList };
    case "SETIMAGE":
      return { ...state, image: action.image };
    case "SETIMAGEPATH":
      return { ...state, imagePath: action.imagePath };
    case "SETRESUME":
      return { ...state, resume: action.resume };
    default:
      return state;
  }
};
