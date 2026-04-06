import React, { useState } from 'react';
import { movies as initialMovies, theaters, showtimes } from '@/data/movies';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, Calendar, MapPin, Ticket, Plus, Pencil, Trash2, Search } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { bookings } = useBooking();
  const [movieSearch, setMovieSearch] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');

  const filteredMovies = initialMovies.filter(m => m.title.toLowerCase().includes(movieSearch.toLowerCase()));
  const filteredBookings = bookings.filter(b =>
    b.movieTitle.toLowerCase().includes(bookingSearch.toLowerCase()) || b.id.toLowerCase().includes(bookingSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <Tabs defaultValue="movies">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="movies" className="gap-2"><Film className="h-4 w-4" />Movies</TabsTrigger>
          <TabsTrigger value="showtimes" className="gap-2"><Calendar className="h-4 w-4" />Showtimes</TabsTrigger>
          <TabsTrigger value="theaters" className="gap-2"><MapPin className="h-4 w-4" />Theaters</TabsTrigger>
          <TabsTrigger value="bookings" className="gap-2"><Ticket className="h-4 w-4" />Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="movies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search movies..." className="pl-9" value={movieSearch} onChange={e => setMovieSearch(e.target.value)} />
            </div>
            <Button className="gap-2"><Plus className="h-4 w-4" />Add Movie</Button>
          </div>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left">Movie</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Genre</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Rating</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Duration</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody>
                {filteredMovies.map(m => (
                  <tr key={m.id} className="border-b border-border/30 hover:bg-muted/10">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={m.posterUrl} alt={m.title} className="h-12 w-8 rounded object-cover" />
                      <span className="font-medium">{m.title}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="flex gap-1">{m.genre.map(g => <Badge key={g} variant="outline" className="text-xs">{g}</Badge>)}</div></td>
                    <td className="px-4 py-3 hidden sm:table-cell">{m.rating}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">{m.duration} min</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="showtimes" className="space-y-4">
          <div className="flex justify-end"><Button className="gap-2"><Plus className="h-4 w-4" />Add Showtime</Button></div>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left">Movie</th>
                <th className="px-4 py-3 text-left">Theater</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody>
                {showtimes.slice(0, 20).map(s => {
                  const movie = initialMovies.find(m => m.id === s.movieId);
                  return (
                    <tr key={s.id} className="border-b border-border/30 hover:bg-muted/10">
                      <td className="px-4 py-3 font-medium">{movie?.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.theaterName} - {s.screenName}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">{s.date}</td>
                      <td className="px-4 py-3">{s.time}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="theaters" className="space-y-4">
          <div className="flex justify-end"><Button className="gap-2"><Plus className="h-4 w-4" />Add Theater</Button></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {theaters.map(t => (
              <div key={t.id} className="rounded-lg border border-border/50 bg-card/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{t.name}</h3>
                  <div>
                    <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {t.screens.map(s => (
                    <div key={s.id} className="flex justify-between text-sm text-muted-foreground rounded bg-muted/20 px-3 py-2">
                      <span>{s.name}</span>
                      <span>{s.rows} rows × {s.seatsPerRow} seats</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search bookings..." className="pl-9" value={bookingSearch} onChange={e => setBookingSearch(e.target.value)} />
          </div>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Movie</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Seats</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr></thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id} className="border-b border-border/30 hover:bg-muted/10">
                    <td className="px-4 py-3 font-mono text-xs">{b.id}</td>
                    <td className="px-4 py-3 font-medium">{b.movieTitle}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{b.showDate}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{b.seats.map(s => `${s.row}${s.number}`).join(', ')}</td>
                    <td className="px-4 py-3">${b.totalPrice}</td>
                    <td className="px-4 py-3"><Badge variant="outline">{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
