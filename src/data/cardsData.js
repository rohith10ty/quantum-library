export const INTRO_CARDS = [
  {
    id: 'intro-1',
    img: '/img/1.jpg',
    title: 'AI Horizons',
    subtitle: 'Beyond Human Limits',
    meta: 'V1.0',
    description: 'Explore the future where AI transforms imagination into reality.',
    rarity: 'Legendary',
    power: '99.4%',
    dimension: 'Quantum Core',
  },
  {
    id: 'intro-2',
    img: '/img/2.jpg',
    title: 'Tech Odyssey',
    subtitle: 'Unveiling Tomorrow',
    meta: 'V2.0',
    description: 'Embark on a journey into the realm of cutting-edge technology reshaping our world.',
    rarity: 'Mythic',
    power: '97.8%',
    dimension: 'Cyber Mesh',
  },
  {
    id: 'intro-3',
    img: '/img/3.jpg',
    title: 'Digital Frontiers',
    subtitle: 'Pushing Boundaries',
    meta: 'V3.0',
    description: 'Enter the realm where innovation meets possibility, shaping the future of humanity.',
    rarity: 'Rare',
    power: '94.2%',
    dimension: 'Hyper Grid',
  },
  {
    id: 'intro-4',
    img: '/img/4.jpg',
    title: 'AI Nexus',
    subtitle: 'Bridging Realms',
    meta: 'V4.0',
    description: 'Dive into the interconnected world of AI, where algorithms shape the future of human experience.',
    rarity: 'Epic',
    power: '96.5%',
    dimension: 'Neural Node',
  },
  {
    id: 'intro-5',
    img: '/img/5.jpg',
    title: 'AI Innovate',
    subtitle: 'Pioneering Tomorrow',
    meta: 'V5.0',
    description: 'Join the forefront of AI innovation, where creativity meets computational intelligence to shape a better future.',
    rarity: 'Cosmic',
    power: '98.9%',
    dimension: 'Singularity',
  },
  {
    id: 'intro-6',
    img: '/img/6.jpg',
    title: 'AI Horizons',
    subtitle: 'Beyond Human Limits',
    meta: 'V6.0',
    description: 'Explore the future where AI transforms imagination into reality.',
    rarity: 'Legendary',
    power: '95.1%',
    dimension: 'Sub-Zero',
  },
  {
    id: 'intro-7',
    img: '/img/7.jpg',
    title: 'AI Frontier',
    subtitle: 'Exploring New Horizons',
    meta: 'V7.0',
    description: 'Venture into uncharted territories where AI blazes trails towards unprecedented possibilities.',
    rarity: 'Ancient',
    power: '98.1%',
    dimension: 'Omni Stream',
  },
  {
    id: 'intro-8',
    img: '/img/8.jpg',
    title: 'AI Visionary',
    subtitle: 'Envisioning Tomorrow',
    meta: 'V8.0',
    description: 'Embrace the visionary realm of AI, where dreams of the future become the reality of today.',
    rarity: 'Celestial',
    power: '99.0%',
    dimension: 'Ether Plane',
  },
  {
    id: 'intro-9',
    img: '/img/9.jpg',
    title: 'AI Odyssey',
    subtitle: 'Journey to Tomorrow',
    meta: 'V9.0',
    description: 'Embark on an epic odyssey through the realms of AI, where innovation knows no bounds.',
    rarity: 'Artifact',
    power: '99.9%',
    dimension: 'Genesis Core',
  },
];

// Helper to generate 27 cards cycling 1.jpg -> 9.jpg 3 times
export const generateStackCards = (sectionPrefix) => {
  const cards = [];
  const baseData = [
    { title: 'AI Horizons', subtitle: 'Beyond Human Limits', tag: 'Alpha' },
    { title: 'Tech Odyssey', subtitle: 'Unveiling Tomorrow', tag: 'Beta' },
    { title: 'Digital Frontiers', subtitle: 'Pushing Boundaries', tag: 'Gamma' },
    { title: 'AI Nexus', subtitle: 'Bridging Realms', tag: 'Delta' },
    { title: 'AI Innovate', subtitle: 'Pioneering Tomorrow', tag: 'Epsilon' },
    { title: 'Neural Matrix', subtitle: 'Subconscious Synthesis', tag: 'Zeta' },
    { title: 'AI Frontier', subtitle: 'Exploring New Horizons', tag: 'Eta' },
    { title: 'AI Visionary', subtitle: 'Envisioning Tomorrow', tag: 'Theta' },
    { title: 'AI Odyssey', subtitle: 'Journey to Tomorrow', tag: 'Iota' },
  ];

  for (let repeat = 0; repeat < 3; repeat++) {
    for (let i = 1; i <= 9; i++) {
      const idx = cards.length;
      const info = baseData[i - 1];
      cards.push({
        id: `${sectionPrefix}-card-${idx + 1}`,
        index: idx,
        img: `/img/${i}.jpg`,
        title: info.title,
        subtitle: info.subtitle,
        meta: `V${i}.${repeat + 1}`,
        tag: info.tag,
        description: `Cybernetic token #${idx + 1} locked into spatial matrix. Dynamic scroll reactive state active.`,
      });
    }
  }
  return cards;
};

export const STACK_SECTIONS = [
  {
    id: 'section-1',
    hash: 'frontier',
    title: 'A New Frontier',
    subtitle: 'Curved Arc Splay',
    tag: '#01 ARC SPLAY',
    description: 'High-velocity arc rotation traversing depth space with progressive splay stagger.',
    cardsCount: 27,
    effectType: 'effect-1',
    accentColor: '#d09df2',
  },
  {
    id: 'section-2',
    hash: 'chronicles',
    title: 'Chronicles of Circuitry',
    subtitle: 'Spiral Twist Vortex',
    tag: '#02 360 VORTEX',
    description: 'Dynamic pitch rotation spinning across 360 degrees in deep perspective z-axis.',
    cardsCount: 27,
    effectType: 'effect-2',
    accentColor: '#9df2eb',
  },
  {
    id: 'section-3',
    hash: 'synthetica',
    title: 'Synthetica Sapiens',
    subtitle: 'Diagonal Wave Splay',
    tag: '#03 OBLIQUE DRIFT',
    description: 'Tri-axial compound rotation with inverted y-velocity and high angular displacement.',
    cardsCount: 27,
    effectType: 'effect-3',
    accentColor: '#f5e2a4',
  },
];

export const COLOR_PALETTE = [
  '#d09df2',
  '#9df2eb',
  '#f5e2a4',
  '#d09df2',
  '#9dcaf2',
  '#f29dcc',
];
