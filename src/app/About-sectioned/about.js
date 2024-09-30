import React from 'react';
import './about.css'; 

const About = () => {
	return (
		<section className="about flex flex-col items-center justify-center gap-8 p-4 h-fit">
			<div className="about-content flex flex-col items-center text-center">
				<h1 className="text-4xl font-bold mb-4">
					Welcome to Hacktoberfest, the annual extravaganza that fuels
					the spirit of open source collaboration! 🚀
				</h1>
				<p className="text-lg mb-4">
					<strong>What is Hacktoberfest?</strong>
					<br />
					Hacktoberfest, presented by DigitalOcean, Appwrite, and ILLA
					Cloud, is a month-long open source celebration. Its aim is
					to inspire students and enthusiasts while fostering
					community, collaboration, and skill-building.
				</p>
				<p className="text-lg mb-4">
					<strong>Why We're Thrilled?</strong>
					<br />
					The "CBIT Hacktoberfest Hackathon" is an exciting 24-hour
					coding challenge within this event. It empowers individuals
					to make meaningful contributions, expand tech knowledge, and
					connect with open source enthusiasts.
				</p>
				<p className="text-lg mb-4">
					<strong>Who Are We?</strong>
					<br />
					We are the Chaitanya Bharathi Institute of Technology Open
					Source Community (COSC) in Hyderabad. Our mission is to
					promote open source values, provide a platform for students
					to explore and contribute to tech, all while crafting
					experiences that nurture a lifelong love for open source.
				</p>
			</div>
		</section>
	);
};

export default About;
