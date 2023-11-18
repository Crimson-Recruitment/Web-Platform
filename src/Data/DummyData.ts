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
    timestamp: new Date("2023-11-10T08:00:00Z"), // Set a specific date and time
    jobField: "Information Technology",
    jobTitle: "Software Developer",
    jobDescription: "Exciting job description for a software developer...",
    companyOverview: ["Innovative tech company", "Great work culture"],
    requirements: [
      "Bachelor's degree in Computer Science",
      "2+ years of experience",
    ],
    skills: ["JavaScript", "React", "Node.js"],
    minSalary: "50000",
    maxSalary: "80000",
    location: "San Francisco, CA",
    jobType: "Full-time",
    hideSalary: false,
    benefits: ["Health insurance", "Flexible work hours"],
    companyId: 123,
    requestCoverLetter: true,
    otherDetails: "Additional details about the job...",
  },
  {
    id: 2,
    timestamp: new Date("2023-11-11T10:30:00Z"),
    jobField: "Marketing",
    jobTitle: "Digital Marketing Specialist",
    jobDescription:
      "Exciting opportunity for a digital marketing specialist...",
    companyOverview: [
      "Leading marketing agency",
      "Collaborative team environment",
    ],
    requirements: [
      "Bachelor's degree in Marketing",
      "3+ years of digital marketing experience",
    ],
    skills: ["SEO", "Social Media Marketing", "Google Analytics"],
    minSalary: "55000",
    maxSalary: "75000",
    location: "New York, NY",
    jobType: "Contract",
    hideSalary: false,
    benefits: ["401(k) matching", "Paid time off"],
    companyId: 456,
    requestCoverLetter: true,
    otherDetails: "Additional details about the job...",
  },
  {
    id: 3,
    timestamp: new Date("2023-11-12T12:45:00Z"),
    jobField: "Finance",
    jobTitle: "Financial Analyst",
    jobDescription: "Exciting opportunity for a financial analyst...",
    companyOverview: [
      "Global financial institution",
      "Diverse and inclusive workplace",
    ],
    requirements: ["Bachelor's degree in Finance", "CFA or CPA certification"],
    skills: ["Financial modeling", "Data analysis", "Excel"],
    minSalary: "60000",
    maxSalary: "90000",
    location: "Chicago, IL",
    jobType: "Full-time",
    hideSalary: false,
    benefits: ["Health and dental insurance", "Tuition reimbursement"],
    companyId: 789,
    requestCoverLetter: false,
    otherDetails: "Additional details about the job...",
  },
  {
    id: 4,
    timestamp: new Date("2023-11-13T14:15:00Z"),
    jobField: "Human Resources",
    jobTitle: "HR Specialist",
    jobDescription: "Exciting opportunity for an HR specialist...",
    companyOverview: [
      "Fast-growing tech startup",
      "Dynamic and inclusive culture",
    ],
    requirements: [
      "Bachelor's degree in Human Resources",
      "2+ years of HR experience",
    ],
    skills: ["Recruitment", "Employee relations", "HRIS"],
    minSalary: "50000",
    maxSalary: "70000",
    location: "Austin, TX",
    jobType: "Part-time",
    hideSalary: true,
    benefits: ["Stock options", "Remote work options"],
    companyId: 101,
    requestCoverLetter: true,
    otherDetails: "Additional details about the job...",
  },
  {
    id: 5,
    timestamp: new Date("2023-11-14T16:45:00Z"),
    jobField: "Engineering",
    jobTitle: "Mechanical Engineer",
    jobDescription: "Exciting opportunity for a mechanical engineer...",
    companyOverview: ["Innovative engineering firm", "Cutting-edge projects"],
    requirements: [
      "Bachelor's degree in Mechanical Engineering",
      "5+ years of engineering experience",
    ],
    skills: ["CAD", "Finite Element Analysis", "Product design"],
    minSalary: "70000",
    maxSalary: "100000",
    location: "Los Angeles, CA",
    jobType: "Full-time",
    hideSalary: false,
    benefits: ["Flexible work schedule", "Health and wellness programs"],
    companyId: 202,
    requestCoverLetter: false,
    otherDetails: "Additional details about the job...",
  },
  {
    id: 6,
    timestamp: new Date("2023-11-15T18:30:00Z"),
    jobField: "Healthcare",
    jobTitle: "Registered Nurse",
    jobDescription: "Exciting opportunity for a registered nurse...",
    companyOverview: [
      "Leading healthcare provider",
      "Committed to patient care",
    ],
    requirements: ["Bachelor's degree in Nursing", "RN license"],
    skills: ["Patient care", "Critical thinking", "Communication"],
    minSalary: "60000",
    maxSalary: "80000",
    location: "Miami, FL",
    jobType: "Full-time",
    hideSalary: false,
    benefits: ["Medical and dental insurance", "Retirement savings plan"],
    companyId: 303,
    requestCoverLetter: true,
    otherDetails: "Additional details about the job...",
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
