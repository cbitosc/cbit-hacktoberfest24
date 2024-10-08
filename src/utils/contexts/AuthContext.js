"use client";
import { auth, db } from "@/app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext({
	user: null,
	loading: true,
	logout: () => {},
	isRegistered: false,
	setIsRegistered: () => {},
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isRegistered, setIsRegistered] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		const checkIfRegistered = async () => {
			if (user) {
				const userDocRef = doc(db, "teams", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					setIsRegistered(true);
				}
			} else {
				setIsRegistered(false);
			}
		};
		checkIfRegistered();
	}, [user]);

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, logout, isRegistered, setIsRegistered }}
		>
			{children}
		</AuthContext.Provider>
	);
};
