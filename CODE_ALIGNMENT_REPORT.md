# Code Alignment Review - ASIO CONSULT Frontend vs Backend

## ❌ Critical Issues Found

Your frontend code has **several misalignments** with the backend schema and API endpoints. Below is a detailed breakdown with fixes.

---

## 1. Orders Page Issues (`routes/orders/+page.svelte`)

### Issue 1.1: Wrong Field Names
**Problem:** Using `order.status` but backend uses `order.orderStatus`

```svelte
// ❌ WRONG - Using 'status'
class:border-gray-300={filterStatus !== 'all'}
return orders.filter(order => order.status === filterStatus);
getStatusBadgeClass(status) {
  case 'pending':  // Backend uses PENDING (uppercase)
  case 'confirmed':  // Backend uses CONFIRMED
```

**Backend Reality:**
```javascript
// ✅ CORRECT - Using 'orderStatus'
enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

### Issue 1.2: Wrong Status Values (Case Sensitivity)
**Problem:** Frontend uses lowercase status values, backend uses uppercase

```svelte
// ❌ WRONG - lowercase
case 'pending':
case 'confirmed':
case 'delivered':
case 'cancelled':

// ✅ CORRECT - UPPERCASE
case 'PENDING':
case 'CONFIRMED':
case 'PROCESSING':
case 'SHIPPED':
case 'DELIVERED':
case 'CANCELLED':
```

### Issue 1.3: Missing Status Value (PROCESSING & SHIPPED)
**Problem:** Frontend only handles 4 statuses, but backend has 6

**Frontend handles:**
- pending
- confirmed
- delivered
- cancelled

**Backend has:**
- PENDING
- CONFIRMED
- **PROCESSING** ← Missing
- **SHIPPED** ← Missing
- DELIVERED
- CANCELLED

### Issue 1.4: Wrong API Endpoint Usage
**Problem:** Using plain `fetch('/api/orders')` without proper structure

```svelte
// ❌ WRONG - Direct fetch without API module
const response = await fetch('/api/orders');

// ✅ CORRECT - Use API module with auth token
import { orderAPI } from '../../lib/api.js';
const response = await orderAPI.getAll();
```

### Issue 1.5: Wrong Filter Button Logic
**Problem:** Filter buttons use `order.status` instead of `order.orderStatus`

```svelte
// ❌ WRONG
orders.filter(o => o.status === 'pending').length

// ✅ CORRECT
orders.filter(o => o.orderStatus === 'PENDING').length
```

### Issue 1.6: Missing Required Fields in Order Display
**Problem:** Not displaying critical order fields from the schema

**Missing from display:**
- `orderNumber` (should display instead of/alongside order id)
- `paymentStatus` (PENDING, COMPLETED, FAILED, REFUNDED)
- `trackingNumber` and `carrier` (shipping info)
- `estimatedDeliveryDate`
- `deliveredAt` (actual delivery date)
- `shippingAddressCity`, `shippingAddressState` (address)

---

## 2. Cart Page Issues (`routes/cart/+page.svelte`)

### Issue 2.1: Missing Shipping Address Fields
**Problem:** Cart only captures customer info, not shipping address (required by backend)

```svelte
// ❌ WRONG - Missing shipping address
let customerName = '';
let customerEmail = '';
let customerPhone = '';
// Missing:
// - shippingAddressStreet
// - shippingAddressCity
// - shippingAddressState
// - shippingAddressZipCode
// - shippingAddressCountry
```

**Backend requires:**
```javascript
shippingAddressStreet: String    // Required
shippingAddressCity: String      // Required
shippingAddressState: String     // Required
shippingAddressZipCode: String   // Required
shippingAddressCountry: String   // Required (default: "Nigeria")
```

### Issue 2.2: Missing Payment Method Field
**Problem:** Cart doesn't collect payment method, but backend expects it

```javascript
// Backend expects:
paymentMethod: String?  // "card", "bank_transfer", "cash_on_delivery"

// Frontend: Doesn't ask for this
```

### Issue 2.3: Wrong Currency Display
**Problem:** Using "PKR" (Pakistani Rupee) instead of Nigerian Naira (₦)

```svelte
// ❌ WRONG
PKR {calculateTotal().toFixed(2)}
PKR {item.price?.toFixed(2)}
PKR {(item.price * item.quantity)?.toFixed(2)}

// ✅ CORRECT - Should be ₦ (Nigerian Naira)
₦ {calculateTotal().toFixed(2)}
```

### Issue 2.4: Wrong Status Field in Order Creation
**Problem:** Sending `status: 'pending'` but backend expects `orderStatus: 'PENDING'`

```javascript
// ❌ WRONG - Wrong field name and case
body: JSON.stringify({
  status: 'pending'  // Wrong!
})

