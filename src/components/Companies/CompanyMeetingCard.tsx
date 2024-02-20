import React, { useState } from "react";

interface CompanyMeetingCardProps {
  meeting: CompanyMeetingCardOptions; // TODO: replace with an object
}

interface CompanyMeetingCardOptions {
  id?: string;
  isOnline: boolean;
  agenda: string;
  topic: string;
  startTime: number;
  endTime: number;
  duration: number;
  applicant: CompanyMeetingApplicant;
  meetingLink?: string;
  meetingLocation?: string;
  otherDetails: string;
}

interface CompanyMeetingApplicant {
  id?: string;
  name: string;
}

const MeetingMenu = () => {
  // meeting options
  // edit
  const onEditMeetingButtonClicked = () => {};

  //reschedule
  const onRescheduleMeetingButtonClicked = () => {};

  return (
    <div className="bg-white border py-3 rounded absolute top-[100%] right-[50%] flex flex-col text-gray-500">
      <button
        onClick={onEditMeetingButtonClicked}
        className="flex flex-row  hover:bg-gray-100 text-gray-500 px-3"
      >
        Edit
      </button>
      <button
        onClick={onRescheduleMeetingButtonClicked}
        className="flex flex-row  hover:bg-gray-100 text-gray-500 px-3"
      >
        Reschedule
      </button>
    </div>
  );
};

const CompanyMeetingCard: React.FC<CompanyMeetingCardProps> = ({ meeting }) => {
  const [meetingMenuVisible, setMeetingMenuVisible] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const toggleMeetingMenuVisible = () => {
    setMeetingMenuVisible(!meetingMenuVisible);
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  // view application button clicked
  const onViewApplicationButtonClicked = () => {};

  // cancel meeting button clicked
  const onCancelMeetingButtonClicked = () => {};

  // meeting link clicked
  const onMeetingLinkClicked = () => {};

  //meeting location clicked
  const onMeetingLocationClicked = () => {};

  return (
    <div className="flex flex-col border shadow rounded-lg p-2">
      <div className="flex flex-row p-3 items-center gap-2">
        <span className="text-lg font-bold">{meeting.agenda}</span>
        <div className="flex flex-row gap-2 ml-auto items-center">
          {meeting.isOnline ? (
            <div className="px-4 py-2 bg-blue-500/20 text-blue-500 rounded-lg text-sm">
              <span>Online</span>
            </div>
          ) : (
            <div className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-lg text-sm">
              <span>Physical</span>
            </div>
          )}
          <button
            onClick={toggleMeetingMenuVisible}
            className="bg-gray-200 aspect-square grid place-items-center rounded-full relative"
          >
            <i className="pi pi-ellipsis-v text-gray-500"></i>
            {meetingMenuVisible ? <MeetingMenu /> : <div></div>}
          </button>
        </div>
      </div>
      <div className="flex flex-col p-3 text-gray-500 border-t">
        <span className="font-bold">{meeting.topic}</span>
        <div className="flex flex-row gap-2 items-center">
          <span className="font-semibold text-sm">12-03-2024</span>
          <span className="text-sm">8:00AM - 8:30AM</span>
        </div>
      </div>
      <div className="flex flex-row p-3 gap-2 items-center border-t">
        <div className="aspect-square bg-red-500 rounded-full w-12"></div>
        <div className="flex flex-col">
          <span>{meeting.applicant.name}</span>
        </div>
        <div className="flex flex-row items-center ml-auto">
          <button className="text-gray-500">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="1"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button className="text-gray-500">
            <i className="pi pi-ellipsis-v"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col p-3 border-t">
        {meeting.isOnline ? (
          <div className="flex flex-row gap-2 items-center">
            <i className="pi pi-link text-gray-500"></i>
            <button
              onClick={onMeetingLinkClicked}
              className="text-blue-500 underline text-sm"
            >
              {meeting.meetingLink}
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <i className="pi pi-map-marker text-gray-500"></i>
            <button
              onClick={onMeetingLocationClicked}
              className="text-blue-500 underline text-sm"
            >
              {meeting.meetingLocation}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col border-t p-3">
        <div className="flex flex-row items-center">
          <span>Other Details</span>
        </div>
        <div className="flex flex-col text-sm">
          <div
            className={
              readMore
                ? "flex flex-col h-full overflow-hidden"
                : "flex flex-col h-12 overflow-hidden"
            }
          >
            <span className="text-xs text-gray-400">
              {meeting.otherDetails}
            </span>
          </div>
          <button
            onClick={toggleReadMore}
            className="text-blue-700 font-bold text-sm w-fit p-0 focus:outline-none"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex flex-row p-3 gap-2 items-center border-t">
        <button className="flex flex-row justify-between gap-2 items-center p-2 text-sm text-red-500 bg-red-500/30 rounded-lg w-full">
          Cancel Meeting
          <i className="pi pi-times"></i>
        </button>
        <button className="flex flex-row justify-between gap-2 items-center p-2 text-sm text-blue-500 bg-blue-500/30 rounded-lg w-full">
          View Application
          <i className="pi pi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CompanyMeetingCard;
