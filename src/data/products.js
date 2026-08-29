export const reportTube = {
  name: 'ReportTube',
  tagline: 'Automate School Reports — Built on Google Workspace',
  description: 'ReportTube is a Google Workspace add-on that streamlines and automates school report generation. It runs directly inside Google Sheets — no software to install, no servers to maintain. Just install, configure, and generate professional reports in minutes.',
  googleIntegration: 'Works with your existing Google account. Install from the Google Workspace Marketplace and start generating reports immediately — right inside Google Sheets.',
  features: [
    {
      title: 'Built on Google Workspace',
      description: 'Runs inside Google Sheets and Docs — no extra software to install. Works in your browser on any device.'
    },
    {
      title: 'Smart Templates',
      description: 'Create and customize report templates for different class levels and subjects using familiar Google Sheets.'
    },
    {
      title: 'Auto Grading',
      description: 'Automatic grade calculations based on your custom grading system, powered by Google Sheets formulas.'
    },
    {
      title: 'Bulk Generation',
      description: 'Generate reports for entire classes or schools in minutes, not hours.'
    },
    {
      title: 'Export & Share',
      description: 'Export to PDF, print directly, or share via Google Docs and email to parents instantly.'
    },
    {
      title: 'Student Database',
      description: 'Maintain comprehensive student records in Google Sheets with easy search, filter, and sorting.'
    }
  ],
  pricing: [
    {
      name: 'Basic',
      price: '50,000',
      period: 'one-time',
      features: [
        'Up to 100 students',
        '3 report templates',
        'PDF export',
        'Google Sheets integration',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '150,000',
      period: 'one-time',
      features: [
        'Up to 500 students',
        'Unlimited templates',
        'PDF & Google Docs export',
        'Advanced analytics',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '300,000',
      period: 'one-time',
      features: [
        'Unlimited students',
        'Unlimited templates',
        'All export options',
        'Full analytics suite',
        '24/7 support',
        'Custom branding',
        'Multi-school management',
        'Free lifetime updates'
      ]
    }
  ],
  paymentNote: 'One-time payment — pay once, use forever. Free updates included.',
  screenshots: [],
  testimonials: [
    {
      name: 'Proprietor, Chrisdem Nursery & Primary School',
      role: 'Ibadan',
      text: 'ReportTube has completely transformed how we prepare term reports. What used to take us several days of manual work now takes just a few hours. Our teachers love it and the parents are impressed with the professional reports.'
    },
    {
      name: 'Proprietor, As Sabbaq Model School',
      role: 'Ibadan',
      text: 'We switched to ReportTube and it has been a game-changer for our school. The Google Sheets integration means we don\'t need any special software — it just works. Highly recommend it to every school!'
    },
    {
      name: 'Proprietor, Al-Furqan Islamic School',
      role: 'Ibadan',
      text: 'As an Islamic school, we needed something flexible that could handle our unique grading system. ReportTube handled it perfectly. The support team was very helpful in setting everything up for us.'
    }
  ]
};

export const cbtTube = {
  name: 'CBT Tube',
  tagline: 'Computer-Based Testing — Built on Google Workspace',
  description: 'CBT Tube is a Google Workspace add-on that enables schools to conduct computer-based examinations effortlessly. Import questions via Google Forms, auto-generate exams with Apps Script, and get instant marked results with powerful analytics.',
  googleIntegration: 'Built on Google Workspace — questions are imported through Google Forms and Apps Script auto-generates exams in seconds. No complex software to install, just use your existing Google account.',
  features: [
    {
      title: 'Built on Google Workspace',
      description: 'Runs inside Google Forms and Sheets — leverage the tools you already use. No extra software to install.'
    },
    {
      title: 'Easy Question Import',
      description: 'Import exam questions effortlessly through Google Forms. Simply create your questions in Forms and CBT Tube handles the rest.'
    },
    {
      title: 'Auto-Generate Exams',
      description: 'Google Apps Script automatically generates and randomizes exam questions in seconds — no manual setup required.'
    },
    {
      title: 'Auto Marking & Scoring',
      description: 'Exams are automatically graded and scored the moment students submit. Instant results, zero manual work.'
    },
    {
      title: 'Question Bank Management',
      description: 'Build and manage a comprehensive question bank in Google Sheets. Organize by subject, topic, and difficulty level.'
    },
    {
      title: 'Result Analytics & Reports',
      description: 'Detailed performance analytics, class averages, subject breakdowns, and exportable result reports for parents and administrators.'
    }
  ],
  pricing: [
    {
      name: 'Basic',
      price: '60,000',
      period: 'one-time',
      features: [
        'Up to 100 students',
        '1 subject question bank',
        'Auto marking & scoring',
        'Basic result reports',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '180,000',
      period: 'one-time',
      features: [
        'Up to 500 students',
        'Unlimited subjects',
        'Question bank management',
        'Advanced analytics',
        'Priority support',
        'Custom exam branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '350,000',
      period: 'one-time',
      features: [
        'Unlimited students',
        'Unlimited subjects',
        'Full analytics suite',
        '24/7 support',
        'Custom integrations',
        'Multi-school management',
        'Free lifetime updates'
      ]
    }
  ],
  paymentNote: 'One-time payment — pay once, use forever. Free updates included.',
  screenshots: [],
  testimonials: [
    {
      name: 'Proprietor, As Sabbaq Model School',
      role: 'Ibadan',
      text: 'CBT Tube has made conducting exams so much easier. We import our questions through Google Forms and the system generates the exam automatically. The auto-marking saves us hours of work after every exam.'
    },
    {
      name: 'Proprietor, Chrisdem Nursery & Primary School',
      role: 'Ibadan',
      text: 'Setting up CBT exams used to be a nightmare. With CBT Tube, our teachers can create and deploy exams in minutes. The result analytics give us great insight into student performance.'
    }
  ]
};

export const billTube = {
  name: 'BillTube',
  tagline: 'Simplified School Billing & Invoicing',
  description: 'BillTube is a comprehensive billing solution designed for schools and educational institutions. Manage fees, generate invoices, track payments, and send reminders — all in one place.',
  features: [
    {
      title: 'Fee Management',
      description: 'Set up different fee structures for classes, terms, and programs.'
    },
    {
      title: 'Invoice Generation',
      description: 'Professional invoice templates with automatic calculation and itemization.'
    },
    {
      title: 'Payment Tracking',
      description: 'Track all payments with detailed transaction history and receipts.'
    },
    {
      title: 'Automated Reminders',
      description: 'Send payment reminders via SMS or email to parents automatically.'
    },
    {
      title: 'Financial Reports',
      description: 'Generate comprehensive financial reports and summaries.'
    },
    {
      title: 'Multi-Payment Support',
      description: 'Support for cash, bank transfer, mobile money, and online payments.'
    }
  ],
  pricing: [
    {
      name: 'Basic',
      price: '60,000',
      period: 'one-time',
      features: [
        'Up to 100 students',
        'Basic invoicing',
        'Payment tracking',
        'Simple reports',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '180,000',
      period: 'one-time',
      features: [
        'Up to 500 students',
        'Advanced invoicing',
        'SMS reminders',
        'Financial reports',
        'Priority support',
        'Multi-branch support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '350,000',
      period: 'one-time',
      features: [
        'Unlimited students',
        'Full billing suite',
        'SMS & Email reminders',
        'Advanced analytics',
        '24/7 support',
        'Custom integrations',
        'Multi-school management',
        'Free lifetime updates'
      ]
    }
  ],
  paymentNote: 'One-time payment — pay once, use forever. Free updates included.',
  screenshots: [],
  testimonials: [
    {
      name: 'Proprietor, Chrisdem Nursery & Primary School',
      role: 'Ibadan',
      text: 'BillTube has made our fee collection and tracking so much easier. Parents receive their reminders on time and we can see who has paid at a glance. It has reduced the stress on our bursar significantly.'
    },
    {
      name: 'Proprietor, As Sabbaq Model School',
      role: 'Ibadan',
      text: 'Before BillTube, we were struggling with manual fee tracking and frequent disputes. Now everything is transparent and automated. The one-time payment makes it even better — no recurring costs to worry about.'
    }
  ]
};
