const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.upsert({
      where: { email: 'admin@asioconsult.com' },
      update: {},
      create: {
        email: 'admin@asioconsult.com',
        password: hashedPassword,
        name: 'ASIO CONSULT Admin'
      }
    });

    // Create sample products
    const sampleProducts = [
      {
        name: 'Acer TravelMate P2 14" Laptop',
        description: 'Professional laptop perfect for educational use with Intel Core i5 processor, 8GB RAM, and 256GB SSD.',
        price: 285000,
        category: 'laptop',
        brand: 'Acer',
        specs: {
          'Processor': 'Intel Core i5-11th Gen',
          'RAM': '8GB DDR4',
          'Storage': '256GB SSD',
          'Display': '14" HD',
          'Operating System': 'Windows 11 Pro'
        },
        inStock: true,
        quantity: 15
      },
      {
        name: 'HP 250 G8 Business Laptop',
        description: 'Reliable business laptop with AMD Ryzen 5 processor, ideal for students and professionals.',
        price: 320000,
        category: 'laptop',
        brand: 'HP',
        specs: {
          'Processor': 'AMD Ryzen 5 5500U',
          'RAM': '8GB DDR4',
          'Storage': '512GB SSD',
          'Display': '15.6" HD',
          'Graphics': 'AMD Radeon Graphics',
          'Operating System': 'Windows 11 Pro'
        },
        inStock: true,
        quantity: 12
      },
      {
        name: 'Dell Inspiron 15 3000',
        description: 'Budget-friendly laptop suitable for basic computing tasks and educational purposes.',
        price: 245000,
        category: 'laptop',
        brand: 'Dell',
        specs: {
          'Processor': 'Intel Core i3-10th Gen',
          'RAM': '4GB DDR4 (Upgradeable)',
          'Storage': '256GB SSD',
          'Display': '15.6" HD',
          'Operating System': 'Windows 11 Home'
        },
        inStock: true,
        quantity: 8
      },
      {
        name: 'Lenovo ThinkPad E14',
        description: 'Enterprise-grade laptop with enhanced security features, perfect for educational institutions.',
        price: 420000,
        category: 'laptop',
        brand: 'Lenovo',
        specs: {
          'Processor': 'Intel Core i7-11th Gen',
          'RAM': '16GB DDR4',
          'Storage': '512GB SSD',
          'Display': '14" FHD IPS',
          'Security': 'Fingerprint Reader',
          'Operating System': 'Windows 11 Pro'
        },
        inStock: true,
        quantity: 6
      },
      {
        name: 'Wireless Mouse & Keyboard Combo',
        description: 'Comfortable wireless mouse and keyboard set, perfect for laptop users.',
        price: 15000,
        category: 'accessory',
        brand: 'Logitech',
        specs: {
          'Connection': 'Wireless 2.4GHz',
          'Battery Life': 'Up to 2 years',
          'Compatibility': 'Windows, Mac, Linux'
        },
        inStock: true,
        quantity: 25
      },
      {
        name: 'Laptop Stand & Cooling Pad',
        description: 'Ergonomic laptop stand with built-in cooling fans to prevent overheating.',
        price: 12000,
        category: 'accessory',
        brand: 'Generic',
        specs: {
          'Material': 'Aluminum Alloy',
          'Fans': '2 x 140mm',
          'Height Adjustment': '6 levels',
          'Compatibility': 'Up to 17" laptops'
        },
        inStock: true,
        quantity: 20
      }
    ];

    for (const product of sampleProducts) {
      await prisma.product.upsert({
        where: { name: product.name },
        update: {},
        create: product
      });
    }

    // Create sample services
    const sampleServices = [
      {
        name: 'SASR - Basic Package',
        description: 'Simple Automated Scoresheet and Report system for small schools. Includes student registration, grade entry, and basic report cards.',
        price: 20000,
        category: 'software',
        duration: 'Lifetime License',
        features: [
          'Student registration and management',
          'Basic grade entry and calculations',
          'Simple report card generation',
          'Up to 100 students',
          'Email support',
          'Basic training included'
        ]
      },
      {
        name: 'SASR - Professional Package',
        description: 'Comprehensive school management system with advanced features for medium-sized educational institutions.',
        price: 35000,
        category: 'software',
        duration: 'Lifetime License + 1 Year Support',
        features: [
          'Everything in Basic package',
          'Advanced reporting and analytics',
          'Fee management and payment tracking',
          'Staff and teacher management',
          'Up to 500 students',
          'Phone and email support',
          'Advanced training included',
          'Custom report templates'
        ]
      },
      {
        name: 'SASR - Enterprise Package',
        description: 'Full-featured school management solution for large educational institutions with multiple campuses.',
        price: 50000,
        category: 'software',
        duration: 'Lifetime License + 2 Years Support',
        features: [
          'Everything in Professional package',
          'Multi-campus support',
          'Custom feature development',
          'Unlimited students',
          'On-site training and setup',
          '24/7 priority support',
          'Integration with existing systems',
          'Advanced security features'
        ]
      },
      {
        name: 'Basic Computer Training',
        description: 'Fundamental computer skills training for beginners covering Microsoft Office, internet usage, and basic troubleshooting.',
        price: 25000,
        category: 'training',
        duration: '4 weeks',
        features: [
          'Microsoft Word, Excel, PowerPoint',
          'Internet and email usage',
          'File management and organization',
          'Basic computer troubleshooting',
          'Certificate of completion',
          'Hands-on practical sessions'
        ]
      },
      {
        name: 'Advanced ICT Training',
        description: 'Comprehensive ICT training program for educators and IT personnel covering network administration and educational technology.',
        price: 45000,
        category: 'training',
        duration: '8 weeks',
        features: [
          'Network setup and administration',
          'Educational software integration',
          'Computer lab management',
          'Hardware maintenance and repair',
          'Digital teaching tools',
          'Professional certification',
          'Ongoing support and resources'
        ]
      },
      {
        name: 'ICT Infrastructure Consulting',
        description: 'Professional consultancy service for planning and implementing ICT infrastructure in educational institutions.',
        price: null, // Custom pricing
        category: 'consulting',
        duration: 'Project-based',
        features: [
          'ICT infrastructure assessment',
          'Network design and planning',
          'Hardware specification and procurement',
          'Implementation project management',
          'Staff training and handover',
          'Ongoing maintenance planning'
        ]
      },
      {
        name: 'Digital Learning Platform Setup',
        description: 'Complete setup and training for digital learning platforms including LMS implementation and teacher training.',
        price: 75000,
        category: 'consulting',
        duration: '6 weeks',
        features: [
          'Learning Management System setup',
          'Content migration and organization',
          'Teacher training on digital tools',
          'Student orientation programs',
          'Technical support setup',
          'Performance monitoring tools'
        ]
      }
    ];

    for (const service of sampleServices) {
      await prisma.service.upsert({
        where: { name: service.name },
        update: {},
        create: service
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin login: admin@asioconsult.com');
    console.log('🔑 Admin password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();