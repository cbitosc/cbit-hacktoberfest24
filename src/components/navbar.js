"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LogoDark from "./assets/logo_horizontal_black.png";
import LogoLight from "./assets/logo_horizontal_beige.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";
import { FaRightLong } from "react-icons/fa6";
import { useSimulatedDarkMode } from "@/utils/contexts/SimulatedDarkModeDetection";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [navTransparent, setNavTransparent] = useState(true);
	const [activeLink, setActiveLink] = useState(null);
	const simulatedDarkMode = useSimulatedDarkMode();
	const pathname = usePathname();

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [menuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			setNavTransparent(window.scrollY <= 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (pathname === "/") {
			// scroll-spy effect using intersection observer
			// after the page loads, the observer will observe the sections
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const id = entry.target.id;
							setActiveLink(id);
						}
					});
				},
				{ rootMargin: "0px", threshold: 0.3 }
			);

			const observeAll = () => {
				const sections = document.querySelectorAll("section[id]");
				sections.forEach((section) => {
					observer.observe(section);
				});
			};

			if (document.readyState === "complete") {
				console.log("complete");
				observeAll();
			} else {
				console.log("not complete");
				window.addEventListener("load", observeAll);
			}

			return () => {
				window.removeEventListener("load", observeAll);
			};
		} else {
			setActiveLink("");
		}
	}, [pathname]);

	const navItems = [
		{ href: "/#about", label: "About" },
		{ href: "/#preptember", label: "Preptember" },
		{ href: "/#mentors", label: "Mentors" },
		{ href: "/#timeline", label: "Timeline" },
		{ href: "/#contact", label: "Contact Us" },
	];

	return (
		<header
			className={cn(
				navTransparent
					? "bg-darkgrey/20"
					: simulatedDarkMode
					? "bg-darkgreen lg:bg-darkgrey/80 lg:shadow-md lg:backdrop-blur-lg"
					: "bg-beige lg:bg-beige/80 lg:shadow-md lg:backdrop-blur-md",
				"fixed top-0 w-full z-50",
				"transition-all duration-500 ease-in-out"
			)}
		>
			<nav
				className="mx-auto z-50 flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link
						href="/"
						className="-m-1.5 p-1.5"
						onClick={() => setMenuOpen(false)}
					>
						<span className="sr-only">HactoberFest 2024</span>
						<Image
							className="h-8 w-auto"
							src={
								navTransparent || simulatedDarkMode
									? LogoLight
									: LogoDark
							}
							alt="Hacktober Fest 2024 Logo"
							width={200}
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className={cn(
							"-m-2.5 inline-flex items-center justify-center",
							"rounded-md p-2.5",
							navTransparent
								? "text-beige hover:text-green"
								: "text-gray-900 hover:text-deeppink",
							"transition-all duration-300 ease-in-out",
							simulatedDarkMode
								? "text-beige hover:text-lightgreen"
								: ""
						)}
						onClick={() => setMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								navTransparent
									? "text-beige hover:text-green"
									: "text-gray-900 hover:text-deeppink",
								"transition-all duration-300 ease-in-out",
								"text-sm font-semibold leading-6",
								activeLink === item.href.split("#")[1]
									? navTransparent
										? "text-green border-b-2 border-green hover:text-green hover:border-green"
										: "text-darkgreen border-b-2 border-darkgreen hover:text-darkgreen"
									: ""
							)}
						>
							{item.label}
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Link
						href="/#timer"
						className={cn(
							"text-sm font-semibold leading-6",
							"text-darkgreen px-4 py-2 rounded-lg",
							navTransparent
								? "bg-lightgreen hover:bg-green hover:text-darkgreen"
								: "bg-green hover:bg-darkgreen hover:text-beige",
							"transition-colors duration-300 ease-in-out"
						)}
					>
						Register <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
			{/* Mobile menu */}
			<div
				className={cn("lg:hidden", menuOpen ? "block" : "hidden")}
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 z-10"></div>
				<div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							className="-m-1.5 p-1.5"
							onClick={() => setMenuOpen(false)}
						>
							<span className="sr-only">Hacktober Fest 2024</span>
							<Image
								className="h-8 w-auto"
								src={
									menuOpen && !simulatedDarkMode
										? LogoDark
										: navTransparent || simulatedDarkMode
										? LogoLight
										: LogoDark
								}
								alt="CBIT Hacktober Fest Hackathon 2024 Logo"
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										onClick={() => setMenuOpen(false)}
									>
										{item.label}
									</Link>
								))}
							</div>
							<div className="py-6">
								<Link
									href="/#timer"
									className={cn(
										"-mx-3 block rounded-lg px-3 py-2.5",
										"text-base font-semibold leading-7",
										"text-gray-900 transition-colors duration-300 ease-in-out",
										"bg-green text-darkgreen hover:text-lightgreen focus:text-lightgreen hover:bg-darkgreen focus:bg-darkgreen",
										"flex items-center justify-between"
									)}
									onClick={() => setMenuOpen(false)}
								>
									Register
									<FaRightLong />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
