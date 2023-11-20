export const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "hospitality", label: "Hospitality" },
  { value: "entertainment", label: "Entertainment" },
  { value: "automotive", label: "Automotive" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "energy", label: "Energy" },
  { value: "media", label: "Media" },
  { value: "consulting", label: "Consulting" },
  { value: "real_estate", label: "Real Estate" },
  { value: "transportation", label: "Transportation" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "fashion", label: "Fashion" },
  { value: "food_and_beverage", label: "Food and Beverage" },
  { value: "marketing", label: "Marketing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
  { value: "environmental", label: "Environmental" },
  { value: "government", label: "Government" },
  { value: "insurance", label: "Insurance" },
  { value: "recruitment", label: "Recruitment" },
  { value: "sports", label: "Sports" },
  { value: "art_and_design", label: "Art and Design" },
  { value: "construction", label: "Construction" },
  { value: "legal", label: "Legal" },
  { value: "architecture", label: "Architecture" },
];

export const jobType = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "volunteering", label: "Volunteering" },
];



interface IndustryProfessions {
  Technology: string[];
  Healthcare: string[];
  Finance: string[];
  Education: string[];
  Marketing: string[];
  Construction: string[];
  Entertainment: string[];
  Hospitality: string[];
  Transportation: string[];
  Retail: string[];
  [key: string]: string[]; // Index signature allowing any string key
}

export const industryProfessions:IndustryProfessions = {
  Technology: [
    "Software Developer",
    "Software Engineer",
    "Blockchain Engineer",
    "Web Developer",
    "Data Analyst",
    "Network Administrator",
    "Database Administrator",
    "IT Project Manager",
    "UX/UI Designer",
    "Systems Analyst",
  ],
  Healthcare: [
    "Nurse",
    "Doctor",
    "Pharmacist",
    "Medical Technician",
    "Physician Assistant",
    "Radiologist",
    "Physical Therapist",
    "Public Health Officer",
    "Occupational Therapist",
  ],
  Finance: [
    "Accountant",
    "Financial Analyst",
    "Investment Banker",
    "Actuary",
    "Tax Consultant",
    "Financial Planner",
    "Risk Manager",
    "Auditor",
  ],
  Education: [
    "Teacher",
    "Professor",
    "Librarian",
    "Guidance Counselor",
    "Special Education Teacher",
    "School Administrator",
    "Curriculum Developer",
    "Education Consultant",
  ],
  Marketing: [
    "Marketing Manager",
    "Digital Marketer",
    "Public Relations Specialist",
    "Market Researcher",
    "Social Media Manager",
    "Brand Manager",
    "Advertising Executive",
    "Content Strategist",
  ],
  Construction: [
    "Architect",
    "Civil Engineer",
    "Electrician",
    "Plumber",
    "Contractor",
    "Construction Manager",
    "Structural Engineer",
    "Building Inspector",
  ],
  Entertainment: [
    "Actor",
    "Musician",
    "Director",
    "Cinematographer",
    "Makeup Artist",
    "Costume Designer",
    "Sound Engineer",
    "Casting Director",
  ],
  Hospitality: [
    "Chef",
    "Bartender",
    "Hotel Manager",
    "Concierge",
    "Event Planner",
    "Sommelier",
    "Restaurant Manager",
    "Catering Coordinator",
  ],
  Transportation: [
    "Pilot",
    "Truck Driver",
    "Flight Attendant",
    "Air Traffic Controller",
    "Ship Captain",
    "Freight Broker",
    "Dispatcher",
    "Logistics Manager",
  ],
  Retail: [
    "Sales Associate",
    "Store Manager",
    "Visual Merchandiser",
    "Buyer",
    "Customer Service Representative",
    "Inventory Planner",
    "Loss Prevention Specialist",
    "Retail Operations Manager",
  ],
};
