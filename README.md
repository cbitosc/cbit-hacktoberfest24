# CBIT Hacktoberfest 2024 Website

Welcome to the official repository for CBIT's Hacktoberfest 2024 website! This Next.js application serves as the central hub for all Hacktoberfest activities at CBIT, featuring event information, registration, and informative content.

## 🚀 Features

- Interactive landing page with event details
- User authentication system
- Problem statement submissions
- Video content platform for Preptember series
- Real-time chatbot support
- Responsive design with dark mode support
- Timeline of events
- Mentor profiles and contact information

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui
- **Video Player**: React Player
- **Additional Libraries**: 
  - clsx
  - tailwind-merge
  - react-icons

## 📁 Project Structure

```
cbitosc-cbit-hacktoberfest24/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable components
│   ├── lib/                 # Firebase admin configuration
│   └── utils/              # Utility functions and contexts
├── public/                 # Static assets
└── [config files]         # Configuration files
```

## 🔧 Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/cbitosc/cbit-hacktoberfest24.git
cd cbitosc-cbit-hacktoberfest24
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

4. Run the development server:
```bash
npm run dev
```

## 🌟 Key Components

- **Authentication System**: Complete user authentication flow with email verification
- **Problem Statements**: Interface for submitting and viewing problem statements
- **Preptember Videos**: Educational content delivery system with dynamic video pages
- **Timeline**: Interactive event timeline with animations
- **Chatbot**: Real-time support system for participants

## 🎨 Styling

The project uses a combination of:
- Tailwind CSS for utility-first styling
- Custom CSS modules for component-specific styles
- CSS variables for theme consistency
- Responsive design breakpoints


## 📝 Environment Variables

The project requires several environment variables for Firebase configuration. These configurations cannot be provided by the contributors with regards to maintaining confidentiality. 

## 📦 Dependencies

Key dependencies include:
- `next`: ^14.0.0
- `react`: ^18.0.0
- `firebase`: ^10.0.0
- `tailwindcss`: ^3.0.0
- `framer-motion`: ^10.0.0

## 🚀 Deployment

The project is configured for deployment on Vercel. 

## 👥 Contributors

- [@mdimado](https://github.com/mdimado)
- [@gjaynir0508](https://github.com/gjaynir0508)
- [@meghana-0211](https://github.com/meghana-0211)
- [@Domaakshithareddy](https://github.com/Domaakshithareddy)
- [@Srilekha-03](https://github.com/Srilekha-03)


