<script>
  import MessageCard from './MessageCard.svelte';
  import { toast } from '../../../lib/stores.js';
  import { contactAPI, handleAPIError } from '../../../lib/api.js';
  
  export let messages = [];
  export let loading = false;
  export let onRefresh = () => {};
  
  let filterStatus = 'all'; // all, read, unread
  let searchQuery = '';

  $: filteredMessages = messages.filter(msg => {
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'read' && msg.isRead) ||
                         (filterStatus === 'unread' && !msg.isRead);
    
    const matchesSearch = searchQuery === '' ||
                         msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  async function handleMarkAsRead(messageId) {
    try {
      await contactAPI.markAsRead(messageId);
      await onRefresh();
      toast.add('Message marked as read', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }

  async function handleDelete(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactAPI.delete(messageId);
      await onRefresh();
      toast.add('Message deleted successfully', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }

  function handleBulkMarkAsRead() {
    const unreadIds = filteredMessages.filter(m => !m.isRead).map(m => m.id);
    if (unreadIds.length === 0) {
      toast.add('No unread messages to mark', 'info');
      return;
    }

    contactAPI.markMultipleAsRead(unreadIds)
      .then(() => {
        onRefresh();
        toast.add(`Marked ${unreadIds.length} messages as read`, 'success');
      })
      .catch(error => {
        const apiError = handleAPIError(error);
        toast.add(apiError.message, 'error');
      });
  }
</script>

<div>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h2>
    <p class="text-gray-600">View and manage customer inquiries</p>
  </div>

  <!-- Filters & Search -->
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex-1">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name, email, or subject..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div class="flex gap-2">
        <select
          bind:value={filterStatus}
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

        <button
          on:click={handleBulkMarkAsRead}
          disabled={loading}
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          Mark All Read
        </button>

        <button
          on:click={onRefresh}
          disabled={loading}
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
        >
          {#if loading}
            <svg class="animate-spin h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            </svg>
          {:else}
            Refresh
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Messages List -->
  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>
  {:else if filteredMessages.length === 0}
    <div class="bg-white rounded-lg shadow p-12 text-center">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
      <p class="text-gray-500">
        {#if searchQuery}
          No results matching your search
        {:else}
          Customer messages will appear here
        {/if}
      </p>
    </div>
  {:else}
    <div class="space-y-4">
      {#each filteredMessages as message (message.id)}
        <MessageCard
          {message}
          onMarkRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      {/each}
    </div>
  {/if}

  {#if filteredMessages.length > 0}
    <div class="mt-4 text-sm text-gray-600 bg-white rounded-lg p-4">
      Showing {filteredMessages.length} of {messages.length} messages
    </div>
  {/if}
</div>