export class JobsModel {
  id!:number;
  timestamp!: Date;
  jobField!: string;
  jobTitle!: string;
  jobDescription!: string;
  companyOverview!: string[];
  requirements!: string[];
  skills!: string[];
  minSalary!: string;
  maxSalary!: string;
  location!: string;
  jobType!: string;
  hideSalary!: boolean;
  benefits!: string[];
  companyId!: number;
  requestCoverLetter!: boolean;
  otherDetails!: string;

}