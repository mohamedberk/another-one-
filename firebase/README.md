# Firebase Integration

This directory contains all the Firebase-related configurations and services for the application.

## Structure

- `config.ts` - Firebase initialization and configuration
- `services/` - Service modules for different Firebase features
  - `bookingService.ts` - Functions to handle booking operations with Firestore

## Setting Up

1. Ensure you have the required environment variables in `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

2. Firebase functionality is automatically initialized when importing any of the exported modules.

## Usage Example

```typescript
// Import the booking service
import { handleBookingSubmission } from '../firebase/services/bookingService';

// Use in a component or function
const handleSubmit = async (formData) => {
  try {
    const booking = await handleBookingSubmission(formData);
    console.log('Booking created:', booking);
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};
```

## Security

Firestore security rules are defined in `firestore.rules` at the project root. Remember to deploy these rules when updating the Firebase configuration.

## Troubleshooting

- If you encounter permission issues, check that your Firebase project has Firestore enabled and the rules are deployed.
- For initialization errors, verify your environment variables are correctly set. 