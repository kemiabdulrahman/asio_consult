<script>
  export let product;
  export let isModal = false;


  let currentImageIndex = 0;
  let images = [];

  // Use the same backend base URL as ProductCard
  const IMAGE_BASE_URL = 'http://localhost:3001';
  function getFullImageUrl(url) {
    if (!url) return '/images/products/laptop-placeholder.svg';
    if (url.startsWith('http')) return url;
    return IMAGE_BASE_URL + url;
  }

  $: if (product) {
    if (product.images && product.images.length > 0) {
      images = product.images.map(img => getFullImageUrl(img.imageUrl));
    } else if (product.image) {
      images = [getFullImageUrl(product.image)];
    } else {
      images = ['/images/products/laptop-placeholder.svg'];
    }
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  }

  function goToImage(index) {
    currentImageIndex = index;
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class={`${isModal ? 'w-full h-96' : 'relative w-full'}`}>
  <!-- Main Image Display -->
  <div class="relative bg-gray-100 rounded-lg overflow-hidden">
    <img
      src={images[currentImageIndex] || '/images/products/laptop-placeholder.svg'}
      alt={`${product.name} - Image ${currentImageIndex + 1}`}
      class="w-full h-96 object-cover"
    />

    <!-- Image Counter -->
    {#if images.length > 1}
      <div class="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentImageIndex + 1} / {images.length}
      </div>
    {/if}

    <!-- Navigation Arrows (hidden on mobile, shown on larger screens) -->
    {#if images.length > 1}
      <button
        on:click={prevImage}
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition z-10 hidden md:flex items-center justify-center"
        aria-label="Previous image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        on:click={nextImage}
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition z-10 hidden md:flex items-center justify-center"
        aria-label="Next image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>

  <!-- Thumbnail Grid (only show if multiple images) -->
  {#if images.length > 1}
    <div class="mt-4 grid grid-cols-4 gap-2 md:gap-3">
      {#each images as image, index}
        <button
          on:click={() => goToImage(index)}
          class={`relative rounded-lg overflow-hidden border-2 transition ${
            index === currentImageIndex ? 'border-primary-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            class="w-full h-16 object-cover"
          />
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Add touch support for swipe gestures on mobile */
  :global(.product-gallery) {
    touch-action: pan-y;
  }
</style>
