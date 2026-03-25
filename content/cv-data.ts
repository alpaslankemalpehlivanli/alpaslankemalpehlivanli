export const identity = {
  name: {
    first: 'ALPASLAN',
    middle: 'KEMAL',
    last: 'PEHLİVANLI',
    monogram: 'AKP',
    full: 'Alpaslan Kemal Pehlivanlı',
  },
  role: 'GAME DESIGNER',
  studio: 'TigerOne Studios',
  location: 'Ankara, Turkey',
  email: 'alpkemalpehlivanli@gmail.com',
  linkedin: 'linkedin.com/in/alpaslankemal',
  linkedinHref: 'https://www.linkedin.com/in/alpaslankemal',
  website: 'www.tigerone.studio',
  websiteHref: 'https://www.tigerone.studio/',
  studioLinkedin: 'linkedin.com/company/tigerone-studios',
  studioLinkedinHref: 'https://www.linkedin.com/company/tigerone-studios',
  availability: 'Open to game design roles',
  tagline: 'Design the system.\nPlay the outcome.',
  intro:
    '',
}

export const skills = {
  primary: ['Unreal Engine 5', 'Game Design', 'Level Design', 'Systems Design'],
  analytics: ['KPI', 'A/B Testing', 'Retention', 'Playtesting'],
  languages: [
    { name: 'Turkish', level: 100, label: 'Native' },
    { name: 'English', level: 85, label: 'C1' },
    { name: 'Chinese', level: 20, label: 'A2 · HSK2 · 180' },
  ],
  interests: [
    'Mobile Games',
    'Computer Games',
    'Drums',
    'Chess',
    'Fencing',
    'Orienteering',
    'Football',
    'Volleyball',
    'Travelling',
  ],
}

export const experience = [
  {
    org: 'TigerOne Studios',
    role: 'Co-Founder / Game Designer',
    location: 'Ankara, Turkey',
    period: '07/2025 — Present',
    bullets: [
      'Delivered 6 playable prototypes within 6 months under strict sprint and game jam timelines, including 4 PC game prototypes and 2 mobile game prototypes focused on clear core mechanics.',
      'Designed mechanic-first gameplay systems with strong core loops, fast onboarding, and scalable progression, translating complex concepts into simple rule-based interactions adaptable to both PC and mobile formats.',
      'Structured design documentation around interaction clarity, player feedback, and friction analysis, ensuring mechanics remain intuitive and easy to understand across different platforms.',
      'Iterated mechanics through structured playtests and behavioral observation, refining engagement flow, session pacing, and replay value, with a focus on mechanics suitable for short-session mobile gameplay.',
    ],
  },
]

export const achievements = [
  {
    id: 'ggj',
    event: 'Global Game Jam GGConvention',
    rank: '1ST PLACE',
    period: '01/2026 — 02/2026',
    project: 'Trick or Admit',
    detail:
      'Led the design of Trick or Admit, an asymmetric deduction game built around evidence-driven dialogue. Delivered a playable build in 48 hours and finished 1st locally among 60 teams.',
    color: '#f59e0b',
  },
  {
    id: 'ayaz',
    event: 'AyazJam 2025',
    rank: '3RD PLACE',
    period: '12/2025',
    project: 'TUTSAK',
    detail:
      'Designed TUTSAK, a courtroom puzzle centered on evidence manipulation and player choice. Finished 3rd among 50 teams at AyazJam 2025.',
    color: '#94a3b8',
  },
  {
    id: 'loreal',
    event: "L'Oréal Brandstorm 2025",
    rank: '2ND PLACE',
    period: '11/2024 — 05/2025',
    project: 'VR Beauty Solution',
    detail:
      'Helped develop a VR-based beauty and care concept. Reached the Istanbul finals, placed 2nd among 200 teams, and finished in the top 4 overall.',
    color: '#e879f9',
  },
]

