export const courses = [
  {
    id: 'frontend-web-development',
    title: 'Front-End Web Development',
    description: 'Learn to build beautiful, responsive websites and web applications from scratch. Master HTML, CSS, JavaScript, and modern frameworks like React. Taught by experienced developers with real-world project experience.',
    duration: '4 months',
    price: '180,000',
    level: 'Beginner to Intermediate',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    features: [
      'HTML5 & CSS3 fundamentals',
      'JavaScript (ES6+) programming',
      'Responsive design with Tailwind CSS / Bootstrap',
      'React.js for modern web apps',
      'Version control with Git & GitHub',
      'Deploy your projects live'
    ],
    curriculum: [
      { week: 1, title: 'HTML & CSS Foundations', topics: ['HTML5 elements', 'Forms & inputs', 'Semantic HTML', 'Selectors & box model', 'Flexbox & Grid'] },
      { week: 2, title: 'Responsive Design & JavaScript Basics', topics: ['Media queries', 'Mobile-first design', 'Tailwind CSS', 'Variables & functions', 'DOM manipulation'] },
      { week: 3, title: 'JavaScript Advanced & React', topics: ['Events & APIs', 'Async/Await', 'React components', 'Props & state', 'Hooks'] },
      { week: 4, title: 'Project & Deployment', topics: ['Portfolio website', 'Git & GitHub', 'Live deployment', 'Final project', 'Career tips'] }
    ]
  },
  {
    id: 'backend-web-development-deployment',
    title: 'Back-End Web Development & Deployment',
    description: 'Master server-side development and build powerful APIs and web applications. Learn Node.js, databases, authentication, and cloud deployment. Ideal for those who want to build the engine behind web apps.',
    duration: '6 months',
    price: '240,000',
    level: 'Intermediate',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    features: [
      'Node.js & Express.js',
      'RESTful API design',
      'MongoDB & MySQL databases',
      'Authentication & authorization',
      'Cloud deployment (Heroku, Vercel, Railway)',
      'Real-world project portfolio'
    ],
    curriculum: [
      { week: 1, title: 'Node.js Fundamentals', topics: ['Runtime environment', 'NPM', 'Modules'] },
      { week: 2, title: 'Express.js & APIs', topics: ['Routing', 'Middleware', 'REST API structure'] },
      { week: 3, title: 'Databases', topics: ['MongoDB schemas', 'CRUD operations', 'MySQL & SQL joins'] },
      { week: 4, title: 'Authentication & Security', topics: ['JWT', 'Sessions', 'OAuth basics'] },
      { week: 5, title: 'Advanced APIs & Testing', topics: ['File uploads', 'Email integration', 'Unit testing'] },
      { week: 6, title: 'Deployment & Final Project', topics: ['Cloud hosting', 'Full-stack project', 'Code review & portfolio'] }
    ]
  },
  {
    id: 'project-management-digital-tools',
    title: 'Project Management – Digital Tools',
    description: 'Build in-demand project management skills using modern digital tools. Master planning, execution, team collaboration, and reporting with industry-standard software used by organisations worldwide.',
    duration: '6 months',
    price: '180,000',
    level: 'Beginner to Intermediate',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    features: [
      'Project planning & scheduling',
      'Agile & Scrum fundamentals',
      'Jira, Trello & Asana',
      'Gantt charts & MS Project',
      'Team collaboration tools (Slack, Teams)',
      'Reporting & stakeholder communication'
    ],
    curriculum: [
      { week: 1, title: 'Project Management Fundamentals', topics: ['Project lifecycle', 'Scope & objectives', 'Stakeholders'] },
      { week: 2, title: 'Planning & Scheduling', topics: ['Work breakdown structure', 'Gantt charts', 'MS Project'] },
      { week: 3, title: 'Agile & Scrum', topics: ['Sprints & backlog', 'Scrum ceremonies', 'Jira & Trello'] },
      { week: 4, title: 'Collaboration Tools', topics: ['Slack', 'MS Teams', 'Google Workspace'] },
      { week: 5, title: 'Budget, Risk & Reporting', topics: ['Cost tracking', 'Risk registers', 'Dashboards & reports'] },
      { week: 6, title: 'Capstone Project', topics: ['End-to-end project simulation', 'Final presentation', 'Career pathways'] }
    ]
  },
  {
    id: 'computer-applications-office-productivity',
    title: 'Computer Applications & Office Productivity',
    description: 'Master essential computer applications for the modern workplace. Become highly productive with Microsoft Office, email, cloud tools, and efficient file management — perfect for beginners and job seekers.',
    duration: '4 months',
    price: '120,000',
    level: 'Beginner',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    features: [
      'Windows & file management',
      'Microsoft Word (documents & mail merge)',
      'Microsoft Excel (formulas, charts, pivot tables)',
      'PowerPoint presentations',
      'Email & Google Workspace',
      'Cloud storage & online collaboration'
    ],
    curriculum: [
      { week: 1, title: 'Computer Basics & Windows', topics: ['Hardware vs software', 'Operating systems', 'File management'] },
      { week: 2, title: 'Microsoft Word', topics: ['Document creation', 'Formatting & styles', 'Templates & mail merge'] },
      { week: 3, title: 'Microsoft Excel', topics: ['Spreadsheets', 'Formulas & functions', 'Charts & pivot tables'] },
      { week: 4, title: 'PowerPoint, Email & Cloud', topics: ['Professional presentations', 'Email basics', 'Google Workspace & cloud'] }
    ]
  },
  {
    id: 'graphic-design-visual-communication',
    title: 'Graphic Design & Visual Communication',
    description: 'Create stunning visual content using industry-standard tools. Learn design principles, typography, logo design, and multimedia production from experienced creative professionals.',
    duration: '6 months',
    price: '160,000',
    level: 'Beginner to Intermediate',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    features: [
      'Adobe Photoshop & Illustrator',
      'Design principles & color theory',
      'Typography & layout',
      'Logo & brand identity design',
      'Social media graphics',
      'Video editing basics'
    ],
    curriculum: [
      { week: 1, title: 'Design Fundamentals', topics: ['Color theory', 'Typography', 'Layout principles'] },
      { week: 2, title: 'Adobe Photoshop', topics: ['Layers', 'Selections', 'Photo editing'] },
      { week: 3, title: 'Adobe Illustrator', topics: ['Vector graphics', 'Pen tool', 'Logo design'] },
      { week: 4, title: 'Brand Identity', topics: ['Logo design', 'Brand guidelines', 'Mockups'] },
      { week: 5, title: 'Social Media & Video', topics: ['Social media templates', 'Premiere Pro basics'] },
      { week: 6, title: 'Portfolio Project', topics: ['Complete design project', 'Portfolio creation'] }
    ]
  },
  {
    id: 'ai-productivity-career-growth',
    title: 'Artificial Intelligence for Productivity & Career Growth',
    description: 'Unlock the power of AI to work smarter and grow your career. Learn practical AI tools for writing, research, design, data analysis, and automation. This is a BONUS course — FREE when you register for any other course.',
    duration: '2 months',
    price: '80,000',
    level: 'Beginner',
    mode: 'hybrid',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
    bonus: true,
    features: [
      'AI fundamentals & ethics',
      'ChatGPT & prompt engineering',
      'AI for writing & research',
      'AI for design & presentations',
      'AI for data & spreadsheets',
      'Automation & career growth'
    ],
    curriculum: [
      { week: 1, title: 'AI Foundations & Prompting', topics: ['What is AI', 'ChatGPT & tools', 'Prompt engineering', 'AI ethics & limits'] },
      { week: 2, title: 'AI in Practice', topics: ['AI for documents', 'AI for spreadsheets & data', 'AI for design & slides', 'Automation & final project'] }
    ]
  }
];

export const getCourseById = (id) => courses.find(course => course.id === id);