// ✅ CORRECT - Backend generates this automatically
// Don't send status at all - backend sets orderStatus: 'PENDING' by default
```

### Issue 2.5: Missing Data in Order Creation
**Problem:** Not sending all required fields to backend

```javascript
// ❌ Currently sending:
{
  customerName,
  customerEmail,
  customerPhone,
  items,
  total,
  status  // Wrong field
  // Missing:
  // - shippingAddressStreet
  // - shippingAddressCity
  // - shippingAddressState
  // - shippingAddressZipCode
  // - paymentMethod
  // - subtotal
  // - shippingCost
  // - tax
}

// ✅ Should send:
{
  customerName,
  customerEmail,
  customerPhone,
  shippingAddressStreet,
  shippingAddressCity,
  shippingAddressState,
  shippingAddressZipCode,
  shippingAddressCountry,
  paymentMethod,
  items,
  subtotal,
  shippingCost,
  tax,
  total
  // Don't send status - backend sets it
}
```

### Issue 2.6: Not Using API Module
**Problem:** Using raw `fetch` instead of `orderAPI`

```javascript
// ❌ WRONG
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(...)
})

// ✅ CORRECT
import { orderAPI } from '../../lib/api.js';
await orderAPI.create({...})
```

---

## 3. Contact Page Issues (`routes/contact/+page.svelte`)

### Issue 3.1: API Endpoint Name Inconsistency
**Problem:** Using `contactAPI.send()` but backend endpoint expects just POST to `/contact`

**Check:** The `api.js` defines:
```javascript
contactAPI = {
  send: (data) => api.post('/contact', data),  // ✅ This is correct
}
```

**Status:** ✅ This one is CORRECT!

---

## 4. Orders Display Issues

### Issue 4.1: Currency Inconsistency
**Problem:** Cart shows "PKR" but orders page also shows "PKR"

Both should show **₦** (Nigerian Naira) since your business is in Nigeria (Ibadan, Oyo State).

### Issue 4.2: Incomplete Order Status Display
**Problem:** Showing only 4 badge colors, but backend supports 6 statuses

```javascript
// Current - Missing PROCESSING and SHIPPED
switch (status) {
  case 'pending': return 'bg-yellow-100 text-yellow-800';
  case 'confirmed': return 'bg-blue-100 text-blue-800';
  case 'delivered': return 'bg-green-100 text-green-800';
  case 'cancelled': return 'bg-red-100 text-red-800';
  // Missing: PROCESSING, SHIPPED
}

// ✅ Should be:
switch (status) {
  case 'PENDING': return 'bg-yellow-100 text-yellow-800';
  case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
  case 'PROCESSING': return 'bg-purple-100 text-purple-800';
  case 'SHIPPED': return 'bg-indigo-100 text-indigo-800';
  case 'DELIVERED': return 'bg-green-100 text-green-800';
  case 'CANCELLED': return 'bg-red-100 text-red-800';
}
```

---

## Summary of Issues by File

| File | Issue | Severity | Type |
|------|-------|----------|------|
| `orders/+page.svelte` | Using `status` instead of `orderStatus` | 🔴 Critical | Field Name |
| `orders/+page.svelte` | Lowercase status values instead of uppercase | 🔴 Critical | Case |
| `orders/+page.svelte` | Missing PROCESSING and SHIPPED statuses | 🟠 High | Logic |
| `orders/+page.svelte` | Using fetch instead of orderAPI | 🟠 High | Architecture |
| `cart/+page.svelte` | Missing shipping address fields | 🔴 Critical | Missing Fields |
| `cart/+page.svelte` | Wrong currency (PKR vs ₦) | 🟠 High | Display |
| `cart/+page.svelte` | Missing payment method field | 🟠 High | Missing Fields |
| `cart/+page.svelte` | Wrong status field name and case | 🔴 Critical | Field Name |
| `cart/+page.svelte` | Not using orderAPI | 🟠 High | Architecture |
| `contact/+page.svelte` | ✅ Correct | - | - |

---

## Impact Assessment

### 🔴 Will Break Functionality
1. **Orders not fetched properly** - Wrong API usage and field names
2. **Orders not created** - Missing required fields and wrong field names
3. **Filter doesn't work** - Case sensitivity and field name issues
4. **Data not displayed correctly** - Field name mismatches

### 🟠 Will Work But Incorrectly Display
1. Currency display (PKR vs ₦)
2. Order status display (missing some statuses)
3. Incomplete order information

---

## What Needs to Change

### Backend ✅ 
**Status:** Backend is correct and follows schema properly

### Frontend ❌
**Status:** Needs multiple fixes across 2 pages

### API Module ✅
**Status:** Correctly defined, just needs to be used properly

---

## Recommended Next Steps

1. Fix `orders/+page.svelte` - Change all `status` to `orderStatus`, uppercase enum values, use `orderAPI`
2. Fix `cart/+page.svelte` - Add shipping address form, fix currency, fix order creation payload, use `orderAPI`
3. Update currency throughout from PKR to ₦
4. Test with actual backend to verify data flows correctly
5. Add missing order fields to display (orderNumber, trackingNumber, estimatedDeliveryDate, etc.)

