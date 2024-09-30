import React from "react";
import { FaLightbulb } from "react-icons/fa6";
import Button from "./button";

const timelineEvents = [
	{
		title: "Preptember",
		description:
			"Preptember is a month-long event that takes place in September to help you prepare for Hacktoberfest.",
		date: "2022-10-01",
		Icon: FaLightbulb,
		followUpButton: <Button />,
	},
	{
		title: "Hacktoberfest",
		description:
			"Hacktoberfest is a month-long celebration of open source software.",
		date: "2022-10-01",
		Icon: FaLightbulb,
	},
];

export default function Timeline() {
	return (
		<div>
			<h1>Timeline</h1>
			<div>
				{timelineEvents.map((event) => (
					<div key={event}></div>
				))}
			</div>
		</div>
	);
}
