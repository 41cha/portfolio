// Descriptions are based on the CV facts in CLAUDE.md. Do not add technologies
// or projects that are not listed there.
export const SERVICES = [
  {
    id: 'fullstack',
    title: 'FULLSTACK DEVELOPMENT',
    description:
        'Web apps from the database to the interface: React, Node.js, Express and MongoDB. From idea to deployment.',
    // The main service: marked with a badge and shown with its stack by group
    // (groups replace the tags). Only technologies from the CV facts.
    badge: 'Main focus',
    groups: [
      { label: 'Frontend', items: ['React'] },
      { label: 'Backend', items: ['Node.js', 'Express'] },
      { label: 'Database', items: ['MongoDB'] },
      { label: 'Tools', items: ['Docker', 'Git'] },
    ],
  },
  {
    id: 'web-apps',
    title: 'WEB APPS & AUTOMATION',
    description:
        'Web platforms that automate routine work. For example, the GrantHUB UA parser that collects startup funding opportunities from many sources into one database, built with NestJS and Next.js.',
    tags: ['Next.js', 'NestJS', 'Python'],
  },
]
