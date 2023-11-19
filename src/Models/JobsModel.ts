export interface JobsModel {
  id?: number;
  jobTitle: string;
  jobType: string;
  locationType: string;
  field: string;
  jobDescription: string;
  location: string;
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
