import Link from 'next/link';
import type { Product } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata?.product_image?.imgix_url;
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const categoryName = product.metadata?.category?.title || getMetafieldValue(product.metadata?.category?.metadata?.name);
  const hasSale = salePrice && price && salePrice < price;

  function getInventoryBadge(status: string): { label: string; className: string } {
    const normalized = status.toLowerCase();
    if (normalized.includes('out')) {
      return { label: 'Out of Stock', className: 'bg-red-500/20 text-red-400 border border-red-500/30' };
    }
    if (normalized.includes('low')) {
      return { label: 'Low Stock', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' };
    }
    return { label: 'In Stock', className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' };
  }

  const badge = inventoryStatus ? getInventoryBadge(inventoryStatus) : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-800 bg-surface-900 transition-all duration-300 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface-800">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl">👟</span>
          </div>
        )}

        {/* Sale Badge */}
        {hasSale && (
          <div className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            SALE
          </div>
        )}

        {/* Inventory Badge */}
        {badge && (
          <div className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
            {badge.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {categoryName && (
          <span className="mb-1 text-xs font-medium uppercase tracking-wider text-brand-400">
            {categoryName}
          </span>
        )}
        <h3 className="text-base font-bold text-white transition-colors group-hover:text-brand-400 sm:text-lg">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          {hasSale ? (
            <>
              <span className="text-xl font-extrabold text-brand-400">${salePrice.toFixed(2)}</span>
              <span className="text-sm text-surface-500 line-through">${price.toFixed(2)}</span>
            </>
          ) : price ? (
            <span className="text-xl font-extrabold text-white">${price.toFixed(2)}</span>
          ) : (
            <span className="text-sm text-surface-500">Price TBD</span>
          )}
        </div>
      </div>
    </Link>
  );
}