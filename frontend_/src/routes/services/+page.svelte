<script>
  import { onMount } from 'svelte';
  import { serviceAPI } from '../../lib/api.js';
  import { toast } from '../../lib/stores.js';
  import ServiceCard from '../../components/ServiceCard.svelte';

  let services = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await serviceAPI.getAll();
      // Parse features which may be stored as JSON strings from the backend
      services = response.data.data.map(s => {
        try {
          return {
            ...s,
            features: typeof s.features === 'string' && s.features.trim().length ? JSON.parse(s.features) : Array.isArray(s.features) ? s.features : []
          };
        } catch (e) {
          console.warn('Failed to parse features for service', s.name, e);
          return { ...s, features: [] };
        }
      });
    } catch (error) {
      console.error('Error loading services:', error);
      toast.add('Failed to load services', 'error');
    } finally {
      loading = false;
    }
  });

  const serviceCategories = {
    training: {
      title: 'ICT Training & Education',
      icon: '🎓',
      description: 'Professional ICT training programs for individuals and institutions'
    },
    software: {
      title: 'Educational Software',
      icon: '💻',
      description: 'Custom educational software solutions and school management systems'
    },
    consulting: {
      title: 'ICT Consultancy',
      icon: '🔧',
      description: 'Expert consultancy services for educational technology implementation'
    }
  };
</script>

<svelte:head>
  <title>Services - ASIO CONSULT</title>
  <meta name="description" content="Professional ICT services including SASR software, educational training, and consultancy services for schools in Nigeria." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Our ICT Services</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Comprehensive ICT solutions designed to empower educational institutions 
          with modern technology and professional training
        </p>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Featured Service - SASR -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
            Featured Solution
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            SASR - Simple Automated Scoresheet and Report
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            A comprehensive school management system that automates student record keeping, 
            grade calculations, report card generation, and administrative tasks.
          </p>
          <div class="space-y-3 mb-6">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Automated grade calculations and report cards</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Student registration and management</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Fee management and payment tracking</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Staff and teacher management</span>
            </div>
          </div>
          <div class="flex space-x-4">
            <a href="/contact?service=SASR" class="btn-primary">
              Request Demo
            </a>
            <a href="#sasr-pricing" class="btn-secondary">
              View Pricing
            </a>
          </div>
        </div>
        <div class="relative">
          <img 
            src="/images/hero/sasr-screenshot.svg" 
            alt="SASR Software Interface"
            class="rounded-lg shadow-lg"
          />
          <div class="absolute inset-0 bg-primary-600 opacity-10 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- Service Categories -->
    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    {:else}
      {#each Object.entries(serviceCategories) as [categoryKey, categoryInfo]}
        {@const categoryServices = services.filter(s => s.category === categoryKey)}
        {#if categoryServices.length > 0}
          <div class="mb-16">
            <div class="text-center mb-8">
              <div class="text-4xl mb-4">{categoryInfo.icon}</div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">{categoryInfo.title}</h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">{categoryInfo.description}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {#each categoryServices as service}
                <ServiceCard {service} />
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    {/if}

    <!-- SASR Pricing Section -->
    <div id="sasr-pricing" class="bg-white rounded-xl shadow-lg p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">SASR Pricing Plans</h2>
        <p class="text-lg text-gray-600">Choose the perfect plan for your institution</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Basic Plan -->
        <div class="border border-gray-200 rounded-lg p-6 hover:border-primary-500 transition-colors">
          <div class="text-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
            <div class="text-3xl font-bold text-primary-600 mb-2">₦20,000</div>
            <p class="text-gray-600">Up to 100 students</p>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Student registration
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Basic grade entry
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Simple report cards
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Email support
            </li>
          </ul>
          <a href="/contact?service=SASR Basic" class="w-full btn-secondary block text-center">
            Choose Basic
          </a>
        </div>

        <!-- Professional Plan -->
        <div class="border-2 border-primary-500 rounded-lg p-6 relative">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span class="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          <div class="text-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Professional</h3>
            <div class="text-3xl font-bold text-primary-600 mb-2">₦35,000</div>
            <p class="text-gray-600">Up to 500 students</p>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Everything in Basic
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Advanced reporting
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Fee management
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Staff management
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Phone & email support
            </li>
          </ul>
          <a href="/contact?service=SASR Professional" class="w-full btn-primary block text-center">
            Choose Professional
          </a>
        </div>

        <!-- Enterprise Plan -->
        <div class="border border-gray-200 rounded-lg p-6 hover:border-primary-500 transition-colors">
          <div class="text-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
            <div class="text-3xl font-bold text-primary-600 mb-2">₦50,000</div>
            <p class="text-gray-600">Unlimited students</p>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Everything in Professional
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Multi-campus support
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Custom features
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              On-site training
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              24/7 priority support
            </li>
          </ul>
          <a href="/contact?service=SASR Enterprise" class="w-full btn-secondary block text-center">
            Choose Enterprise
          </a>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Institution?</h2>
      <p class="text-xl text-gray-600 mb-8">
        Contact us today to discuss your specific ICT needs and get a customized solution
      </p>
      <div class="flex justify-center space-x-4">
        <a href="/contact" class="btn-primary">
          Get Started
        </a>
        <a href="tel:+2348000000000" class="btn-secondary">
          Call Us Now
        </a>
      </div>
    </div>
  </div>
</div>