"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

const SimulatedDarkModeContext = createContext();

export const useSimulatedDarkMode = () => useContext(SimulatedDarkModeContext);

export const SimulatedDarkModeProvider = ({ children }) => {
	const [simulatedDarkMode, setSimulatedDarkMode] = useState(false);

	useEffect(() => {
		const img = new window.Image();

		img.onload = function checkMode() {
			const canvas = document.createElement("canvas");
			canvas.width = 1;
			canvas.height = 1;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			const [r] = ctx.getImageData(0, 0, 1, 1).data;

			// Test if that white image got turned into grey by a dark mode module
			setSimulatedDarkMode(r < 200);
		};

		img.src =
			"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+";
	}, []);

	return (
		<SimulatedDarkModeContext.Provider value={simulatedDarkMode}>
			{children}
		</SimulatedDarkModeContext.Provider>
	);
};
