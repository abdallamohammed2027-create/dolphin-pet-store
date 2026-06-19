# Dolphin Pet Supplies — متجر دولفين لمستلزمات الحيوانات الأليفة

موقع متجر إلكتروني فاخر وكامل (Front-end + Back-end) لمتجر مستلزمات حيوانات أليفة، بدعم كامل للعربية والإنجليزية (RTL/LTR)، مبني بـ **Next.js 15 (App Router)**، **TypeScript**، **Tailwind CSS**، و **Supabase**.

---

## 🚀 المميزات

- تصميم عصري فاخر، متجاوب بالكامل (mobile-first)، Dark/Light mode
- ثنائي اللغة بالكامل (عربي RTL / إنجليزي LTR) عبر `next-intl`
- صفحات: الرئيسية، من نحن، المنتجات (بحث + فلترة), معرض الصور (Lightbox), تواصل معنا، 404
- نموذج تواصل مع: Validation (Zod) + Sanitization + reCAPTCHA v3 + Rate limiting + إشعار بريد إلكتروني (Resend)
- نشرة بريدية (Newsletter) متصلة بقاعدة بيانات Supabase
- لوحة تحكم Admin محمية بكلمة مرور لإدارة الرسائل، المشتركين، والمنتجات (CRUD كامل)
- SEO: meta tags, Open Graph, sitemap.xml, robots.txt, JSON-LD structured data
- Accessibility: ARIA labels, skip links, focus rings, keyboard navigation
- زر واتساب عائم + روابط سوشيال ميديا
- خرائط جوجل مدمجة

---

## 🧰 التقنيات المستخدمة

| الفئة | التقنية |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl (ar/en) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Validation | Zod |
| Icons | lucide-react |
| Notifications | react-hot-toast |
| Lightbox | yet-another-react-lightbox |
| Auth (Admin) | jose (JWT, HTTP-only cookies) |

---

## 📦 التثبيت والتشغيل

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env.local` وعبّئ القيم:

```bash
cp .env.example .env.local
```

| المتغير | الوصف |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروع Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام (anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | المفتاح السري (service role) — **لا تشاركه أبداً** |
| `RESEND_API_KEY` | مفتاح Resend لإرسال إشعارات البريد |
| `CONTACT_RECEIVER_EMAIL` | البريد الذي تصل إليه رسائل التواصل |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | مفتاح reCAPTCHA v3 العام |
| `RECAPTCHA_SECRET_KEY` | مفتاح reCAPTCHA السري |
| `ADMIN_PASSWORD` | كلمة مرور لوحة التحكم |
| `ADMIN_SESSION_SECRET` | نص عشوائي طويل لتوقيع جلسات الأدمن |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع النهائي |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب بصيغة دولية بدون + (مثال: 201014410528) |

### 3. إعداد قاعدة بيانات Supabase

1. أنشئ مشروع جديد على [supabase.com](https://supabase.com)
2. اذهب إلى **SQL Editor**
3. الصق محتوى ملف `supabase/schema.sql` وشغّله — سينشئ الجداول، السياسات (RLS)، وبيانات تجريبية

### 4. التشغيل محلياً

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) — سيتم تحويلك تلقائياً إلى `/ar` (اللغة الافتراضية).

### 5. الوصول للوحة التحكم

اذهب إلى `/ar/admin` أو `/en/admin` وسجل الدخول بكلمة المرور المحددة في `ADMIN_PASSWORD`.

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── [locale]/              # الصفحات متعددة اللغات
│   │   ├── layout.tsx          # Layout رئيسي (Navbar, Footer, Providers)
│   │   ├── page.tsx             # الرئيسية
│   │   ├── about/                # من نحن
│   │   ├── products/             # المنتجات (بحث + فلترة)
│   │   ├── contact/              # تواصل معنا
│   │   ├── admin/                 # لوحة التحكم (محمية)
│   │   └── not-found.tsx        # صفحة 404
│   ├── api/                     # API Routes
│   │   ├── contact/
│   │   ├── newsletter/
│   │   ├── products/
│   │   └── admin/                # مسارات الأدمن (محمية بجلسة JWT)
│   ├── sitemap.ts
│   └── robots.ts
├── components/                 # مكونات قابلة لإعادة الاستخدام
├── lib/
│   ├── supabase/               # عملاء Supabase + Types
│   ├── validations.ts          # Zod schemas
│   ├── rate-limit.ts
│   ├── recaptcha.ts
│   ├── email.ts
│   └── auth.ts                  # جلسات الأدمن (JWT)
├── i18n/                        # إعدادات next-intl
└── messages/                    # ملفات الترجمة (ar.json / en.json)
supabase/
└── schema.sql                   # سكيما قاعدة البيانات + بيانات تجريبية
```

---

## 🎨 نظام الألوان

| اللون | القيمة | الاستخدام |
|---|---|---|
| Forest Green | `#0F5132` | اللون الأساسي (من اللوجو) |
| Amber | `#F5A623` | اللون الثانوي / CTA |
| Cream | `#FBF8F2` | الخلفية (الوضع الفاتح) |
| Charcoal | `#1A1F1B` | الخلفية (الوضع الداكن) |
| Sand | `#F0E9DC` | البطاقات والخلفيات الثانوية |
| Coral | `#FF7A5C` | العروض والتنبيهات |

---

## 🌐 النشر (Deployment)

الموقع جاهز للنشر مباشرة على **Vercel**:

1. اربط المستودع بـ Vercel
2. أضف متغيرات البيئة من `.env.example` في إعدادات المشروع
3. Deploy 🚀

تأكد من إعداد قاعدة بيانات Supabase وتشغيل `schema.sql` قبل النشر.

---

## ⚠️ ملاحظات هامة

- **معدل الطلبات (Rate Limiting)**: الحل الحالي يعمل في الذاكرة (in-memory) ومناسب لخادم واحد. للنشر على بيئات serverless متعددة، استخدم Redis (مثل Upstash) لحل موزّع.
- **صور المنتجات**: استبدل `image_url` الافتراضية (null) بروابط صور حقيقية من Supabase Storage أو أي CDN.
- **صور المعرض (Gallery)**: الصور الحالية هي صور Unsplash مؤقتة — استبدلها بصور المتجر الحقيقية.
- لا تشارك `SUPABASE_SERVICE_ROLE_KEY` أو `ADMIN_SESSION_SECRET` علناً أبداً.
