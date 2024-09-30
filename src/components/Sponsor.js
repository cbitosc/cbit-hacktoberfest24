// components/Sponser.js
import Image from "next/image";
import React from "react";

const Sponsor = () => {
	return (
		<section className="px-4 w-full flex flex-col lg:flex-row justify-between items-center">
			<aside className="w-full text-center">
				<h1>
					<span className="text-6xl lg:text-5xl xl:text-6xl mb-5 text-black">
						Our Title Sponser
					</span>
					<br />
					<br />
					<a
						href="https://google.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center"
					>
						<Image
							src="/assets/google.png"
							alt="Google"
							className="text-6xl lg:text-5xl xl:text-4xl mb-5"
							width={200}
							height={100}
						/>
					</a>
				</h1>
			</aside>
			<aside className="w-full text-center">
				<h1>
					<span className="text-6xl lg:text-5xl xl:text-6xl mb-5 text-black">
						Our Co Sponser
					</span>
					<br />
					<br />
					<a
						href="https://google.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center"
					>
						<Image
							src="/assets/google.png"
							alt="Google"
							className="text-6xl lg:text-5xl xl:text-4xl mb-5"
							width={100}
							height={50}
						/>
					</a>
				</h1>
			</aside>
		</section>
	);
};

export default Sponsor;
