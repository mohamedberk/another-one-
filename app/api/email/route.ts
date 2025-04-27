import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json();
    
    if (!booking.email || !booking.bookingReference) {
      throw new Error('Missing required booking information');
    }

    // Format date properly
    const formatDate = (date: any) => {
      if (!date) return 'TBD';
      try {
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'TBD';
      }
    };

    // Format guests text for our booking form
    const formatGuests = (booking: any) => {
      let guestText = `${booking.adults} ${booking.adults === 1 ? 'Adult' : 'Adults'}`;
      
      if (booking.children > 0) {
        guestText += `, ${booking.children} ${booking.children === 1 ? 'Child' : 'Children'} (3-5 years)`;
      }
      
      if (booking.youngChildren > 0) {
        guestText += `, ${booking.youngChildren} ${booking.youngChildren === 1 ? 'Infant' : 'Infants'} (under 3 years)`;
      }
      
      return guestText;
    };

    // Format price information
    const formatPrices = (booking: any) => {
      let priceText = `Adults (${booking.adults}): €${(booking.adults * booking.adultPrice).toFixed(2)}`;
      
      if (booking.children > 0) {
        priceText += `\nChildren (${booking.children}): €${(booking.children * booking.childPrice).toFixed(2)}`;
      }
      
      if (booking.youngChildren > 0) {
        priceText += `\nInfants (${booking.youngChildren}): Free`;
      }
      
      priceText += `\nTotal: €${booking.totalPrice.toFixed(2)}`;
      
      return priceText;
    };

    const emailTemplate = `
      <div style="background-color: #F9FAFB; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(to right, #2563EB, #3B82F6); color: white; font-size: 24px; font-weight: bold; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
              AtlasTours
            </div>
            <h1 style="color: #111827; font-size: 24px; margin-bottom: 8px;">
              Your Adventure is Confirmed!
            </h1>
            <p style="color: #4B5563; margin: 0;">
              Booking Reference: <strong style="color: #3B82F6;">${booking.bookingReference}</strong>
            </p>
          </div>
          
          <!-- Main Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #111827; font-size: 20px; padding-bottom: 12px; border-bottom: 1px solid #E5E7EB; margin-bottom: 20px;">
              Booking Details
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <div style="color: #1F2937;">
                <strong style="color: #111827; display: block; margin-bottom: 4px;">Customer</strong>
                ${booking.name} <br>
                ${booking.email} <br>
                ${booking.phone}
              </div>
              <div style="color: #1F2937;">
                <strong style="color: #111827; display: block; margin-bottom: 4px;">Date</strong>
                ${formatDate(booking.date)}
              </div>
              <div style="color: #1F2937;">
                <strong style="color: #111827; display: block; margin-bottom: 4px;">Pickup Location</strong>
                ${booking.pickupLocation}
              </div>
              <div style="color: #1F2937;">
                <strong style="color: #111827; display: block; margin-bottom: 4px;">Guests</strong>
                ${formatGuests(booking)}
              </div>
            </div>
            
            <!-- Tour Details Section -->
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <h3 style="color: #111827; font-size: 18px; margin-top: 0; margin-bottom: 12px;">Tour Details</h3>
              <div style="color: #1F2937;">
                <strong>Excursion:</strong> ${booking.excursionTitle}<br>
                <strong>Tour Type:</strong> ${booking.isPrivate ? 'Private' : 'Group'}<br>
                <strong>Pricing:</strong><br>
                <pre style="margin: 5px 0; font-family: inherit; white-space: pre-wrap;">${formatPrices(booking)}</pre>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 20px;">
            <p style="color: #9CA3AF; margin-top: 16px; font-size: 14px; text-align: center;">
              Thank you for choosing AtlasTours for your adventure!
            </p>
          </div>
        </div>
      </div>
    `;

    // Send both emails
    await Promise.all([
      // Customer email
      resend.emails.send({
        from: 'Best Activity Marrakech <bookings@tripmarrakesh.com>',
        replyTo: 'info@atlastours.com',
        to: booking.email,
        subject: `Booking Confirmation - AtlasTours`,
        html: emailTemplate,
      }),
      // Owner email
      resend.emails.send({
        from: 'Best Activity Marrakech <bookings@tripmarrakesh.com>',
        replyTo: booking.email,
        to: process.env.NEXT_PUBLIC_EMAIL || '',
        subject: `New Booking ${booking.bookingReference}`,
        html: emailTemplate,
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}