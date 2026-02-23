// Generate 200+ sample images
export const generateImages = () => {
  const images = [];
  for (let i = 1; i <= 200; i++) {
    images.push({
      id: i,
      src: `/images/memory${i}.jpg`, // Local images folder
      thumbnail: `/images/thumbnails/memory${i}.jpg`,
      caption: `Beautiful Memory ${i}`,
      date: `202${Math.floor(i/50)}`,
      location: ['Sunset Beach', 'Rose Garden', 'City Lights', 'Mountain View'][i % 4]
    });
  }
  return images;
};

// Music Playlist
export const playlist = [
  {
    id: 1,
    title: "Romantic Memories",
    artist: "Love Orchestra",
    src: "/music/track1.mp3"
  },
  {
    id: 2,
    title: "Love Story",
    artist: "String Ensemble",
    src: "/music/track2.mp3"
  },
  {
    id: 3,
    title: "Eternal Love",
    artist: "Piano & Strings",
    src: "/music/track3.mp3"
  },
  {
    id: 4,
    title: "Sweet Moments",
    artist: "Romantic Classics",
    src: "/music/track4.mp3"
  },
  {
    id: 5,
    title: "Heart's Melody",
    artist: "Symphony of Love",
    src: "/music/track5.mp3"
  }
];

// Rotating Messages
export const appreciationMessages = [
  { id: 1, text: "You light up my world", emoji: "✨" },
  { id: 2, text: "Every moment with you is magic", emoji: "💫" },
  { id: 3, text: "You're the reason I believe in love", emoji: "❤️" },
  { id: 4, text: "My heart beats for you", emoji: "💝" },
  { id: 5, text: "You make every day special", emoji: "🌹" },
  { id: 6, text: "Forever grateful for you", emoji: "💕" },
  { id: 7, text: "You're my greatest blessing", emoji: "🌟" },
  { id: 8, text: "With you, every day is a celebration", emoji: "🎉" },
  { id: 9, text: "You're the poetry in my heart", emoji: "📜" },
  { id: 10, text: "My love for you grows daily", emoji: "🌱" }
];

// Color Scheme (for reference)
export const colors = {
  deepRose: '#2d1a1a',
  blushPink: '#ffb6c1',
  warmGold: '#ffd700',
  softPeach: '#ffd7b0',
  darkGradient: 'linear-gradient(135deg, #1a0b0b 0%, #2d1a1a 50%, #1f1212 100%)'
};