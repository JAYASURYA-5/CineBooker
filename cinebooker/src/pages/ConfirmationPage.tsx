import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Ticket, QrCode } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams();
  const { bookings } = useBooking();
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Booking not found.</div>;

  return (
    <div className="container mx-auto max-w-lg px-4 py-12 text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
      <p className="text-muted-foreground">Your tickets have been booked successfully.</p>

      <div className="rounded-lg border border-border/50 bg-card/50 p-6 text-left space-y-4">
        <div className="flex gap-4">
          <img src={booking.posterUrl} alt={booking.movieTitle} className="w-20 rounded" />
          <div className="space-y-1">
            <h2 className="font-bold text-lg">{booking.movieTitle}</h2>
            <p className="text-sm text-muted-foreground">{booking.showDate} • {booking.showTime}</p>
            <p className="text-sm text-muted-foreground">{booking.theaterName}</p>
            <p className="text-sm text-muted-foreground">{booking.screenName}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="font-mono">{booking.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Seats</span>
            <div className="flex flex-wrap gap-1 justify-end">
              {booking.seats.map((s, i) => (
                <Badge key={i} variant="outline" className="text-xs">{s.row}{s.number}</Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/30">{booking.status}</Badge>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
            <span>Total Paid</span>
            <span className="text-primary">${booking.totalPrice}</span>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex flex-col items-center gap-2 pt-4 border-t border-dashed border-border">
          <QrCode className="h-24 w-24 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground">Show this QR code at the theater</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Link to="/bookings"><Button variant="outline" className="gap-2"><Ticket className="h-4 w-4" />My Bookings</Button></Link>
        <Link to="/"><Button>Browse Movies</Button></Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
