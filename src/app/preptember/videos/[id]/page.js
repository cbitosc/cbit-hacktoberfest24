import { doc, getDoc } from "firebase/firestore";
import VideoDetailPage from "./VideoDetailPage";
import { db } from "@/app/firebase";

export async function generateMetadata({ params }) {
	const video = await getDoc(doc(db, "videos", params.id));
	if (!video) {
		return {
			title: "Preptember Video",
			description: "A video from Preptember Series",
		};
	}
	const data = video.data();

	return {
		title: `${data.title} | Preptember COSC | CBIT Hacktoberfest 2024`,
		description: `Preptember is your ultimate prep guide for Hacktoberfest 2024. ${new String(
			data.description
		)
			.replace(/[#*\[\]\(\)]/g, "")
			.substring(0, 150)}`,
	};
}

export default function Page({ params }) {
	return <VideoDetailPage params={params} />;
}
