import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { movies, allGenres } from '@/data/movies';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel: React.FC = () => {
  const featured = movies.filter(m => m.featured);
  const [current, setCurrent] = useState(0);
  const movie = featured[current];

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-primary/20 text-primary border-primary/30">{movie.genre.join(' • ')}</Badge>
          <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>
          <p className="line-clamp-2 text-muted-foreground">{movie.synopsis}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-accent"><Star className="h-4 w-4 fill-accent" />{movie.rating}</span>
            <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{movie.duration} min</span>
          </div>
          <Link to={`/movie/${movie.id}`}>
            <Button size="lg" className="mt-2">Book Now</Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button size="icon" variant="secondary" onClick={() => setCurrent(i => (i - 1 + featured.length) % featured.length)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={() => setCurrent(i => (i + 1) % featured.length)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const MovieCard: React.FC<{ movie: typeof movies[0] }> = ({ movie }) => (
  <Link to={`/movie/${movie.id}`} className="group block overflow-hidden rounded-lg border border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
    <div className="aspect-[2/3] overflow-hidden">
      <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div className="p-3 space-y-1">
      <h3 className="font-semibold truncate">{movie.title}</h3>
      <p className="text-xs text-muted-foreground">{movie.genre.join(' • ')}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm text-accent"><Star className="h-3 w-3 fill-accent" />{movie.rating}</span>
        <span className="text-xs text-muted-foreground">{movie.duration} min</span>
      </div>
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return movies.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = !selectedGenre || m.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [search, selectedGenre]);

  return (
    <div>
      <HeroCarousel />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Now Showing</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search movies..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={!selectedGenre ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedGenre(null)}>All</Badge>
          {allGenres.map(g => (
            <Badge key={g} variant={selectedGenre === g ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedGenre(g)}>{g}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No movies found.</p>}
      </div>
    </div>
  );
};

export default HomePage;
