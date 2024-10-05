import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Preptember Video";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function OGImage({ params }) {
	const id = params.id;
	const videoDoc = await getDoc(doc(db, "videos", id));
	if (!videoDoc.exists()) {
		return new ImageResponse(
			(
				<img
					src="/assets/preptember-thumbnail.png"
					alt="404"
					width={size.width}
					height={size.height}
				/>
			),
			{
				...size,
			}
		);
	}
	const video = videoDoc.data();
	const thumbnail = await fetch(video.thumbnailUrl, { mode: "no-cors" });
	const buffer = await thumbnail.arrayBuffer();
	const base64 = Buffer.from(buffer).toString("base64");

	const bgImage = await fetch(
		"https://raw.githubusercontent.com/gjaynir0508/imageholder/refs/heads/main/video-og/bg.png",
		{ mode: "no-cors" }
	);
	const bgBuffer = await bgImage.arrayBuffer();
	const bgBase64 = Buffer.from(bgBuffer).toString("base64");

	const logoImage = await fetch(
		"https://raw.githubusercontent.com/gjaynir0508/imageholder/refs/heads/main/video-og/logo.png",
		{ mode: "no-cors" }
	);
	const logoBuffer = await logoImage.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString("base64");
	const logoSrc = `data:image/png;base64,${logoBase64}`;

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 48,
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					backgroundImage: `url(data:image/png;base64,${bgBase64})`,
				}}
			>
				<img
					src={logoSrc}
					width={800}
					height={128}
					style={{
						position: "absolute",
						top: 72,
						left: 200,
					}}
				/>
				<img
					src={`data:image/png;base64,${base64}`}
					alt={video.title}
					width={900}
					height={472}
					style={{
						position: "absolute",
						width: 900,
						height: 472,
						top: 248,
						left: "50%",
						transform: "translateX(-50%)",
						boxShadow: "0 30px 200px 5px #50DA4C99",
					}}
				/>
			</div>
		),
		{
			...size,
		}
	);
}
