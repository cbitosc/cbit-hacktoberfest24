"use client";
import React, { useState, useEffect, createContext, useContext } from "react";

const WindowSizeContext = createContext();

export const useWindowSize = () => useContext(WindowSizeContext);

export const WindowSizeProvider = ({ children }) => {
	const [width, setWidth] = useState(null);
	const [height, setHeight] = useState(null);
	const [isMobile, setIsMobile] = useState(null);

	function handleWindowSizeChange() {
		console.log(
			"handleWindowSizeChange",
			window.innerWidth,
			window.outerWidth,
			isMobile
		);
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
		setIsMobile(window.innerWidth <= 1024);
	}
	useEffect(() => {
		handleWindowSizeChange();
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	return (
		<WindowSizeContext.Provider value={{ width, height, isMobile }}>
			{children}
		</WindowSizeContext.Provider>
	);
};
