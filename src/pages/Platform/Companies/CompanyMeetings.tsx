import CompanyMeetingCard from '../../../components/Companies/CompanyMeetingCard';
import { getCompanyApplications } from '../../../core/applicationApi';
import React, { useEffect, useState } from 'react';
import {IMeetingInfo} from "../../../Models/MeetingInfoModel";
import { getCompanyMeetings } from '../../../core/meetingsApi';


function CompanyMeetings() {

	const [meetings, setMeetings] = useState<IMeetingInfo[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const list = await getCompanyMeetings();
			console.log(list);
			setMeetings(list);
		}
		fetchData();
	}, []);

	// this is a list of meetings.
	const meetingsMock = [
	  {
	    isOnline: true,
	    agenda: "Coding Interview",
	    topic: "Assessment of Coding Standards and Habits",
	    startTime: Date.now(),
	    endTime: Date.now() + 360000,
	    duration: 360000,
	    applicant: {
	      name: "James Orola",
	    },
	    meetingLink: "www.zoom.com/team-abstergo/interview/14422134",
	    otherDetails: "Lorem ipsume dolor et ism main if not mein per lores maximina eft met mein developpa asdd cma aaai ajsby ajsd abxhsax "
	  },
	  {
	    isOnline: false,
	    agenda: "Project Planning",
	    topic: "Discussion on Project Milestones",
	    startTime: Date.now() + 86400000,
	    endTime: Date.now() + 86400000 + 7200000,
	    duration: 7200000,
	    applicant: {
	      name: "Alice Johnson",
	    },
	    meetingLocation: "Conference Room 301",
	    otherDetails: "Lorem ipsume dolor et ism main if not mein per lores maximina eft met mein developpa asdd cma aaai ajsby ajsd abxhsax "
	  },
	  {
	    isOnline: true,
	    agenda: "Team Standup",
	    topic: "Updates and Roadblocks",
	    startTime: Date.now() + 172800000,
	    endTime: Date.now() + 172800000 + 1800000,
	    duration: 1800000,
	    applicant: {
	      name: "John Smith",
	    },
	    meetingLink: "www.zoom.com/team-standup",
	    otherDetails: "Lorem ipsume dolor et ism main if not mein per lores maximina eft met mein developpa asdd cma aaai ajsby ajsd abxhsax "
	  },
	  {
	    isOnline: false,
	    agenda: "Client Meeting",
	    topic: "Project Requirements and Expectations",
	    startTime: Date.now() + 259200000,
	    endTime: Date.now() + 259200000 + 3600000,
	    duration: 3600000,
	    applicant: {
	      name: "Emily Davis",
	    },
	    meetingLocation: "Client Office",
	    otherDetails: "Lorem ipsume dolor et ism main if not mein per lores maximina eft met mein developpa asdd cma aaai ajsby ajsd abxhsax "
	  },
	  {
	    isOnline: true,
	    agenda: "Tech Workshop",
	    topic: "Introduction to React Hooks",
	    startTime: Date.now() + 345600000,
	    endTime: Date.now() + 345600000 + 5400000,
	    duration: 5400000,
	    applicant: {
	      name: "Michael Chen",	      
	    },
	    meetingLink: "www.code-masters.com/workshop",
	    otherDetails: "Lorem ipsume dolor et ism main if not mein per lores maximina eft met mein developpa asdd cma aaai ajsby ajsd abxhsax "
	  },
	];

	return (
		<div className="flex flex-col">
			<div className="flex flex-row p-3 items-center gap-4">
				<span className="text-xl font-bold">Meetings</span>
			</div>
			<div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
				{ meetingsMock.map((meeting, index) => {
					return (
						<CompanyMeetingCard meeting={meeting} key={index} />

					);
				})}
			
			</div>
		</div>
	);
}


export default CompanyMeetings;