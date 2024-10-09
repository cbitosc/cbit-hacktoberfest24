"use client";
import { auth, db } from "@/app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
	getDoc,
	doc,
	query,
	getDocs,
	collection,
	where,
} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext({
	user: null,
	loading: true,
	logout: () => {},
	isRegistered: false,
	setIsRegistered: () => {},
	isTeamLeader: false,
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isRegistered, setIsRegistered] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isTeamLeader, setIsTeamLeader] = useState(false);

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
					setIsTeamLeader(true);
					setIsRegistered(true);
				} else {
					const participantQuery = query(
						collection(db, "participants"),
						where("email", "==", user.email)
					);
					const participantSnapshot = await getDocs(participantQuery);
					if (participantSnapshot.empty) {
						setIsRegistered(false);
						setIsTeamLeader(true);
					} else {
						setIsRegistered(true);
						setIsTeamLeader(false);
					}
				}
			} else {
				setIsRegistered(false);
				setIsTeamLeader(false);
			}
		};
		checkIfRegistered();
	}, [user]);

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				logout,
				isRegistered,
				setIsRegistered,
				isTeamLeader,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
