"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./videostyles.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import TypingEffect from "../../TypingEffect";
import VideoPlayer from "./VideoPlayer";
import cn from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { FaLeftLong } from "react-icons/fa6";

async function getVideo(id) {
	const docRef = doc(db, "videos", id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, ...docSnap.data() };
	} else {
		return null;
	}
}

export default function VideoDetailPage({ params }) {
	const [video, setVideo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideo = async () => {
			const videoData = await getVideo(params.id);
			setVideo(videoData);
			setLoading(false);
		};

		fetchVideo();
	}, [params.id]);

	if (loading) {
		return (
			<section className="video-background h-screen flex flex-col items-center justify-center">
				<span className="loader"></span>
			</section>
		);
	}

	if (!video) {
		return (
			<div className="video-background h-screen flex flex-col items-center justify-center text-white">
				<h1 className="text-4xl p-4">Video not found</h1>
				<Link
					href="/preptember"
					className={cn(
						"p-4 bg-green hover:bg-darkgreen",
						"transition-all duration-500 ease-in-out",
						"rounded-lg text-white font-bold border-transparent border-2",
						"flex justify-center items-center gap-4 border-green"
					)}
				>
					<FaLeftLong /> Back to all Videos
				</Link>
			</div>
		);
	}

	return (
		<section className="video-background pt-14 min-h-fit">
			<div className="container mx-auto 2xl:max-w-[80vw]">
				<div className={cn("flex flex-col", "md:grid md:grid-cols-2")}>
					<div
						className={cn(
							"md:h-[80vh]",
							"flex items-center justify-center",
							"sticky top-16 md:top-0 md:backdrop-blur-none",
							"bg-darkgreen md:bg-transparent",
							"video-wrapper"
						)}
					>
						<div className="video-container">
							<VideoPlayer videoUrl={video.videoUrl} />
						</div>
					</div>
					<div className="markdown-body">
						<p>
							<Link className="breadcrumb" href="/">
								Home
							</Link>{" "}
							&gt;{" "}
							<Link className="breadcrumb" href="/preptember">
								Preptember
							</Link>{" "}
							&gt;{" "}
							<span className="whitespace-nowrap">
								{String(video.title).substring(0, 15)}{" "}
								{video.title.length > 15 && "..."}{" "}
							</span>
						</p>
						<h1 className="text-4xl font-bold mb-5 text-green max-w-fit">
							<TypingEffect text={video.title} speed={100} />
						</h1>
						{video.releaseDate && (
							<p className="text-sm text-gray-500">
								Released on{" "}
								{new Intl.DateTimeFormat("en-IN", {
									hour: "numeric",
									minute: "numeric",
									day: "numeric",
									weekday: "long",
									year: "numeric",
									month: "long",
									timeZoneName: "short",
								}).format(
									new Date(video.releaseDate.seconds * 1000)
								)}
							</p>
						)}
						{video.speakers && (
							<>
								<h4>Speakers</h4>
								<SpeakerList speakers={video.speakers} />
							</>
						)}
						<h4>Description</h4>
						<MarkdownContent description={video.description} />
					</div>
				</div>
			</div>
		</section>
	);
}

function SpeakerList({ speakers }) {
	return (
		<ul className="flex flex-col gap-4 px-8">
			{speakers.map((speaker) => (
				<li
					key={speaker.name}
					className="flex gap-4 justify-start items-center"
				>
					<Image
						src={speaker.avatarURL}
						alt={speaker.name}
						width={28}
						height={28}
						className="rounded-full object-cover w-[28px] h-[28px]"
					/>
					<span>{speaker.name}</span>
				</li>
			))}
		</ul>
	);
}

function MarkdownContent({ description }) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					return !inline && match ? (
						<SyntaxHighlighter
							style={solarizedlight}
							language={match[1]}
							PreTag="div"
							{...props}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
				h1: "h2",
			}}
			className="prose"
		>
			{description || "No description available."}
		</ReactMarkdown>
	);
}
