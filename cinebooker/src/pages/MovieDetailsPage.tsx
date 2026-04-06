import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies, showtimes } from '@/data/movies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Calendar, MapPin, Play } from 'lucide-react';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);

  const movieShowtimes = useMemo(() => {
    if (!movie) return {};
    const filtered = showtimes.filter(s => s.movieId === movie.id);
    return filtered.reduce((acc, s) => {
      if (!acc[s.date]) acc[s.date] = {};
      if (!acc[s.date][s.theaterName]) acc[s.date][s.theaterName] = [];
      acc[s.date][s.theaterName].push(s);
      return acc;
    }, {} as Record<string, Record<string, typeof filtered>>);
  }, [movie]);

  if (!movie) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Movie not found.</div>;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    if (d.getTime() === today.getTime()) return 'Today';
    if (d.getTime() === tomorrow.getTime()) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col gap-6 md:flex-row">
          <img src={movie.posterUrl} alt={movie.title} className="w-48 rounded-lg border border-border/50 shadow-xl md:w-56 shrink-0" />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">{movie.title}</h1>
            <div className="flex flex-wrap gap-2">
              {movie.genre.map(g => <Badge key={g} variant="outline">{g}</Badge>)}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1 text-accent"><Star className="h-4 w-4 fill-accent" />{movie.rating}/10</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{movie.duration} min</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-4 w-4" />{movie.releaseDate}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{movie.synopsis}</p>
            <div>
              <p className="text-sm font-medium">Director: <span className="text-muted-foreground">{movie.director}</span></p>
              <p className="text-sm font-medium">Cast: <span className="text-muted-foreground">{movie.cast.join(', ')}</span></p>
            </div>
            <Button variant="outline" className="gap-2"><Play className="h-4 w-4" />Watch Trailer</Button>
          </div>
        </div>

        <div className="mt-12 space-y-6 pb-12">
          <h2 className="text-2xl font-bold">Showtimes</h2>
          {Object.entries(movieShowtimes).sort(([a], [b]) => a.localeCompare(b)).map(([date, theaters]) => (
            <div key={date} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />{formatDate(date)}
              </h3>
              {Object.entries(theaters).map(([theaterName, shows]) => (
                <div key={theaterName} className="rounded-lg border border-border/50 bg-card/30 p-4">
                  <p className="font-medium flex items-center gap-2 mb-3"><MapPin className="h-4 w-4 text-muted-foreground" />{theaterName}</p>
                  <div className="flex flex-wrap gap-2">
                    {shows.sort((a, b) => a.time.localeCompare(b.time)).map(show => (
                      <Button key={show.id} variant="outline" size="sm" onClick={() => navigate(`/seats/${show.id}`)}
                        className="hover:border-primary hover:text-primary">
                        {show.time}
                        <span className="ml-1 text-xs text-muted-foreground">({show.screenName})</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
