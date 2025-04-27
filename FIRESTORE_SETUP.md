# Firebase & Firestore Setup Guide

This document provides step-by-step instructions for setting up Firebase and Firestore for the Atlas Excursions booking system.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project"
3. Enter a project name (e.g., "atlas-excursions")
4. Optionally enable/disable Google Analytics
5. Click "Create project"

## 2. Add a Web App to Your Firebase Project

1. In your Firebase project dashboard, click on the web icon (</>) to add a web app
2. Give your app a nickname (e.g., "atlas-excursions-web")
3. Optionally check "Also set up Firebase Hosting"
4. Click "Register app"
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 3. Create a .env.local File

Create a `.env.local` file in the root of your project with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

## 4. Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (recommended for real applications)
4. Select a location for your Firestore database
5. Click "Enable"

## 5. Create Firestore Security Rules

1. In the Firestore Database section, go to the "Rules" tab
2. Replace the default rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to bookings
    match /bookings/{bookingId} {
      // Anyone can create a booking
      allow create: if true;
      
      // Only the user who created the booking can read, update, or delete it
      // In a real app, you'd add user authentication and check request.auth.uid
      allow read, update, delete: if false;
    }
  }
}
```

## 6. Create a Bookings Collection

The Firestore database will automatically create the "bookings" collection when the first booking is submitted. Each booking will have the following structure:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "pickupLocation": "Hotel Example",
  "date": "2023-07-15",
  "numGuests": 2,
  "destination": "Ourika Valley",
  "totalPrice": 170,
  "bookingDate": "July 1, 2023 at 12:00:00 PM UTC+1",
  "status": "pending"
}
```

## 7. Testing the Booking System

1. Start the application with `npm run dev`
2. Navigate to the travel page at `http://localhost:3000/travel`
3. Click "Book Now" on any excursion
4. Fill out the booking form and submit
5. Check your Firestore database to see the new booking entry

## 8. Optional: Set Up Firebase Authentication

For a complete booking system, you might want to add user authentication:

1. In the Firebase console, go to "Authentication"
2. Click "Get started"
3. Enable the authentication methods you want (e.g., Email/Password, Google, etc.)
4. Update your security rules to use authentication
5. Modify the booking form to include user authentication

## 9. Deployment (Optional)

To deploy your app with Firebase Hosting:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
4. Select Hosting and other services as needed
5. Build your Next.js app: `npm run build`
6. Deploy to Firebase: `firebase deploy`

## 10. Next Steps

- Implement an admin dashboard to manage bookings
- Add email notifications using Firebase Cloud Functions
- Set up payment processing with a service like Stripe
- Add a booking calendar to show availability 