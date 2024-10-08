import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export default async function sitemap() {
	const URL_BASE =
		process.env.NEXT_PUBLIC_SITE_URL ||
		"https://cbit-hacktoberfest24.vercel.app";
	const url = (path) => new URL(path, URL_BASE).href;
	let videos = [];
	try {
		const querySnapshot = await getDocs(
			query(collection(db, "videos"), orderBy("releaseDate", "asc"))
		);
		querySnapshot.forEach((doc) => {
			videos.push({
				url: url(`/preptember/videos/${doc.id}`),
				changefreq: "daily",
				priority: 0.9,
				lastModified: new Date().toISOString(),
			});
		});
	} catch (e) {
		console.error(e);
	}

	return [
		{
			url: url("/"),
			changefreq: "daily",
			priority: 1,
			lastModified: new Date().toISOString(),
		},
		{
			url: url("/preptember"),
			changefreq: "daily",
			priority: 0.9,
			lastModified: new Date().toISOString(),
		},
		{
			url: url("/register"),
			changefreq: "daily",
			priority: 0.9,
			lastModified: new Date().toISOString(),
		},
		...videos,
		{
			url: url("/login"),
			changefreq: "daily",
			priority: 0.9,
			lastModified: new Date().toISOString(),
		},
		{
			url: url("/verifyemail"),
			changefreq: "daily",
			priority: 0.9,
			lastModified: new Date().toISOString(),
		},
		{
			url: url("/teamdetails"),
			changefreq: "daily",
			priority: 0.9,
			lastModified: new Date().toISOString(),
		},
	];
}
