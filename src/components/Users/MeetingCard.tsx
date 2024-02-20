import React, { useState } from 'react';


interface MeetingRecruiter {
	name: string;
	company: string;
	phone: string;
	email: string;
}

interface MeetingCardOptions {
	isOnline: boolean;
	agenda: string;
	topic:string;
	startTime: number;
	endTime: number;
	duration: number;
	recruiter: MeetingRecruiter;
	meetingLink?: string;
	meetingLocation?: string;
}

interface MeetingCardProps {
	meeting: MeetingCardOptions
}

const MeetingCard : React.FC<MeetingCardProps> = ({ meeting }) => {
	const [readMore, setReadMore] = useState(false);

	const toggleReadMore = () => {
		setReadMore(!readMore);
	}

	return (
		<div className="flex flex-col rounded-xl border border-gray-200 shadow p-1 w-full">
			<div className="flex flex-row p-3 items-center">
				<span className="text-xl font-bold">{ meeting.agenda }</span>
				{ meeting.isOnline ?
					<div className="ml-auto bg-blue-500/30 text-blue-500 font-semibold p-1 px-2 rounded-lg text-xs">
						<span>ONLINE</span>
					</div>
					:
					<div className="ml-auto bg-orange-500/30 text-orange-500 font-semibold p-1 px-2 rounded-lg text-xs">
						<span>PHYSICAL</span>
					</div>

				 }
			</div>
			<div className="flex flex-col p-3 text-gray-500 border-t">
				<span className="font-bold">{ meeting.topic }</span>
				<span>8:00AM - 8:30AM</span>
			</div>
			<div className="flex flex-row p-3 gap-2 items-center border-t">
				<div className="w-12 aspect-square bg-red-500 rounded-full"></div>
				<div className="flex flex-col w-full">
					<span className="font-bold text-gray-600">{ meeting.recruiter.name }</span>
					<span className="text-xs text-gray-400 font-semibold">{ meeting.recruiter.company }</span>
				</div>
				<div className="flex flex-row gap-1 items-center ml-auto">
					<button className="text-black">
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					</button>
					<button className="text-black">
						<svg fill="currentColor" height="24px" width="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8 2.5a1.22 1.22 0 0 1 1.25 1.17A1.21 1.21 0 0 1 8 4.84a1.21 1.21 0 0 1-1.25-1.17A1.22 1.22 0 0 1 8 2.5zm0 8.66a1.17 1.17 0 1 1-1.25 1.17A1.21 1.21 0 0 1 8 11.16zm0-4.33a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 1 1 0-2.34z"></path></g></svg>				
					</button>
				</div>
			</div>
			{
				meeting.isOnline ?
					<div className="flex flex-col p-3 border-t">
						<div className="flex flex-row gap-2 items-center">
							<svg viewBox="0 0 24 24" height="24px" width="24px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
							<span className="text-blue-500 underline text-sm">{ meeting.meetingLink }</span>
						</div>
					</div>
					:
					<div className="flex flex-col p-3 border-t">
						<div className="flex flex-row gap-2 items-center">
							<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
							<span className="text-blue-500 underline text-sm">{ meeting.meetingLocation }</span>
						</div>
					</div>
			}
			<div className="flex flex-col p-3 border-t">
				<span className="font-bold">Other Details</span>
				<div className={ readMore ? "flex flex-col h-12 overflow-y-hidden" : "flex flex-col h-full overflow-y-hidden" }>
					<span className="text-xs text-gray-500">Lorem ipsum dolore et is ipmnum colores fit men denit ut mis. Frixa tol modo est fit meein de fitir most alphway</span>
				</div>
				<button onClick={toggleReadMore} className="text-blue-700 font-bold text-sm w-fit p-0">Read More</button>
			</div>
		</div>
	);
}

export default MeetingCard;