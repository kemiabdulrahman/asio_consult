<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { contactAPI } from '../../lib/api.js';
  import { toast } from '../../lib/stores.js';

  let formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  let loading = false;
  let submitted = false;

  onMount(() => {
    const urlParams = $page.url.searchParams;
    const service = urlParams.get('service');
    const product = urlParams.get('product');
    
    if (service) {
      formData.subject = `Inquiry about ${service}`;
      formData.message = `I'm interested in learning more about your ${service} service. Please provide more details.`;
    } else if (product) {
      formData.subject = `Inquiry about ${product}`;
      formData.message = `I'm interested in the ${product}. Please provide more information about availability and pricing.`;
    }
  });

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.add('Please fill in all required fields', 'error');
      return;
    }

    try {
      loading = true;
      await contactAPI.send(formData);
      submitted = true;
      toast.add('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset form
      formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
    } catch (error) {
      console.error('Error sending message:', error);
      toast.add('Failed to send message. Please try again.', 'error');
    } finally {
      loading = false;
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['Ologuneru, Opposite TMC Central Mosque', 'Ibadan, Oyo State, Nigeria']
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+234 800 000 0000', '+234 900 000 0000']
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['info@asioconsult.com', 'support@asioconsult.com']
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM']
    }
  ];

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/2348000000000', color: 'bg-green-600' },
    { name: 'Facebook', url: '#', color: 'bg-blue-600' },
    { name: 'Twitter', url: '#', color: 'bg-sky-500' },
    { name: 'LinkedIn', url: '#', color: 'bg-blue-700' }
  ];
</script>

<svelte:head>
  <title>Contact Us - ASIO CONSULT</title>
  <meta name="description" content="Contact ASIO CONSULT for ICT solutions, laptop sales, and educational software. Located in Ibadan, Nigeria." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Contact ASIO CONSULT</h1>
        <p class="text-xl text-primary-100 max-w-2xl mx-auto">
          Ready to transform your educational technology? Get in touch with our experts today.
        </p>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          
          {#if submitted}
            <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-medium text-green-900">Message Sent Successfully!</h3>
                  <p class="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          {/if}

          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  bind:value={formData.name}
                  required
                  class="input-field"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  required
                  class="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  class="input-field"
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  bind:value={formData.subject}
                  required
                  class="input-field"
                  placeholder="What can we help you with?"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows="6"
                bind:value={formData.message}
                required
                class="input-field"
                placeholder="Please describe your requirements or questions in detail..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              class="w-full btn-primary py-3 text-lg"
              class:opacity-50={loading}
            >
              {#if loading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              {:else}
                Send Message
              {/if}
            </button>
          </form>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-6">
        <!-- Contact Details -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h3>
          <div class="space-y-4">
            {#each contactInfo as info}
              <div class="flex items-start">
                <span class="text-2xl mr-4">{info.icon}</span>
                <div>
                  <h4 class="font-medium text-gray-900">{info.title}</h4>
                  {#each info.details as detail}
                    <p class="text-gray-600 text-sm">{detail}</p>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <a
              href="tel:+2348000000000"
              class="flex items-center w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call Now
            </a>
            <a
              href="https://wa.me/2348000000000"
              class="flex items-center w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:info@asioconsult.com"
              class="flex items-center w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Send Email
            </a>
          </div>
        </div>

        <!-- Social Media -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div class="grid grid-cols-2 gap-3">
            {#each socialLinks as social}
              <a
                href={social.url}
                class="flex items-center justify-center {social.color} hover:opacity-90 text-white p-3 rounded-lg transition-opacity"
              >
                {social.name}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="mt-16">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Our Location</h3>
          <p class="text-gray-600">Visit our office in Ibadan for consultations and product demonstrations</p>
        </div>
        <div class="h-64 bg-gray-200 flex items-center justify-center">
          <!-- You would replace this with an actual Google Maps embed -->
          <div class="text-center text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p class="font-medium">Ologuneru, Opposite TMC Central Mosque</p>
            <p>Ibadan, Oyo State, Nigeria</p>
          </div>
          <!-- Replace with actual Google Maps iframe:
          <iframe 
            src="https://www.google.com/maps/embed?pb=..."
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
          -->
        </div>
      </div>
    </div>
  </div>
</div>