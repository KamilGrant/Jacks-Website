export const SITE = {
  name: 'JD Brickwork',
  tagline: 'Built to Last. Crafted with Pride.',
  sub: 'Expert bricklaying, stonework and construction services delivered on time, on budget, and built right.',
  phone: '0400 000 000',          // PLUG & PLAY
  email: 'info@jdbrickwork.com.au', // PLUG & PLAY
  area: 'Greater Melbourne & Surrounds', // PLUG & PLAY
  hours: 'Mon–Fri: 7am–5pm  |  Sat: 8am–12pm',
  facebook: '#',   // PLUG & PLAY
  instagram: '#',  // PLUG & PLAY
  google: '#',     // PLUG & PLAY
  established: '2009',
  yearsExp: 15,
  projects: 500,
  reviews: 50,
};

export const SERVICES = [
  {
    id: 'new-build',
    icon: 'Building2',
    title: 'New Build Brickwork',
    desc: 'Full structural brickwork for new residential and commercial builds, from footings to roofline.',
    from: 'From $280/m²',
  },
  {
    id: 'restoration',
    icon: 'RotateCcw',
    title: 'Restoration & Repointing',
    desc: 'Expert repointing, tuckpointing and heritage restoration to bring old brickwork back to life.',
    from: 'From $95/m²',
  },
  {
    id: 'feature',
    icon: 'Layers',
    title: 'Feature Walls & Paving',
    desc: 'Stunning feature walls, garden beds and paving that add character and value to your property.',
    from: 'From $180/m²',
  },
  {
    id: 'retaining',
    icon: 'Shield',
    title: 'Retaining Walls',
    desc: 'Structurally sound retaining walls designed to handle load while looking great on any site.',
    from: 'From $220/m²',
  },
  {
    id: 'fireplace',
    icon: 'Flame',
    title: 'Fireplaces & BBQs',
    desc: 'Custom-built brick fireplaces, pizza ovens and outdoor BBQ areas to complete your living space.',
    from: 'From $3,500',
  },
  {
    id: 'extension',
    icon: 'HardHat',
    title: 'Extensions & Renovations',
    desc: 'Seamless brick extensions and renovations that match your existing structure perfectly.',
    from: 'From $280/m²',
  },
];

export const GALLERY_ITEMS = [
  // PLUG & PLAY — replace src with real client images and update category/title
  { id: 1, src: '/images/gallery/g1.jpg', category: 'new-build',   title: 'Residential New Build',    alt: 'New build brickwork'       },
  { id: 2, src: '/images/gallery/g2.jpg', category: 'feature',     title: 'Feature Garden Wall',       alt: 'Feature wall brickwork'    },
  { id: 3, src: '/images/gallery/g3.jpg', category: 'restoration', title: 'Heritage Restoration',      alt: 'Heritage restoration'      },
  { id: 4, src: '/images/gallery/g4.jpg', category: 'outdoor',     title: 'Outdoor BBQ Area',          alt: 'Outdoor BBQ brickwork'     },
  { id: 5, src: '/images/gallery/g5.jpg', category: 'new-build',   title: 'Commercial Build',          alt: 'Commercial brickwork'      },
  { id: 6, src: '/images/gallery/g6.jpg', category: 'feature',     title: 'Garden Retaining Wall',     alt: 'Garden retaining wall'     },
  { id: 7, src: '/images/gallery/g7.jpg', category: 'outdoor',     title: 'Paved Driveway',            alt: 'Paved driveway'            },
  { id: 8, src: '/images/gallery/g8.jpg', category: 'restoration', title: 'Repointing Project',        alt: 'Repointing brickwork'      },
];

export const GALLERY_FILTERS = [
  { key: 'all',         label: 'All'           },
  { key: 'new-build',  label: 'New Build'      },
  { key: 'restoration',label: 'Restoration'    },
  { key: 'feature',    label: 'Feature Walls'  },
  { key: 'outdoor',    label: 'Outdoor'        },
];

export const TESTIMONIALS = [
  // PLUG & PLAY — replace with real client reviews
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Homeowner, Melbourne',
    initials: 'S',
    text: '"JD Brickwork transformed our front garden with a stunning feature wall. The team was professional, tidy and finished ahead of schedule. Couldn\'t be happier with the result."',
  },
  {
    id: 2,
    name: 'Tom R.',
    location: 'Property Developer',
    initials: 'T',
    text: '"Used JD Brickwork for a large commercial project. Their attention to detail, quality of work and communication throughout the entire build was second to none."',
  },
  {
    id: 3,
    name: 'Linda K.',
    location: 'Heritage Homeowner',
    initials: 'L',
    text: '"Our old brick fireplace was crumbling and JD Brickwork restored it beautifully. They matched the original brick perfectly. Exceptional craftsmen who clearly love their trade."',
  },
  {
    id: 4,
    name: 'Mark D.',
    location: 'Homeowner, Sydney',
    initials: 'M',
    text: '"Got three quotes and chose JD Brickwork — best value and by far the most professional. The retaining wall they built has completely transformed our backyard."',
  },
];

export const PROCESS_STEPS = [
  { num: '01', title: 'Get in Touch',    desc: 'Call us or fill in our contact form. We\'ll get back to you within 24 hours.' },
  { num: '02', title: 'Free Site Visit', desc: 'We come to you, assess the job and provide a detailed, no-obligation quote.'    },
  { num: '03', title: 'We Get to Work',  desc: 'Our team arrives on time and delivers quality work from start to finish.'       },
  { num: '04', title: 'Final Sign-Off',  desc: 'We walk through the completed job together — not done until you\'re happy.'    },
];
