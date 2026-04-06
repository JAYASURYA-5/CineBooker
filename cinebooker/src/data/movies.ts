import { Movie, Showtime, Theater, Booking } from '@/types';

export const movies: Movie[] = [
  {
    id: '1', title: 'The Dark Horizon', genre: ['Sci-Fi', 'Thriller'], rating: 8.7, duration: 148,
    synopsis: 'In a dystopian future where the sun is dying, a crew of astronauts embarks on a perilous mission to reignite the star using an experimental device. As tensions rise and systems fail, they must confront not only the void of space but the darkness within themselves.',
    cast: ['Chris Hemsworth', 'Zendaya', 'Oscar Isaac', 'Florence Pugh'], director: 'Denis Villeneuve',
    posterUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=500&fit=crop',
    releaseDate: '2026-03-15', featured: true
  },
  {
    id: '2', title: 'Whispers in the Rain', genre: ['Drama', 'Romance'], rating: 7.9, duration: 122,
    synopsis: 'Two strangers meet during a monsoon in Mumbai, their lives intertwining through chance encounters at the same tea stall. What begins as casual conversation evolves into a profound connection that challenges everything they thought they knew about love.',
    cast: ['Dev Patel', 'Priyanka Chopra', 'Irrfan Khan'], director: 'Mira Nair',
    posterUrl: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=1200&h=500&fit=crop',
    releaseDate: '2026-02-14', featured: true
  },
  {
    id: '3', title: 'Shadow Protocol', genre: ['Action', 'Thriller'], rating: 8.2, duration: 135,
    synopsis: 'A retired CIA operative is pulled back into the field when a ghost from her past resurfaces with a weapon capable of rewriting global intelligence networks. Racing against time across three continents, she must dismantle the conspiracy before it\'s too late.',
    cast: ['Charlize Theron', 'Idris Elba', 'Pedro Pascal'], director: 'David Leitch',
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=500&fit=crop',
    releaseDate: '2026-03-28', featured: true
  },
  {
    id: '4', title: 'The Last Garden', genre: ['Fantasy', 'Adventure'], rating: 8.5, duration: 156,
    synopsis: 'In a world where nature has retreated into a single enchanted garden, a young botanist discovers she can communicate with ancient trees that hold the secret to restoring the planet. But dark forces seek to claim the garden\'s power for themselves.',
    cast: ['Saoirse Ronan', 'Timothée Chalamet', 'Cate Blanchett'], director: 'Guillermo del Toro',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=500&fit=crop',
    releaseDate: '2026-04-01', featured: false
  },
  {
    id: '5', title: 'Neon Nights', genre: ['Crime', 'Drama'], rating: 7.6, duration: 118,
    synopsis: 'In the neon-drenched streets of Tokyo, a jazz musician gets entangled with the yakuza after witnessing a murder at an underground club. To survive, he must play the most dangerous gig of his life.',
    cast: ['John Boyega', 'Rinko Kikuchi', 'Ken Watanabe'], director: 'Park Chan-wook',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&h=500&fit=crop',
    releaseDate: '2026-01-20', featured: false
  },
  {
    id: '6', title: 'Echoes of Tomorrow', genre: ['Sci-Fi', 'Drama'], rating: 8.1, duration: 140,
    synopsis: 'A quantum physicist discovers she can send messages to her past self, but each alteration creates ripple effects that threaten to unravel the fabric of reality itself.',
    cast: ['Lupita Nyong\'o', 'Jake Gyllenhaal', 'Tilda Swinton'], director: 'Christopher Nolan',
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=500&fit=crop',
    releaseDate: '2026-03-01', featured: true
  },
  {
    id: '7', title: 'The Crimson Mask', genre: ['Horror', 'Mystery'], rating: 7.4, duration: 108,
    synopsis: 'A group of theater actors rehearsing in a century-old playhouse begin experiencing the final moments of people who died within its walls. As the line between performance and possession blurs, they must uncover the theater\'s dark secret.',
    cast: ['Anya Taylor-Joy', 'Bill Skarsgård', 'Mia Goth'], director: 'Ari Aster',
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=500&fit=crop',
    releaseDate: '2026-02-28', featured: false
  },
  {
    id: '8', title: 'Rise of Olympus', genre: ['Action', 'Fantasy'], rating: 7.8, duration: 145,
    synopsis: 'When the ancient Greek gods awaken in modern-day Athens, a young archaeologist must unite the descendants of legendary heroes to prevent an apocalyptic war between the divine and mortal realms.',
    cast: ['Henry Cavill', 'Gal Gadot', 'Oscar Isaac'], director: 'Zack Snyder',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=500&fit=crop',
    releaseDate: '2026-04-10', featured: false
  },
  {
    id: '9', title: 'Midnight Express', genre: ['Comedy', 'Adventure'], rating: 7.2, duration: 112,
    synopsis: 'A motley crew of strangers aboard the last overnight train from Paris to Istanbul must work together when a heist goes wrong and they find themselves with a stolen Picasso and no way to get rid of it.',
    cast: ['Ryan Reynolds', 'Awkwafina', 'Daniel Craig'], director: 'Guy Ritchie',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=500&fit=crop',
    releaseDate: '2026-03-20', featured: false
  },
  {
    id: '10', title: 'The Silent Sea', genre: ['Thriller', 'Mystery'], rating: 8.3, duration: 130,
    synopsis: 'A marine biologist investigating a series of whale strandings discovers an underwater signal that shouldn\'t exist. As she dives deeper, she uncovers an ancient intelligence that has been waiting beneath the waves for millennia.',
    cast: ['Emma Stone', 'Mahershala Ali', 'Benedict Cumberbatch'], director: 'Kathryn Bigelow',
    posterUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=500&fit=crop',
    releaseDate: '2026-02-01', featured: false
  },
  {
    id: '11', title: 'Painted Skies', genre: ['Animation', 'Drama'], rating: 8.9, duration: 105,
    synopsis: 'A young girl who can paint worlds into existence must journey through her own creations to find her missing mother, confronting the fears and dreams she\'s brushed onto canvas.',
    cast: ['Hailee Steinfeld', 'Robin Wright', 'Keanu Reeves'], director: 'Hayao Miyazaki',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=500&fit=crop',
    releaseDate: '2026-03-05', featured: true
  },
  {
    id: '12', title: 'Iron Will', genre: ['Sports', 'Drama'], rating: 7.7, duration: 128,
    synopsis: 'Based on a true story, a coal miner\'s daughter from Appalachia defies all odds to become the first woman to compete in the world\'s most grueling ultra-marathon across the Sahara Desert.',
    cast: ['Daisy Ridley', 'Viola Davis', 'Michael B. Jordan'], director: 'Barry Jenkins',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=500&fit=crop',
    releaseDate: '2026-01-10', featured: false
  },
];

