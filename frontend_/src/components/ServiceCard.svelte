<script>
  export let service;

  function formatPrice(price) {
    if (!price) return 'Contact for pricing';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  }
</script>

<div class="card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
  <div class="flex-1 flex flex-col">
    <div class="mb-4">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
      <p class="text-gray-600 mb-4">{service.description}</p>
    </div>

    {#if service.features && service.features.length > 0}
      <div class="mb-4">
        <h4 class="font-medium text-gray-900 mb-2">Features:</h4>
        <ul class="space-y-1">
          {#each service.features.slice(0, 4) as feature}
            <li class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm text-gray-600">{feature}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="flex items-center justify-between mb-4 mt-auto">
      <div>
        <span class="text-2xl font-bold text-primary-600">
          {formatPrice(service.price)}
        </span>
        {#if service.duration}
          <p class="text-sm text-gray-500">Duration: {service.duration}</p>
        {/if}
      </div>
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {service.category}
      </span>
    </div>
  </div>

  <div class="mt-4">
    <a 
      href="/contact?service={service.name}" 
      class="w-full btn-primary text-center block"
    >
      Get Started
    </a>
  </div>
</div>