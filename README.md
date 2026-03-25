# Dope Kicks

![App Preview](https://imgix.cosmicjs.com/f05b7640-27f6-11f1-a9b4-1bd048ffba97-autopilot-photo-1597045566677-8cf032ed6634-1774407697302.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A premium sneaker and collectibles e-commerce storefront built for sneakerheads. Powered by [Cosmic](https://www.cosmicjs.com) CMS and Next.js 16.

## Features

- 👟 **Dynamic Product Catalog** — Browse sneakers and collectibles with category filtering
- 🏷️ **Category Pages** — Organized product categories with dedicated listing pages
- ⭐ **Customer Reviews** — Star-rated reviews linked to specific products
- 📱 **Fully Responsive** — Mobile-first design that looks great on all devices
- 🏷️ **Sale & Inventory Badges** — Real-time pricing and stock indicators
- 🖼️ **Product Galleries** — Multi-image product views with optimized loading
- 🔍 **Product Detail Pages** — Full product info with related reviews
- ⚡ **Server-Side Rendering** — Fast initial loads with Next.js 16 App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69c34fbb9949054ce30c3ed5&clone_repository=69c35110c3cad27e1b2e5469)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: A place for sneakerheads, Dope Kicks offers sneakers and collectibles for sale."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Dope Kicks'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A place for sneakerheads, Dope Kicks offers sneakers and collectibles for sale."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Cosmic SDK](https://www.npmjs.com/package/@cosmicjs/sdk) — JavaScript SDK for Cosmic

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a configured bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dope-kicks

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'air-jordan-1' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three Cosmic object types:

| Object Type | Description | Key Metafields |
|-------------|-------------|----------------|
| **Products** | Sneakers and collectibles | description, price, sale_price, category, product_image, gallery, inventory_status |
| **Categories** | Product categories | name, description, image |
| **Reviews** | Customer reviews | product, reviewer_name, rating, review |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables
5. Deploy

<!-- README_END -->