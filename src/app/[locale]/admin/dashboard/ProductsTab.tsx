'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product, ProductCategory } from '@/lib/supabase/database.types';

const CATEGORIES: ProductCategory[] = ['dogs', 'cats', 'birds', 'accessories', 'grooming', 'aquarium'];

const emptyForm = {
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  category: 'dogs' as ProductCategory,
  price: 0,
  sale_price: '' as number | '',
  image_url: '',
  is_featured: false,
  is_new: false,
  in_stock: true,
  stock_quantity: 0,
};

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name_ar: product.name_ar,
      name_en: product.name_en,
      description_ar: product.description_ar ?? '',
      description_en: product.description_en ?? '',
      category: product.category,
      price: product.price,
      sale_price: product.sale_price ?? '',
      image_url: product.image_url ?? '',
      is_featured: product.is_featured,
      is_new: product.is_new,
      in_stock: product.in_stock,
      stock_quantity: product.stock_quantity,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      sale_price: form.sale_price === '' ? null : Number(form.sale_price),
      price: Number(form.price),
      stock_quantity: Number(form.stock_quantity),
      description_ar: form.description_ar || null,
      description_en: form.description_en || null,
      image_url: form.image_url || null,
    };

    const res = await fetch('/api/admin/products', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload),
    });
    const data = await res.json();

    if (data.success) {
      toast.success(editing ? 'Product updated' : 'Product created');
      setShowForm(false);
      fetchProducts();
    } else {
      toast.error('Failed to save product');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted');
    } else {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-forest-dark"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-forest/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-sand dark:bg-white/5">
            <tr>
              <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Name (EN)</th>
              <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Category</th>
              <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Price</th>
              <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-forest/5 dark:border-white/5">
                <td className="px-4 py-3 text-charcoal dark:text-cream">{p.name_en}</td>
                <td className="px-4 py-3 capitalize text-charcoal/60 dark:text-cream/60">{p.category}</td>
                <td className="px-4 py-3 text-charcoal/60 dark:text-cream/60">
                  {p.sale_price ? (
                    <>
                      <span className="text-coral">{p.sale_price}</span>{' '}
                      <span className="line-through">{p.price}</span>
                    </>
                  ) : (
                    p.price
                  )}
                </td>
                <td className="px-4 py-3 text-charcoal/60 dark:text-cream/60">
                  {p.in_stock ? p.stock_quantity : 'Out of stock'}
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      aria-label="Edit product"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 dark:text-amber-light dark:hover:bg-white/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete product"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-coral transition-colors hover:bg-coral/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 dark:bg-charcoal sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-forest dark:text-amber-light">
                {editing ? 'Edit Product' : 'New Product'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 dark:text-cream/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name (Arabic)" value={form.name_ar} onChange={(v) => setForm((f) => ({ ...f, name_ar: v }))} fullWidth />
              <Field label="Name (English)" value={form.name_en} onChange={(v) => setForm((f) => ({ ...f, name_en: v }))} fullWidth />
              <Field label="Description (Arabic)" value={form.description_ar} onChange={(v) => setForm((f) => ({ ...f, description_ar: v }))} textarea fullWidth />
              <Field label="Description (English)" value={form.description_en} onChange={(v) => setForm((f) => ({ ...f, description_en: v }))} textarea fullWidth />

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ProductCategory }))}
                  className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2.5 text-sm text-charcoal dark:border-white/10 dark:bg-charcoal/30 dark:text-cream"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <Field label="Image URL" value={form.image_url} onChange={(v) => setForm((f) => ({ ...f, image_url: v }))} fullWidth />
              <Field label="Price (EGP)" value={String(form.price)} onChange={(v) => setForm((f) => ({ ...f, price: Number(v) || 0 }))} type="number" />
              <Field label="Sale Price (EGP)" value={String(form.sale_price)} onChange={(v) => setForm((f) => ({ ...f, sale_price: v === '' ? '' : Number(v) }))} type="number" />
              <Field label="Stock Quantity" value={String(form.stock_quantity)} onChange={(v) => setForm((f) => ({ ...f, stock_quantity: Number(v) || 0 }))} type="number" />

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Checkbox label="Featured" checked={form.is_featured} onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))} />
                <Checkbox label="New" checked={form.is_new} onChange={(v) => setForm((f) => ({ ...f, is_new: v }))} />
                <Checkbox label="In Stock" checked={form.in_stock} onChange={(v) => setForm((f) => ({ ...f, in_stock: v }))} />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full border border-forest/15 px-5 py-2.5 text-sm font-semibold text-charcoal dark:border-white/10 dark:text-cream"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-forest-dark disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  textarea = false,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  textarea?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2.5 text-sm text-charcoal dark:border-white/10 dark:bg-charcoal/30 dark:text-cream"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2.5 text-sm text-charcoal dark:border-white/10 dark:bg-charcoal/30 dark:text-cream"
        />
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-charcoal dark:text-cream">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-forest/30 text-forest focus:ring-forest"
      />
      {label}
    </label>
  );
}
