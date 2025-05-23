# Atlas Excursions - 3 Valleys Booking Platform

This project provides a complete excursion booking platform for the Atlas Mountains three valleys tour: Ourika, Oukaimeden, and Asni. It includes detailed excursion showcases and a booking system that saves to Firebase Firestore.

## Features

- **Single Page Design**: All content on a single, scrollable page
- **Responsive Layout**: Works on all device sizes
- **Excursion Showcase**: Detailed information about each valley excursion
- **Booking System**: Modal popup form for collecting guest information
- **Firebase Integration**: Bookings saved to Firestore database
- **Modern UI**: Clean, attractive design with animations and gradients

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase (see [FIRESTORE_SETUP.md](FIRESTORE_SETUP.md) for detailed instructions):
   - Create a Firebase project
   - Enable Firestore
   - Add your Firebase config to `.env.local`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000/travel](http://localhost:3000/travel) in your browser

## Excursion Booking Flow

1. Visitor browses the three valley options
2. Clicks on a valley card to see details
3. Reviews the itinerary and included/excluded items
4. Clicks "Book Now" to open the booking form
5. Completes the form with personal details and pickup location
6. Submits the form to save the booking to Firestore

## Customization

You can easily customize this platform by:

- Editing excursion details in `app/data/excursions.ts`
- Modifying UI components for different styling
- Adding real images to replace the gradient placeholders
- Implementing a payment gateway

For detailed customization instructions, see [BOOKING_SYSTEM_GUIDE.md](BOOKING_SYSTEM_GUIDE.md).

## Documentation

- [Firestore Setup Guide](FIRESTORE_SETUP.md) - How to set up Firebase for the booking system
- [Booking System Guide](BOOKING_SYSTEM_GUIDE.md) - How to use and customize the booking system

## Technologies Used

- **Next.js** - React framework with App Router
- **React** - Frontend library
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend and database
- **TypeScript** - Type-safe JavaScript

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact:
- Email: info@atlasexcursions.com
- Phone: +212 524 123 456
‣慢摤潤ੵ‣慢摤潤ੵ# baddou
# another-one-
