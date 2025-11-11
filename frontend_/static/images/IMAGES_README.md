# Static Images Folder Structure

This folder contains all static images, logos, and icons used throughout the ASIO CONSULT application.

## Folder Organization

```
/static/images/
├── /logos/          - Company logo and branding assets
├── /products/       - Product images (uploaded via admin panel)
├── /icons/          - SVG icons and small graphics
├── /hero/           - Hero section background images
└── IMAGES_README.md - This file
```

## Image Usage Guide

### 1. **Logo** (`/logos/`)
- **File**: `logo.png` (recommended: 200x100px)
- **Usage**: Navbar component, Footer, Header
- **Import Path**: `/images/logos/logo.png`
- **Example**: 
  ```svelte
  <img src="/images/logos/logo.png" alt="ASIO CONSULT" class="h-10 w-auto" />
  ```

### 2. **Product Images** (`/products/`)
- **File Format**: PNG or JPG
- **Recommended Size**: 600x400px or 400x300px
- **Usage**: Product cards in shop page, admin product preview
- **How to Add**: Upload via admin panel → Products tab → Image Upload
- **Fallback**: `/images/products/laptop-placeholder.jpg` for missing images

### 3. **Hero/Section Images** (`/hero/`)
- **Files**:
  - `hero-image.jpg` - Main landing page hero section
  - `about-image.jpg` - About section
  - `sasr-screenshot.png` - SASR software showcase
- **Recommended Size**: 1200x600px (16:9 aspect ratio)
- **Usage**: Services page, homepage hero sections

### 4. **Icons** (`/icons/`)
- **Format**: SVG recommended
- **Usage**: For reusable icons throughout the app
- **Example Paths**:
  - `/images/icons/check.svg`
  - `/images/icons/arrow.svg`

## How to Add New Images

### Adding Static Images (Not Via Admin)
1. Place image file in appropriate subfolder under `/static/images/`
2. Update component to reference:
   ```svelte
   <img src="/images/{subfolder}/{filename}" alt="description" />
   ```
3. No build step needed - SvelteKit serves static files automatically

### Adding Product Images (Via Admin Panel)
1. Use admin panel → Products tab
2. Fill in product details
3. Click "Choose Image" and upload
4. Image is stored on backend and linked to product record
5. Frontend auto-fetches from backend API

## File Size & Performance

- **Logos**: Keep under 50KB (PNG)
- **Product Images**: Optimize to 100-200KB (use TinyPNG or similar)
- **Hero Images**: Keep under 500KB (use modern formats like WebP if possible)
- **Icons**: SVG preferred (inline or optimized < 20KB)

## Current Images

### Placeholders (To Be Replaced)
- `/images/logos/logo.png` - Add your ASIO CONSULT logo here
- `/images/hero/hero-image.jpg` - Add main landing hero image
- `/images/hero/about-image.jpg` - Add about section image
- `/images/hero/sasr-screenshot.png` - Add SASR software screenshot
- `/images/products/laptop-placeholder.jpg` - Fallback for missing product images

### Adding Images

**Step 1**: Save your image file to the appropriate folder
```bash
# Example: Add company logo
cp ~/Downloads/logo.png frontend_/static/images/logos/

# Example: Add hero image
cp ~/Downloads/hero.jpg frontend_/static/images/hero/
```

**Step 2**: Update the component reference (if needed)
```svelte
<!-- Old -->
<img src="/logo.png" alt="Logo" />

<!-- New -->
<img src="/images/logos/logo.png" alt="ASIO CONSULT Logo" />
```

## Image Optimization Tips

1. **Use correct format**:
   - JPG: Photos and complex images
   - PNG: Graphics, logos with transparency
   - SVG: Icons and vector graphics

2. **Compress before adding**:
   - Use TinyPNG.com or ImageOptim
   - Target: 80-90% quality, 100-300KB max per image

3. **Responsive images** (optional, for hero images):
   ```svelte
   <img 
     src="/images/hero/hero-image.jpg" 
     alt="Hero Section"
     class="w-full h-auto object-cover"
   />
   ```

## Backend Image Storage

Images uploaded via the admin panel are stored in:
- **Backend Path**: `/backend/uploads/`
- **Database**: Referenced in Products table via `image` field
- **API Endpoint**: `GET /api/products/{id}` returns `image` URL

## Questions?

Refer to component files for examples:
- `src/components/Navbar.svelte` - Logo usage
- `src/components/ProductCard.svelte` - Product image usage
- `src/routes/services/+page.svelte` - Hero image usage
