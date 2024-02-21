import { useEffect, useState } from "react";
import { IMeetingInfo } from "../../../Models/MeetingInfoModel";
import CompanyMeetingCard from "../../../components/Companies/CompanyMeetingCard";
import { getCompanyMeetings } from "../../../core/meetingsApi";

function CompanyMeetings() {
  const [meetings, setMeetings] = useState<IMeetingInfo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const list = await getCompanyMeetings();
      console.log(list);
      setMeetings(list);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-3 items-center gap-4">
        <span className="text-xl font-bold">Meetings</span>
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {meetings.map((meeting, index) => {
          return <CompanyMeetingCard meeting={meeting} key={index} />;
        })}
      </div>
    </div>
  );
}

export default CompanyMeetings;
