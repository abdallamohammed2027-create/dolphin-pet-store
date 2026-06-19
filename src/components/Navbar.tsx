'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import PawIcon from './PawIcon';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/products', label: t('products') },
    { href: '/#gallery', label: t('gallery') },
    { href: '/contact', label: t('contact') },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 shadow-md backdrop-blur-md dark:bg-charcoal/90'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-amber text-forest shadow-sm transition-transform group-hover:rotate-[-8deg]">
            <PawIcon className="h-6 w-6" />
          </span>
          <span className="font-display text-xl font-bold text-forest dark:text-amber-light">
            Dolphin
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-charcoal/80 transition-colors hover:bg-forest/5 hover:text-forest dark:text-cream/80 dark:hover:bg-white/5 dark:hover:text-amber-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden items-center gap-1 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-2 flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition-all hover:bg-forest-dark hover:shadow-lg active:scale-95"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t('callUs')}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest dark:text-amber-light"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-forest/10 bg-cream px-4 py-4 dark:border-white/10 dark:bg-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-forest/5 dark:text-cream dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('callUs')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
