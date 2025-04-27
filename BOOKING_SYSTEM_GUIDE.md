# Atlas Excursions Booking System Guide

This guide explains how to use and customize the Atlas Excursions booking system for showcasing and selling your excursion packages.

## Overview

The booking system is designed for three valleys in the Atlas Mountains: Ourika Valley, Oukaimeden Peak, and Asni Valley. It allows customers to:

1. View detailed information about each excursion
2. See what's included and excluded
3. View the full itinerary
4. Book excursions

## Getting Started

1. Start the application:
   ```bash
   npm run dev
   ```

2. Visit the excursions page:
   ```
   http://localhost:3000/travel
   ```

## Using the Booking System

### For Customers

1. **Browse Excursions**: View the three excursion options on the main page
2. **View Details**: Click on an excursion card to see detailed information
3. **Book**: Click the "Book Now" button on any excursion
4. **Complete Form**: Fill out the booking form with personal details and pickup information
5. **Confirm**: Submit the booking

### For Administrators

Bookings are stored in Firebase Firestore. To view and manage them:

1. Log in to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database
4. View the "bookings" collection

## Customizing the Excursions

You can easily modify the excursion offerings by editing the data file at:
```
app/data/excursions.ts
```

For each excursion, you can update:
- Title and description
- Price
- Highlights
- Duration
- Included/excluded items
- Itinerary details

## Understanding the Code Structure

The booking system consists of several key components:

1. **ExcursionCard.tsx**: Displays each excursion option
2. **ExcursionDetails.tsx**: Shows detailed information about a selected excursion
3. **BookingModal.tsx**: Handles the booking form and submission
4. **travel-landing-page.tsx**: The main page that brings everything together
5. **excursions.ts**: Contains the data for all excursions

## Customizing the UI

### Colors and Branding

To change the color scheme or branding elements:

1. Edit the Tailwind classes in the components
2. For gradient buttons, look for classes like `from-orange-500 to-red-500`
3. For background colors, look for classes like `bg-[#E3E1D6]`

### Images

To add real images instead of color gradients:

1. Add your images to the `public/images` folder
2. Update the `ExcursionCard` component to use actual images instead of gradients
3. Update the hero section with a real banner image

## Help and Support

If you need help customizing or extending this booking system, refer to the following resources:

- React documentation: https://reactjs.org/docs
- Next.js documentation: https://nextjs.org/docs
- Firebase documentation: https://firebase.google.com/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs

---

For further assistance, contact your developer or open an issue on the project repository. 