export const theaters: Theater[] = [
  { id: 't1', name: 'CinePlex Downtown', screens: [
    { id: 's1', name: 'Screen 1 - IMAX', theaterId: 't1', rows: 10, seatsPerRow: 16 },
    { id: 's2', name: 'Screen 2', theaterId: 't1', rows: 8, seatsPerRow: 12 },
    { id: 's3', name: 'Screen 3', theaterId: 't1', rows: 8, seatsPerRow: 12 },
  ]},
  { id: 't2', name: 'StarLight Cinemas', screens: [
    { id: 's4', name: 'Screen A - Dolby', theaterId: 't2', rows: 12, seatsPerRow: 18 },
    { id: 's5', name: 'Screen B', theaterId: 't2', rows: 8, seatsPerRow: 14 },
  ]},
  { id: 't3', name: 'Galaxy Theatres', screens: [
    { id: 's6', name: 'Auditorium 1', theaterId: 't3', rows: 10, seatsPerRow: 14 },
    { id: 's7', name: 'Auditorium 2', theaterId: 't3', rows: 8, seatsPerRow: 12 },
  ]},
];

const generateShowtimes = (): Showtime[] => {
  const showtimes: Showtime[] = [];
  const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const today = new Date();
  let id = 1;

  movies.forEach(movie => {
    for (let d = 0; d < 5; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().split('T')[0];
      
      theaters.forEach(theater => {
        const screen = theater.screens[Math.floor(Math.random() * theater.screens.length)];
        const numShows = 2 + Math.floor(Math.random() * 2);
        const selectedTimes = times.sort(() => Math.random() - 0.5).slice(0, numShows);
        
        selectedTimes.forEach(time => {
          showtimes.push({
            id: `st${id++}`,
            movieId: movie.id,
            screenId: screen.id,
            theaterId: theater.id,
            theaterName: theater.name,
            screenName: screen.name,
            date: dateStr,
            time,
            price: { regular: 12, premium: 18, vip: 25 },
          });
        });
      });
    }
  });

  return showtimes;
};

export const showtimes = generateShowtimes();

export const mockBookings: Booking[] = [
  {
    id: 'BK001', userId: '1', movieId: '1', movieTitle: 'The Dark Horizon', posterUrl: movies[0].posterUrl,
    showtimeId: 'st1', showDate: '2026-03-30', showTime: '7:00 PM', theaterName: 'CinePlex Downtown', screenName: 'Screen 1 - IMAX',
    seats: [{ row: 'F', number: 7, category: 'premium' }, { row: 'F', number: 8, category: 'premium' }],
    totalPrice: 36, status: 'completed', bookedAt: '2026-03-28T10:30:00Z'
  },
  {
    id: 'BK002', userId: '1', movieId: '3', movieTitle: 'Shadow Protocol', posterUrl: movies[2].posterUrl,
    showtimeId: 'st5', showDate: '2026-04-02', showTime: '4:00 PM', theaterName: 'StarLight Cinemas', screenName: 'Screen A - Dolby',
    seats: [{ row: 'D', number: 5, category: 'regular' }, { row: 'D', number: 6, category: 'regular' }, { row: 'D', number: 7, category: 'regular' }],
    totalPrice: 36, status: 'confirmed', bookedAt: '2026-04-01T14:20:00Z'
  },
];

export const allGenres = Array.from(new Set(movies.flatMap(m => m.genre))).sort();
