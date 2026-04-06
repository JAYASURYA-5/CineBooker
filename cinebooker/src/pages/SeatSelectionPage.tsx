import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies, showtimes, theaters } from '@/data/movies';
import { Seat } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { useToast } from '@/hooks/use-toast';
import { Monitor } from 'lucide-react';

const SeatSelectionPage: React.FC = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addBooking } = useBooking();
  const { toast } = useToast();

  const showtime = showtimes.find(s => s.id === showtimeId);
  const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null;
  const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null;
  const screen = theater?.screens.find(s => s.id === showtime?.screenId);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // Generate random booked seats for demo
  const bookedSeats = useMemo(() => {
    const booked = new Set<string>();
    if (!screen) return booked;
    const total = screen.rows * screen.seatsPerRow;
    const numBooked = Math.floor(total * 0.3);
    for (let i = 0; i < numBooked; i++) {
      const row = String.fromCharCode(65 + Math.floor(Math.random() * screen.rows));
      const num = 1 + Math.floor(Math.random() * screen.seatsPerRow);
      booked.add(`${row}${num}`);
    }
    return booked;
  }, [screen]);

  if (!showtime || !movie || !screen) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Showtime not found.</div>;

  const getCategory = (rowIdx: number): 'vip' | 'premium' | 'regular' => {
    if (rowIdx >= screen.rows - 2) return 'vip';
    if (rowIdx >= Math.floor(screen.rows / 2)) return 'premium';
    return 'regular';
  };

  const getCategoryColor = (cat: string, status: string) => {
    if (status === 'booked') return 'bg-muted/50 text-muted-foreground/30 cursor-not-allowed';
    if (status === 'selected') return 'bg-primary text-primary-foreground ring-2 ring-primary/50';
    if (cat === 'vip') return 'bg-accent/20 text-accent border-accent/30 hover:bg-accent/40';
    if (cat === 'premium') return 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/40';
    return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
  };

  const toggleSeat = (row: string, num: number, category: 'regular' | 'premium' | 'vip') => {
    const id = `${row}${num}`;
    if (bookedSeats.has(id)) return;
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) return prev.filter(s => s.id !== id);
      return [...prev, { id, row, number: num, category, status: 'selected' }];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + showtime.price[s.category], 0);

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({ title: 'Please login', description: 'You need to be logged in to book tickets.', variant: 'destructive' });
      navigate('/login');
      return;
    }
    if (selectedSeats.length === 0) return;

    const booking = {
      id: `BK${Date.now()}`,
      userId: user!.id,
      movieId: movie.id,
      movieTitle: movie.title,
      posterUrl: movie.posterUrl,
      showtimeId: showtime.id,
      showDate: showtime.date,
      showTime: showtime.time,
      theaterName: showtime.theaterName,
      screenName: showtime.screenName,
      seats: selectedSeats.map(s => ({ row: s.row, number: s.number, category: s.category })),
      totalPrice,
      status: 'confirmed' as const,
      bookedAt: new Date().toISOString(),
    };

    addBooking(booking);
    navigate(`/confirmation/${booking.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-muted-foreground">{showtime.theaterName} • {showtime.screenName} • {showtime.date} • {showtime.time}</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          {/* Screen */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex items-center justify-center gap-2 text-muted-foreground">
              <Monitor className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">Screen</span>
            </div>
            <div className="mx-auto mb-8 h-1 w-3/4 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Seat Grid */}
          <div className="overflow-x-auto">
            <div className="mx-auto w-fit space-y-1.5">
              {Array.from({ length: screen.rows }, (_, rowIdx) => {
                const rowLetter = String.fromCharCode(65 + rowIdx);
                const category = getCategory(rowIdx);
                return (
                  <div key={rowIdx} className="flex items-center gap-1.5">
                    <span className="w-6 text-center text-xs text-muted-foreground">{rowLetter}</span>
                    {Array.from({ length: screen.seatsPerRow }, (_, seatIdx) => {
                      const num = seatIdx + 1;
                      const id = `${rowLetter}${num}`;
                      const isBooked = bookedSeats.has(id);
                      const isSelected = selectedSeats.some(s => s.id === id);
                      const status = isBooked ? 'booked' : isSelected ? 'selected' : 'available';
                      return (
                        <button key={seatIdx} onClick={() => toggleSeat(rowLetter, num, category)}
                          disabled={isBooked}
                          className={`h-7 w-7 rounded-t-md border text-[10px] font-medium transition-all ${getCategoryColor(category, status)}`}
                          title={`${rowLetter}${num} - ${category} - $${showtime.price[category]}`}>
                          {num}
                        </button>
                      );
                    })}
                    <span className="w-6 text-center text-xs text-muted-foreground">{rowLetter}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded-t-md bg-secondary border" /><span>Regular (${showtime.price.regular})</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded-t-md bg-blue-500/20 border border-blue-500/30" /><span>Premium (${showtime.price.premium})</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded-t-md bg-accent/20 border border-accent/30" /><span>VIP (${showtime.price.vip})</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded-t-md bg-primary" /><span>Selected</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 rounded-t-md bg-muted/50" /><span>Booked</span></div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-20 rounded-lg border border-border/50 bg-card/50 p-6 space-y-4">
            <div className="flex gap-3">
              <img src={movie.posterUrl} alt={movie.title} className="w-16 rounded" />
              <div>
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">{showtime.date} • {showtime.time}</p>
                <p className="text-xs text-muted-foreground">{showtime.theaterName}</p>
              </div>
            </div>

            {selectedSeats.length > 0 ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Seats ({selectedSeats.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map(s => (
                      <Badge key={s.id} variant="outline" className="text-xs">{s.row}{s.number} ({s.category})</Badge>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  {(['regular', 'premium', 'vip'] as const).map(cat => {
                    const seats = selectedSeats.filter(s => s.category === cat);
                    if (seats.length === 0) return null;
                    return (
                      <div key={cat} className="flex justify-between text-sm">
                        <span className="capitalize">{cat} × {seats.length}</span>
                        <span>${seats.length * showtime.price[cat]}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleBooking}>Proceed to Pay</Button>
              </>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">Select seats to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
