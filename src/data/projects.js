// image: path inside /public. imagePosition: CSS object-position for the card crop.
export const PROJECTS = [
  {
    id: 'skylink',
    title: 'SkyLink',
    category: 'Real Project',
    tags: ['FPV Platform', 'Web App', 'Fullstack'],
    url: 'https://www.skylinkfpv.pp.ua/',
    image: '/images/skylink.png',
    imagePosition: '40% center',
  },
  {
    id: 'granthub',
    title: 'GrantHub UA',
    category: 'Exploration',
    tags: ['NestJS', 'Next.js', 'Hackathon'],
    url: 'https://platform-for-grants.vercel.app/',
    image: '/images/granthub.png',
    imagePosition: 'top left',
  },
]

// Filters are built from the categories that actually have projects.
export const FILTERS = ['All', ...new Set(PROJECTS.map((p) => p.category))]