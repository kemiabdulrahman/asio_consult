<script>
  import { cart, toast } from '../../lib/stores.js';
  import { orderAPI, handleAPIError } from '../../lib/api.js';
  import { goto } from '$app/navigation';

  let cartItems = [];
  let isSubmitting = false;

  let customerInfo = {
    name: '',
    email: '',
    phone: ''
  };

  let shippingAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  };

  let paymentMethod = 'cash_on_delivery';

  cart.subscribe(items => {
    cartItems = items;
  });

  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      cart.removeItem(productId);
    } else {
      cart.updateQuantity(productId, newQuantity);
    }
  }

  function removeItem(productId) {
    cart.removeItem(productId);
    toast.add('Item removed from cart', 'info', 2000);
  }

  function calculateSubtotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function calculateTotal() {
    const subtotal = calculateSubtotal();
    const shippingCost = 0; // Can be calculated based on location
    const tax = 0; // Can be calculated based on items
    return subtotal + shippingCost + tax;
  }

  async function placeOrder() {
    // Validate customer info
    if (!customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
      toast.add('Please fill in all customer information', 'error', 3000);
      return;
    }

    // Validate shipping address
    if (!shippingAddress.street.trim() || !shippingAddress.city.trim() || 
        !shippingAddress.state.trim() || !shippingAddress.zipCode.trim()) {
      toast.add('Please fill in all shipping address fields', 'error', 3000);
      return;
    }

    if (cartItems.length === 0) {
      toast.add('Cart is empty', 'error', 3000);
      return;
    }

    isSubmitting = true;

    try {
      const subtotal = calculateSubtotal();
      const shippingCost = 0;
      const tax = 0;
      const total = calculateTotal();

      // Create order data matching backend schema
      const orderData = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        shippingAddressStreet: shippingAddress.street,
        shippingAddressCity: shippingAddress.city,
        shippingAddressState: shippingAddress.state,
        shippingAddressZipCode: shippingAddress.zipCode,
        shippingAddressCountry: shippingAddress.country,
        paymentMethod: paymentMethod,
        items: cartItems,
        subtotal: subtotal,
        shippingCost: shippingCost,
        tax: tax,
        total: total
        // Don't send orderStatus - backend sets it to PENDING automatically
      };

      const response = await orderAPI.create(orderData);
      const order = response.data.data;

      toast.add('Order placed successfully! Order #' + order.orderNumber, 'success', 4000);
      
      // Clear cart and reset form
      cart.clear();
      customerInfo = { name: '', email: '', phone: '' };
      shippingAddress = { street: '', city: '', state: '', zipCode: '', country: 'Nigeria' };
      paymentMethod = 'cash_on_delivery';
      
      setTimeout(() => {
        goto(`/orders`);
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      const apiError = handleAPIError(error);
      toast.add('Error placing order: ' + apiError.message, 'error', 3000);
    } finally {
      isSubmitting = false;
    }
  }

  function continueShopping() {
    goto('/shop');
  }
</script>

<svelte:head>
  <title>Shopping Cart - ASIO CONSULT</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

    {#if cartItems.length === 0}
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5L5.5 21"></path>
        </svg>
        <p class="text-gray-600 text-lg mb-4">Your cart is empty</p>
        <button 
          on:click={continueShopping}
          class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="text-left px-4 py-3 font-semibold text-gray-700">Product</th>
                  <th class="text-center px-4 py-3 font-semibold text-gray-700">Price</th>
                  <th class="text-center px-4 py-3 font-semibold text-gray-700">Quantity</th>
                  <th class="text-center px-4 py-3 font-semibold text-gray-700">Total</th>
                  <th class="text-center px-4 py-3 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                {#each cartItems as item (item.id)}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-3">
                        {#if item.image}
                          <img 
                            src={item.image} 
                            alt={item.name}
                            class="w-12 h-12 object-cover rounded"
                          />
                        {:else}
                          <div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span class="text-xs text-gray-500">No image</span>
                          </div>
                        {/if}
                        <div>
                          <p class="font-semibold text-gray-900">{item.name}</p>
                          <p class="text-sm text-gray-600">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-center text-gray-900">
                      ₦{(item.price / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex items-center justify-center gap-2">
                        <button 
                          on:click={() => updateQuantity(item.id, item.quantity - 1)}
                          class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                        >
                          −
                        </button>
                        <input 
                          type="number" 
                          min="1"
                          value={item.quantity}
                          on:change={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          class="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                        <button 
                          on:click={() => updateQuantity(item.id, item.quantity + 1)}
                          class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-center font-semibold text-gray-900">
                      ₦{((item.price * item.quantity) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td class="px-4 py-3 text-center">
                      <button 
                        on:click={() => removeItem(item.id)}
                        class="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>

          <div class="mt-4">
            <button 
              on:click={continueShopping}
              class="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        <!-- Checkout Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <!-- Order Total -->
            <div class="mb-6 pb-6 border-b">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">₦{(calculateSubtotal() / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">₦0.00</span>
              </div>
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary-600">₦{(calculateTotal() / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="space-y-4 mb-6">
              <h3 class="font-semibold text-gray-900 text-sm">Customer Information</h3>
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input 
                  type="text"
                  id="name"
                  bind:value={customerInfo.name}
                  placeholder="Enter your full name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input 
                  type="email"
                  id="email"
                  bind:value={customerInfo.email}
                  placeholder="Enter your email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input 
                  type="tel"
                  id="phone"
                  bind:value={customerInfo.phone}
                  placeholder="Enter your phone number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="space-y-4 mb-6 pb-6 border-b">
              <h3 class="font-semibold text-gray-900 text-sm">Shipping Address</h3>
              <div>
                <label for="street" class="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input 
                  type="text"
                  id="street"
                  bind:value={shippingAddress.street}
                  placeholder="Enter street address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input 
                    type="text"
                    id="city"
                    bind:value={shippingAddress.city}
                    placeholder="e.g., Ibadan"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input 
                    type="text"
                    id="state"
                    bind:value={shippingAddress.state}
                    placeholder="e.g., Oyo"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code *
                </label>
                <input 
                  type="text"
                  id="zipCode"
                  bind:value={shippingAddress.zipCode}
                  placeholder="Enter zip code"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Payment Method -->
            <div class="space-y-4 mb-6">
              <h3 class="font-semibold text-gray-900 text-sm">Payment Method</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="radio"
                    bind:group={paymentMethod}
                    value="cash_on_delivery"
                    class="w-4 h-4 text-primary-600"
                  />
                  <span class="ml-2 text-gray-700">Cash on Delivery</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio"
                    bind:group={paymentMethod}
                    value="bank_transfer"
                    class="w-4 h-4 text-primary-600"
                  />
                  <span class="ml-2 text-gray-700">Bank Transfer</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio"
                    bind:group={paymentMethod}
                    value="card"
                    class="w-4 h-4 text-primary-600"
                  />
                  <span class="ml-2 text-gray-700">Card Payment</span>
                </label>
              </div>
            </div>

            <!-- Place Order Button -->
            <button 
              on:click={placeOrder}
              disabled={isSubmitting}
              class="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                <span class="flex items-center justify-center gap-2">
                  <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </span>
              {:else}
                Place Order
              {/if}
            </button>

            <p class="text-xs text-gray-500 mt-4 text-center">
              By placing an order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type="number"] {
    @apply text-center;
  }
</style>
