-- ============================================================
-- Dolphin Pet Supplies - Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------
-- Products table
-- ----------------------------------------------------------
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text not null,
  description_ar text,
  description_en text,
  category text not null check (category in ('dogs', 'cats', 'birds', 'accessories', 'grooming', 'aquarium')),
  price numeric(10,2) not null,
  sale_price numeric(10,2),
  image_url text,
  is_featured boolean default false,
  is_new boolean default false,
  in_stock boolean default true,
  stock_quantity integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_featured on products(is_featured);

-- ----------------------------------------------------------
-- Contact messages table
-- ----------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_contact_created on contact_messages(created_at desc);

-- ----------------------------------------------------------
-- Newsletter subscribers table
-- ----------------------------------------------------------
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  is_active boolean default true,
  subscribed_at timestamptz default now()
);

-- ----------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------
alter table products enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public can read products only
create policy "Public read access to products"
  on products for select
  using (true);

-- Only service role (server) can write to contact_messages / newsletter
-- No public policies are created for insert/select on these tables;
-- all access goes through the server using the service role key,
-- which bypasses RLS.

-- ----------------------------------------------------------
-- Sample seed data
-- ----------------------------------------------------------
insert into products (name_ar, name_en, description_ar, description_en, category, price, sale_price, image_url, is_featured, is_new, in_stock, stock_quantity)
values
  ('طعام كلاب رويال كانين بالغ', 'Royal Canin Adult Dog Food', 'طعام جاف متكامل للكلاب البالغة من جميع السلالات', 'Complete dry food for adult dogs of all breeds', 'dogs', 850.00, 749.00, null, true, false, true, 24),
  ('طعام قطط بيوريناوان', 'Purina One Cat Food', 'طعام غني بالبروتين لدعم صحة العضلات والشعر', 'High-protein food to support muscle and coat health', 'cats', 420.00, null, null, true, true, true, 40),
  ('قفص طيور دائري كبير', 'Large Round Bird Cage', 'قفص واسع ومريح مع أدراج سهلة التنظيف', 'Spacious, comfortable cage with easy-clean trays', 'birds', 650.00, null, null, false, false, true, 12),
  ('طوق جلد فاخر للكلاب', 'Premium Leather Dog Collar', 'طوق جلد طبيعي متين وأنيق بمقاسات متعددة', 'Durable, elegant genuine leather collar, multiple sizes', 'accessories', 180.00, 149.00, null, true, false, true, 60),
  ('شامبو مضاد للحساسية', 'Hypoallergenic Pet Shampoo', 'شامبو لطيف على البشرة الحساسة للكلاب والقطط', 'Gentle formula for sensitive skin, dogs & cats', 'grooming', 95.00, null, null, false, true, true, 80),
  ('حوض أسماك زجاجي 60 لتر', '60L Glass Fish Tank', 'حوض زجاجي شفاف بإطار متين ومضخة هواء', 'Clear glass tank with sturdy frame and air pump', 'aquarium', 1200.00, 999.00, null, true, false, true, 8),
  ('لعبة كرة تفاعلية للكلاب', 'Interactive Treat Ball for Dogs', 'لعبة تحفيزية تساعد على تنشيط ذهن الكلب', 'Stimulating toy to keep your dog mentally active', 'dogs', 75.00, null, null, false, true, true, 100),
  ('صندوق فضلات مغلق للقطط', 'Covered Cat Litter Box', 'صندوق مغلق يقلل الرائحة ويحافظ على النظافة', 'Covered box reduces odor and keeps things tidy', 'cats', 320.00, 275.00, null, false, false, true, 30),
  ('بذور طيور مشكلة فاخرة', 'Premium Mixed Bird Seed', 'تركيبة متوازنة من البذور والحبوب للطيور', 'Balanced seed and grain mix for all bird types', 'birds', 60.00, null, null, false, false, true, 150),
  ('حزام مشي للكلاب قابل للتعديل', 'Adjustable Dog Walking Harness', 'حزام مريح وآمن مناسب لجميع أحجام الكلاب', 'Comfortable, secure harness for all dog sizes', 'accessories', 220.00, null, null, true, false, true, 45),
  ('فرشاة عناية بالشعر للحيوانات', 'Pet Grooming Brush', 'فرشاة فعالة لإزالة الشعر المتساقط وتلميع المعطف', 'Effective brush to remove loose fur and add shine', 'grooming', 65.00, 49.00, null, false, false, true, 90),
  ('فلتر مياه داخلي للأحواض', 'Internal Aquarium Water Filter', 'فلتر هادئ وفعال لتنقية مياه الحوض', 'Quiet, efficient filter to keep tank water clean', 'aquarium', 280.00, null, null, false, true, false, 0)
on conflict do nothing;
