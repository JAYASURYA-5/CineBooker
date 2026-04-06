import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QrCode, Ticket } from 'lucide-react';

const BookingsPage: React.FC = () => {
  const { bookings } = useBooking();
  const { user } = useAuth();

  const userBookings = bookings.filter(b => b.userId === user?.id);

  if (userBookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <Ticket className="h-16 w-16 mx-auto text-muted-foreground/30" />
        <h1 className="text-2xl font-bold">No Bookings Yet</h1>
        <p className="text-muted-foreground">Start by booking tickets for a movie!</p>
        <Link to="/"><Button>Browse Movies</Button></Link>
      </div>
    );
  }

  const statusColor = (status: string) => {
    if (status === 'confirmed') return 'bg-green-500/10 text-green-500 border-green-500/30';
    if (status === 'completed') return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    return 'bg-destructive/10 text-destructive border-destructive/30';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div className="space-y-4">
        {userBookings.map(b => (
          <div key={b.id} className="rounded-lg border border-border/50 bg-card/50 p-4 flex flex-col gap-4 sm:flex-row">
            <img src={b.posterUrl} alt={b.movieTitle} className="w-24 rounded shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{b.movieTitle}</h3>
                  <p className="text-sm text-muted-foreground">{b.showDate} • {b.showTime}</p>
                  <p className="text-sm text-muted-foreground">{b.theaterName} • {b.screenName}</p>
                </div>
                <Badge className={statusColor(b.status)}>{b.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {b.seats.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s.row}{s.number}</Badge>)}
                </div>
                <span className="font-bold text-primary">${b.totalPrice}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>ID: {b.id}</span>
                <QrCode className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
