import { userModel } from "./UserModel";
import { CompanyModel } from "./companyModel";

export interface IEmployee {
    id: number;
    dateOfBirth: string;
    gender: string;
    address: string;
    position: string;
    department: string;
    startDate: string;
    criminalRecord: string;
    medicalReport: string;
    nationalIdFront: string;
    nationalIdBack: string;
    passport: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    nextOfKinAddress: string;
    user: userModel;
    company: CompanyModel;
  }