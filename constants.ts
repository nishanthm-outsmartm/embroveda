
import { Product, Review } from './types';

export const CATEGORIES = [
  { id: 'all', label: '🔥 All Drops' },
  { id: 'oversized', label: '👕 Oversized' },
  { id: 'embroidery', label: '🧵 Embroidery' },
  { id: 'myth-pop', label: '⚡ Myth Pop' },
  { id: 'capsule', label: '🪐 Capsule' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hanuman Strength Tee',
    price: 45,
    category: 'Oversized',
    // Black T-shirt front view mockup vibe
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    // Detail/Lifestyle shot
    hoverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight cotton jersey with high-density puff print. Features the lifting of the mountain Sanjeevani.',
    mythStory: 'The Mountain Lifter. When all hope was lost, Hanuman brought the Sanjeevani hill. Wear this when you need to carry the team.',
    tags: ['Best Seller', 'Puff Print'],
    soundProfile: 'wind',
    oracleTraits: ['wind', 'power', 'protection'],
  },
  {
    id: '2',
    name: 'Kali Fury Set',
    price: 85,
    category: 'Capsule',
    // Streetwear set / fashion model
    image: 'https://images.unsplash.com/photo-1529139574466-a302d27524d4?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1550614000-4b9519e09968?auto=format&fit=crop&w=800&q=80',
    description: 'Two-piece coordinated set. Acid wash finish with neon embroidery detailing.',
    mythStory: 'Destroyer of Ego. Kali represents raw, untamed nature. This set is for those who refuse to be tamed.',
    tags: ['Limited Drop', 'Embroidery'],
    soundProfile: 'drum',
    oracleTraits: ['void', 'chaos', 'noise'],
  },
  {
    id: '3',
    name: 'Garuda Flight Jacket',
    price: 120,
    category: 'Capsule',
    // Bomber jacket / streetwear layer
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80',
    description: 'Reversible bomber jacket featuring intricate wing embroidery on the back.',
    mythStory: 'King of Birds. Garuda flies faster than thought. Symbolizes freedom and the power to strike from above.',
    tags: ['New Arrival'],
    soundProfile: 'wind',
    oracleTraits: ['wind', 'freedom', 'speed'],
  },
  {
    id: '4',
    name: 'Veda Minimal Hoodie',
    price: 65,
    category: 'Oversized',
    // Hoodie
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1617391764311-6b83f3607065?auto=format&fit=crop&w=800&q=80',
    description: 'Premium french terry hoodie with Sanskrit script embroidery on the hood rim.',
    mythStory: 'Ancient Wisdom. Inspired by the Rig Veda. Sometimes the loudest statement is silence.',
    tags: ['Essential'],
    soundProfile: 'hover',
    oracleTraits: ['void', 'silence', 'wisdom'],
  },
  {
    id: '5',
    name: 'Nataraja Cosmic Tee',
    price: 48,
    category: 'Myth Pop',
    // Graphic tee vibe
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80',
    description: 'Neon outline print of the cosmic dancer on bio-washed black fabric.',
    mythStory: 'The Cosmic Dancer. Shiva dances the universe into existence and destruction. Rhythm is everything.',
    tags: ['Trending', 'Glow in Dark'],
    soundProfile: 'drum',
    oracleTraits: ['fire', 'rhythm', 'creation'],
  }
];

export const REVIEWS: Review[] = [
  { id: '1', user: 'Aarav P.', rating: 5, comment: 'The embroidery quality is insane. Feels like luxury streetwear. 10/10 would cop again.', image: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', user: 'Diya K.', rating: 5, comment: 'Packaging was an experience in itself. Loved the myth card! It’s giving main character energy.', image: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', user: 'Rohan M.', rating: 4, comment: 'Fit is perfectly oversized. Buying the Kali set next.' },
];

export const QUIZ_DATA = [
  {
    question: "Which weapon does Lord Shiva hold?",
    options: ["Sudarshana Chakra", "Trishul", "Gada", "Bow"],
    correct: 1
  },
  {
    question: "What is the vehicle (Vahana) of Ganesh?",
    options: ["Peacock", "Lion", "Mouse", "Bull"],
    correct: 2
  },
  {
    question: "Who is the architect of the Gods?",
    options: ["Vishwakarma", "Indra", "Agni", "Varuna"],
    correct: 0
  }
];

export const BATTLE_CONTENDERS = [
  {
    id: 'indra',
    name: 'INDRA THUNDER',
    description: 'Oversized electric blue wash with silver lightning embroidery.',
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=800&q=80', // Streetwear hoodie vibe
    theme: 'blue',
    votes: 1240
  },
  {
    id: 'agni',
    name: 'AGNI INFERNO',
    description: 'Distressed crimson tee with flame gradient puff print.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', // Model in red light/fashion
    theme: 'red',
    votes: 1150
  }
];

export const ORACLE_QUESTIONS = [
  {
    id: 1,
    question: "Choose your Element",
    options: [
      { label: "Fire (Passion)", trait: "fire" },
      { label: "Void (Unknown)", trait: "void" },
      { label: "Wind (Motion)", trait: "wind" }
    ]
  },
  {
    id: 2,
    question: "Choose your Sound",
    options: [
      { label: "Silence (Subtlety)", trait: "silence" },
      { label: "Noise (Chaos)", trait: "noise" },
      { label: "Rhythm (Flow)", trait: "rhythm" }
    ]
  },
  {
    id: 3,
    question: "What do you seek?",
    options: [
      { label: "Power", trait: "power" },
      { label: "Freedom", trait: "freedom" },
      { label: "Wisdom", trait: "wisdom" }
    ]
  }
];
