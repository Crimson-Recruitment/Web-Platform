import { ApplicationsModel } from "../Models/ApplicationsModel";
import { JobsModel } from "../Models/JobsModel";

interface Person {
  id: number;
  name: string;
  position: string;
  image: string;
  contactDetails: {
    email: string;
    phone: string;
  };
}

const peopleData: Person[] = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO",
    image: "https://via.placeholder.com/150",
    contactDetails: {
      email: "john.doe@example.com",
      phone: "+1 (123) 456-7890",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    image: "https://via.placeholder.com/150",
    contactDetails: {
      email: "jane.smith@example.com",
      phone: "+1 (987) 654-3210",
    },
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "Lead Developer",
    image: "https://via.placeholder.com/150",
    contactDetails: {
      email: "bob.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    id: 4,
    name: "Alice Brown",
    position: "Designer",
    image: "https://via.placeholder.com/150",
    contactDetails: {
      email: "alice.brown@example.com",
      phone: "+1 (555) 987-6543",
    },
  },
];

const jobs: JobsModel[] = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    jobType: "Full-time",
    locationType: "On-site",
    field: "Technology",
    jobDescription: "This is a software engineering job description.",
    location: "City, Country",
    requirements: ["Bachelor's degree", "Experience with JavaScript"],
    expiryDate: new Date().toISOString(),
    minSalary: 50000,
    maxSalary: 80000,
    hideSalary: false,
    benefits: ["Health insurance", "Flexible work hours"],
    requestCoverLetter: true,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-21T08:30:00",
    companyId: 126,
  },
  {
    id: 2,
    jobTitle: "Data Scientist",
    jobType: "Contract",
    locationType: "Remote",
    field: "Data Science",
    jobDescription: "This is a data scientist job description.",
    location: "Anywhere",
    requirements: ["Master's degree", "Python and machine learning skills"],
    expiryDate: new Date().toISOString(),
    minSalary: 60000,
    maxSalary: 90000,
    hideSalary: true,
    benefits: ["401(k) matching", "Flexible vacation"],
    requestCoverLetter: false,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-22T10:45:00",
    companyId: 123,
  },
  // Add six more job objects here with different values
  {
    id: 3,
    jobTitle: "Graphic Designer",
    jobType: "Part-time",
    locationType: "On-site",
    field: "Design",
    jobDescription: "This is a graphic designer job description.",
    location: "City, Country",
    requirements: ["Bachelor's degree", "Proficiency in Adobe Creative Suite"],
    expiryDate: new Date().toISOString(),
    minSalary: 40000,
    maxSalary: 60000,
    hideSalary: false,
    benefits: ["Health insurance"],
    requestCoverLetter: true,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-23T15:20:00",
    companyId: 126,
  },
  {
    id: 4,
    jobTitle: "Marketing Coordinator",
    jobType: "Full-time",
    locationType: "On-site",
    field: "Marketing",
    jobDescription: "This is a marketing coordinator job description.",
    location: "City, Country",
    requirements: ["Bachelor's degree", "Experience in digital marketing"],
    expiryDate: new Date().toISOString(),
    minSalary: 45000,
    maxSalary: 70000,
    hideSalary: false,
    benefits: ["Health insurance", "Flexible work hours"],
    requestCoverLetter: true,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-25T09:30:00", // Example timestamp value
    companyId: 12,
  },
  {
    id: 5,
    jobTitle: "Customer Support Specialist",
    jobType: "Contract",
    locationType: "Remote",
    field: "Customer Service",
    jobDescription: "This is a customer support specialist job description.",
    location: "Anywhere",
    requirements: [
      "Excellent communication skills",
      "Experience in customer support",
    ],
    expiryDate: new Date().toISOString(),
    minSalary: 38000,
    maxSalary: 55000,
    hideSalary: false,
    benefits: ["Remote work flexibility"],
    requestCoverLetter: false,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-25T11:30:00", // Example timestamp value
    companyId: 120,
  },
  {
    id: 6,
    jobTitle: "Financial Analyst",
    jobType: "Full-time",
    locationType: "On-site",
    field: "Finance",
    jobDescription: "This is a financial analyst job description.",
    location: "City, Country",
    requirements: ["Bachelor's degree in Finance", "Strong analytical skills"],
    expiryDate: new Date().toISOString(),
    minSalary: 60000,
    maxSalary: 90000,
    hideSalary: false,
    benefits: ["401(k) matching", "Health insurance"],
    requestCoverLetter: true,
    otherDetails: "Any other details about the job.",
    timestamp: "2023-11-25T11:45:00", // Example timestamp value
    companyId: 26,
  },
];

const applications: ApplicationsModel[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    jobName: "Software Engineer",
    timeOfApplication: "2023-11-15T08:00:00",
    applicationStatus: "Pending",
    userId: 123,
    resume: "path/to/resume1.pdf",
    coverLetter: "I am writing to express my interest...",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    jobName: "Product Manager",
    timeOfApplication: "2023-11-16T10:30:00",
    applicationStatus: "Accepted",
    userId: 456,
    resume: "path/to/resume2.pdf",
    coverLetter: "I have extensive experience in product management...",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    jobName: "Data Scientist",
    timeOfApplication: "2023-11-17T12:45:00",
    applicationStatus: "Rejected",
    userId: 789,
    resume: "path/to/resume3.pdf",
    coverLetter: "I am skilled in data analysis and machine learning...",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Williams",
    jobName: "UX Designer",
    timeOfApplication: "2023-11-18T15:20:00",
    applicationStatus: "Pending",
    userId: 101,
    resume: "path/to/resume4.pdf",
    coverLetter: "I have a passion for creating user-friendly interfaces...",
  },
  {
    id: 5,
    firstName: "Eva",
    lastName: "Brown",
    jobName: "Marketing Specialist",
    timeOfApplication: "2023-11-19T18:10:00",
    applicationStatus: "Under Review",
    userId: 202,
    resume: "path/to/resume5.pdf",
    coverLetter:
      "I have successfully executed marketing campaigns in the past...",
  },
];

export { jobs, applications, peopleData };
export type { Person };
