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

export { applications, peopleData };
export type { Person };