export const projects = [
  {
    id: 'tutsak',
    title: 'TUTSAK',
    subtitle: 'Narrative Courtroom Puzzle',
    tags: ['UE5', 'Narrative Design', 'Systems'],
    jam: 'AyazJam 2025',
    rank: '3rd / 50 teams',
    image: '/projects/game2/tutsak.jpeg',
    summary:
      'A courtroom puzzle where players alter trial outcomes by reinterpreting and replacing evidence.',
    situation:
      'Create a narrative courtroom game where evidence manipulation drives both puzzle solving and branching outcomes under jam constraints.',
    action:
      'Defined the butterfly-effect evidence system, structured the branching consequence logic, and focused the core loop on player choice through reinterpretation.',
    result:
      'Delivered a complete playable build and placed 3rd among 50 teams at AyazJam 2025.',
    accentColor: '#f59e0b',
    photos: [
      '/projects/game2/TUTSAK In-game visual 1.jpg',
      '/projects/game2/TUTSAK In-game visual 2.jpg',
      '/projects/game2/TUTSAK In-game visual 3.jpg',
      '/projects/game2/TUTSAK In-game visual 4.jpg',
      '/projects/game2/TUTSAK In-game Visual 5.jpg',
    ],
    links: [
      { label: 'TRAILER', href: 'https://drive.google.com/file/d/1fyNzq8WzzS_4O_7iytkbRZSmbBNRMkZG/view?usp=sharing' },
      { label: 'GAMEPLAY', href: 'https://drive.google.com/file/d/19v6xlY8YQ_Qs3_BSc5y-lPItE4TtaV6J/view' },
      { label: 'PLAY DEMO', href: 'https://fiuby.com/games/tutsak' },
    ],
  },
  {
    id: 'toa',
    title: 'TRICK OR ADMIT',
    subtitle: 'Identity & Deception System',
    tags: ['UE5', 'Asymmetric Design', 'Social'],
    jam: 'GGJ GGConvention 2026',
    rank: '1st / 60 teams',
    image: '/projects/game3/trick or admit.jpeg',
    summary:
      'A masked social deduction game built around hidden identities, suspicion management, and evidence-driven dialogue.',
    situation:
      'Build a social deduction experience that creates tension through structured dialogue and validation systems instead of randomness in 48 hours.',
    action:
      'Designed the asymmetric identity validation framework and suspicion progression rules to support bluffing, interrogation, and escalation.',
    result:
      'Delivered a complete playable build in 48 hours and ranked 1st locally among 60 teams at GGJ GGConvention 2026.',
    accentColor: '#00d4ff',
    photos: [
      '/projects/game3/TOA In-game visual 1.jpg',
      '/projects/game3/TOA In-game visual 2.jpg',
      '/projects/game3/TOA In-game visual 3.jpg',
      '/projects/game3/TOA In-game visual 4.jpg',
      '/projects/game3/TOA In-game visual 5.jpg',
      '/projects/game3/TOA In-game visual 6.png',
    ],
    links: [
      { label: 'PLAY DEMO', href: 'https://globalgamejam.org/games/2026/trick-or-admit-2' },
    ],
  },
  {
    id: 'magtwin',
    title: 'MAGTWIN',
    subtitle: 'Asymmetric Co-op Magnetic Puzzle Shooter',
    tags: ['UE5', 'Co-op', 'Physics Systems'],
    jam: 'Independent',
    rank: '',
    image: '/projects/game1/mag_twin.png',
    summary:
      'An asymmetric co-op puzzle shooter where two charged creatures rely on polarity and synchronized movement to progress.',
    situation:
      'Design a co-op prototype where attraction-repulsion rules drive both combat space and puzzle solving.',
    action:
      'Implemented the polarity rule system and built the interdependent puzzle framework around synchronized spatial coordination.',
    result:
      'Produced a complete co-op prototype demonstrating tight asymmetric collaboration as the main gameplay pillar.',
    accentColor: '#e879f9',
    photos: [
      '/projects/game1/MAGTWIN In-game visual 1.png',
      '/projects/game1/MAGTWIN In-game visual 2.png',
      '/projects/game1/MAGTWIN In-game visual 3.png',
      '/projects/game1/MAGTWIN In-game visual 4.png',
      '/projects/game1/MAGTWIN In-game visual 5.png',
    ],
    links: [
      { label: 'TRAILER', href: 'https://www.youtube.com/watch?v=2goX_wX7Sjc' },
    ],
  },
  {
    id: 'ilunia',
    title: 'ILUNIA',
    subtitle: 'Co-op Psychological Puzzle Experience',
    tags: ['UE5', 'Co-op', 'Perception Design'],
    jam: 'Independent',
    rank: '',
    image: '/projects/game4/project_ilunia.png',
    summary:
      'A co-op psychological puzzle where two players see the world differently — communication is the only way to solve it.',
    situation:
      'Design a co-op experience where asymmetric information forces players to communicate: each player receives different clues, symbols, and environmental details.',
    action:
      'Built the split-perception framework so each player sees a different version of the world, and designed cooperative mechanics around describing, cross-referencing, and interpreting shared symbols.',
    result:
      'Produced a complete co-op prototype where communication is the core mechanic, creating a mysterious atmosphere built on cooperation, perception, and shared problem solving.',
    accentColor: '#6366f1',
    photos: [
      '/projects/game4/ILUNIA 1.jpeg',
      '/projects/game4/ILUNIA 2.jpeg',
      '/projects/game4/ILUNIA 3.jpeg',
      '/projects/game4/ILUNIA 4.jpeg',
      '/projects/game4/ILUNIA 5.jpeg',
      '/projects/game4/ILUNIA 6.jpeg',
      '/projects/game4/ILUNIA 7.jpeg',
      '/projects/game4/Odayı İzleyen Göz Concept (1).png',
      '/projects/game4/malikane baslangic.jpeg',
      '/projects/game4/kanli agac yeni baslangic.jpeg',
      '/projects/game4/tarikatin gozu yeni baslangic.jpeg',
    ],
    links: [
      { label: 'GAMEPLAY', href: 'https://drive.google.com/file/d/1Q3pJTGQmIhLe-6M33GN-pFGF_WGWgrOr/view?usp=sharing' },
    ],
  },
]

export const education = {
  institution: 'Middle East Technical University',
  location: 'Ankara, Turkey',
  degree: 'Bachelor of Science — Industrial Engineering',
  year: '3rd Year Student',
  period: '10/2021 — Present',
  note: 'Systems thinking from IE applied to game mechanics design.',
}
