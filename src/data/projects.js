// image: path inside /public. imagePosition: CSS object-position for the card crop.
// status: optional note shown on the card (e.g. a closed project).
export const PROJECTS = [
  {
    id: 'skylink',
    title: 'SkyLink',
    category: 'Startup project',
    role: 'Team Lead & Fullstack Developer · Team of 4',
    description:
      'FPV racing platform built inside a university startup. Tournaments, rankings, news and simulator integration for 84 pilots.',
    tags: ['JavaScript', 'React', 'Express', 'Node.js'],
    status: 'No longer maintained',
    url: 'https://www.skylinkfpv.pp.ua/',
    image: '/images/skylink.webp',
    imagePosition: 'center top',
  },
  {
    id: 'granthub',
    title: 'GrantHub UA',
    category: 'Hackathon',
    role: 'Team Lead, Fullstack, QA & DevOps · Team of 6',
    description:
      'Built at the IV Ukrainian Hackathon of Intellectual Capital Development. An automated parser collects startup funding opportunities into one database.',
    tags: ['NestJS', 'Next.js'],
    status: 'Demo frontend only: the backend is offline',
    url: 'https://platform-for-grants.vercel.app/',
    image: '/images/granthub.png',
    imagePosition: 'center top',
  },
]

// Filters are built from the categories that actually have projects.
export const FILTERS = ['All', ...new Set(PROJECTS.map((p) => p.category))]
