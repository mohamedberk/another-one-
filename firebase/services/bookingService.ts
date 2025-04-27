import { collection, addDoc, serverTimestamp, DocumentData } from 'firebase/firestore';
import { db } from '../config';

// Booking interface for type safety
export interface Booking {
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  pickupLocation: string;
  date: Date | null;
  totalPrice: number;
  excursionTitle?: string;
  excursionType?: string;
  status?: 'pending' | 'confirmed' | 'canceled' | 'completed';
}

/**
 * Creates a new booking in Firestore
 * @param bookingData The booking data to save
 * @returns Promise with the booking reference
 */
export const createBooking = async (bookingData: Booking) => {
  try {
    // Add created timestamp to the booking data
    const bookingWithTimestamp = {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: bookingData.status || 'pending',
    };

    // Add the booking to the 'bookings' collection
    const docRef = await addDoc(
      collection(db, 'bookings'),
      bookingWithTimestamp
    );

    console.log('Booking created with ID:', docRef.id);
    return {
      id: docRef.id,
      ...bookingData,
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Handles the booking form submission
 * @param formData The booking form data
 * @returns Promise with the booking data including ID
 */
export const handleBookingSubmission = async (formData: Booking) => {
  try {
    // Save the booking to Firestore
    const booking = await createBooking(formData);
    return booking;
  } catch (error) {
    console.error('Error handling booking submission:', error);
    throw error;
  }
}; 