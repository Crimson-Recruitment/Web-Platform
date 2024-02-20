import * as React from "react";
import MeetingCard from "../../../components/Users/MeetingCard";
import { getUserMeetings } from "../../../core/meetingsApi";
import { IMeetingInfo } from "../../../Models/MeetingInfoModel";

function Meetings() {
  const [meetings, setMeetings] = React.useState<IMeetingInfo[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const list = await getUserMeetings();
      console.log(list);
      setMeetings(list);
    };
    fetchData();
  }, []);
  const meetingsMock = [
    {
      isOnline: true,
      agenda: "Coding Interview",
      topic: "Assessment of Coding Standards and Habits",
      startTime: Date.now(),
      endTime: Date.now() + 360000,
      duration: 360000,
      recruiter: {
        name: "James Orola",
        company: "Abstergo Entertainment",
        phone: "+256 708394481",
        email: "jamesorola@abstergo.com",
      },
      meetingLink: "www.zoom.com/team-abstergo/interview/14422134",
    },
    {
      isOnline: false,
      agenda: "Project Planning",
      topic: "Discussion on Project Milestones",
      startTime: Date.now() + 86400000,
      endTime: Date.now() + 86400000 + 7200000,
      duration: 7200000,
      recruiter: {
        name: "Alice Johnson",
        company: "Tech Innovators",
        phone: "+1 1234567890",
        email: "alice@techinnovators.com",
      },
      meetingLocation: "Conference Room 301",
    },
    {
      isOnline: true,
      agenda: "Team Standup",
      topic: "Updates and Roadblocks",
      startTime: Date.now() + 172800000,
      endTime: Date.now() + 172800000 + 1800000,
      duration: 1800000,
      recruiter: {
        name: "John Smith",
        company: "CodeCrafters",
        phone: "+44 20 1234 5678",
        email: "john@codecrafters.com",
      },
      meetingLink: "www.zoom.com/team-standup",
    },
    {
      isOnline: false,
      agenda: "Client Meeting",
      topic: "Project Requirements and Expectations",
      startTime: Date.now() + 259200000,
      endTime: Date.now() + 259200000 + 3600000,
      duration: 3600000,
      recruiter: {
        name: "Emily Davis",
        company: "Innovate Solutions",
        phone: "+61 2 9876 5432",
        email: "emily@innovatesolutions.com",
      },
      meetingLocation: "Client Office",
    },
    {
      isOnline: true,
      agenda: "Tech Workshop",
      topic: "Introduction to React Hooks",
      startTime: Date.now() + 345600000,
      endTime: Date.now() + 345600000 + 5400000,
      duration: 5400000,
      recruiter: {
        name: "Michael Chen",
        company: "Code Masters",
        phone: "+86 10 8765 4321",
        email: "michael@codemasters.com",
      },
      meetingLink: "www.code-masters.com/workshop",
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <span className="text-xl font-bold">Your Meetings</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {/* Iterate over meetings and display them. If not, show the message */}
        {meetingsMock.length === 0 ? (
          <span className="text-lg text-gray-400">
            No meetings are currently scheduled.
          </span>
        ) : (
          meetingsMock.map((meeting, index) => (
            <MeetingCard meeting={meeting} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default Meetings;
