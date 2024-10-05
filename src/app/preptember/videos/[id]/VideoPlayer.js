"use client";
import ReactPlayer from "react-player";

function VideoPlayer({ videoUrl }) {
	return (
		<div className="xl:min-w-[600px] relative aspect-video sm:max-md:min-h-[300px]">
			<ReactPlayer
				playsinline
				url={videoUrl}
				width="100%"
				height="100%"
				controls={true}
			/>
		</div>
	);
}

export default VideoPlayer;
