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

  return (
    <div className="flex flex-col gap-3 p-3">
      <span className="text-xl font-bold">Your Meetings</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {/* Iterate over meetings and display them. If not, show the message */}
        {meetings.length === 0 ? (
          <span className="text-lg text-gray-400">
            No meetings are currently scheduled.
          </span>
        ) : (
          meetings.map((meeting, index) => (
            <MeetingCard meeting={meeting} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default Meetings;
