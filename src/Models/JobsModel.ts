import { CompanyModel } from "./companyModel";

export interface JobsModel {
  id?: number;
  jobTitle: string;
  jobType: string;
  locationType: string;
  companyName: string;
  companyOverview: string;
  otherSite?: string;
  field: string;
  jobDescription: string;
  location: string;
  company?: CompanyModel;
  requirements: string[];
  expiryDate: string;
  minSalary: number; // Assuming nullable salary values
  maxSalary: number; // Assuming nullable salary values
  hideSalary: boolean;
  benefits: string[];
  requestCoverLetter: boolean;
  otherDetails: string;
  timestamp: string;
  companyId?: number;
  skills?: string[];
}
