export const laptops = [
  {
    id: 1,
    name: 'Dell Latitude 5520',
    brand: 'Dell',
    category: 'Business',
    specs: 'Intel Core i5-11th Gen, 8GB RAM, 256GB SSD, 15.6" FHD',
    price: '850,000',
    originalPrice: '1,200,000',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop',
    available: true,
    condition: 'Refurbished',
    bulkAvailable: true,
    description: 'Reliable business laptop perfect for office work and CBT examination centers.'
  },
  {
    id: 2,
    name: 'HP EliteBook 840 G8',
    brand: 'HP',
    category: 'Business',
    specs: 'Intel Core i7-11th Gen, 16GB RAM, 512GB SSD, 14" FHD',
    price: '1,150,000',
    originalPrice: '1,600,000',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    available: true,
    condition: 'Refurbished',
    bulkAvailable: true,
    description: 'Premium business ultrabook with excellent build quality and performance.'
  },
  {
    id: 3,
    name: 'Lenovo ThinkPad T480',
    brand: 'Lenovo',
    category: 'Business',
    specs: 'Intel Core i5-8th Gen, 8GB RAM, 256GB SSD, 14" FHD',
    price: '650,000',
    originalPrice: '900,000',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop',
    available: true,
    condition: 'Refurbished',
    bulkAvailable: true,
    description: 'Legendary ThinkPad durability — ideal for school computer labs and CBT centers.'
  },
  {
    id: 4,
    name: 'Dell Inspiron 15',
    brand: 'Dell',
    category: 'Consumer',
    specs: 'Intel Core i3-11th Gen, 4GB RAM, 1TB HDD, 15.6" HD',
    price: '450,000',
    originalPrice: '650,000',
    image: 'https://images.unsplash.com/photo-1603302576835-35b78f681f34?w=600&h=400&fit=crop',
    available: true,
    condition: 'New',
    bulkAvailable: true,
    description: 'Affordable everyday laptop for students — great for school bulk purchases.'
  },
  {
    id: 5,
    name: 'HP ProBook 450 G8',
    brand: 'HP',
    category: 'Business',
    specs: 'Intel Core i5-11th Gen, 8GB RAM, 256GB SSD, 15.6" FHD',
    price: '780,000',
    originalPrice: '1,100,000',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop',
    available: true,
    condition: 'Refurbished',
    bulkAvailable: true,
    description: 'Solid mid-range business laptop — popular choice for school CBT centers.'
  },
  {
    id: 6,
    name: 'Lenovo IdeaPad 3',
    brand: 'Lenovo',
    category: 'Consumer',
    specs: 'AMD Ryzen 5, 8GB RAM, 512GB SSD, 15.6" FHD',
    price: '720,000',
    originalPrice: '950,000',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    available: true,
    condition: 'New',
    bulkAvailable: true,
    description: 'Powerful consumer laptop with AMD processor — great value for bulk school orders.'
  }
];

export const laptopBrands = [...new Set(laptops.map(l => l.brand))];
export const laptopCategories = [...new Set(laptops.map(l => l.category))];

export const getLaptopById = (id) => laptops.find(laptop => laptop.id === parseInt(id));
