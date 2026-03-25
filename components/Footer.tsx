import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="container-main py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">👟</span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                DOPE<span className="text-brand-500">KICKS</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-surface-400 leading-relaxed">
              A place for sneakerheads. Dope Kicks offers premium sneakers and collectibles for the culture.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-300">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="text-sm text-surface-400 transition-colors hover:text-brand-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-surface-400 transition-colors hover:text-brand-400">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-300">Community</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/reviews" className="text-sm text-surface-400 transition-colors hover:text-brand-400">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-300">Powered By</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-400 transition-colors hover:text-brand-400"
                >
                  Cosmic
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-400 transition-colors hover:text-brand-400"
                >
                  Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-800 pt-6">
          <p className="text-center text-xs text-surface-500">
            &copy; {new Date().getFullYear()} Dope Kicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}