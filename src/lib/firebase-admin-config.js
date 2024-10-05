import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
	credential: cert({
		type: "service_account",
		project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY,
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: process.env.FIREBASE_AUTH_URI,
		token_uri: process.env.FIREBASE_TOKEN_URI,
		auth_provider_x509_cert_url:
			process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
		universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
	}),
};

export function customInitApp() {
	if (getApps().length <= 0) {
		initializeApp(firebaseAdminConfig);
	}
}

const admin = customInitApp();

const db = getFirestore(admin);
export { db };
