<script>
  export let title = '';
  export let value = 0;
  export let color = 'blue';
  export let icon = null;

  const colors = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'blue' },
    green: { bg: 'bg-green-100', text: 'text-green-600', icon: 'green' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'purple' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'yellow' }
  };

  const selectedColor = colors[color] || colors.blue;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <div class="flex items-center">
    <div class="rounded-lg p-3 mr-4 {selectedColor.bg}">
      {#if color === 'blue'}
        <svg class="w-8 h-8 {selectedColor.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      {:else if color === 'green'}
        <svg class="w-8 h-8 {selectedColor.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      {:else if color === 'purple'}
        <svg class="w-8 h-8 {selectedColor.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      {:else if color === 'yellow'}
        <svg class="w-8 h-8 {selectedColor.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      {/if}
    </div>
    <div>
      <h3 class="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
      <p class="text-gray-600">{title}</p>
    </div>
  </div>
</div>