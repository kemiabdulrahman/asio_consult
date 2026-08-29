# Asio Consult — Supabase SQL Schema

This schema models the content currently in the static JS data files
(`src/data/*.js`) and the site pages into a normalized PostgreSQL database
for Supabase.

**Recommended migration path:** Paste this into the **SQL Editor** in the
Supabase dashboard (or run via the CLI) after creating a new project.

---

## 1. Enable Extensions

```sql
-- For full-text search across products, courses, etc.
create extension if not exists "pg_trgm";
create extension if not exists "pgsodium"; -- optional, for supersecure columns
```

---

## 2. Enums & Base Tables

```sql
-- Drop in dependency order (safe to run repeatedly in a fresh DB)
drop table if exists course_curriculum      cascade;
drop table if exists course_features        cascade;
drop table if exists software_feature       cascade;
drop table if exists pricing_tier_feature   cascade;
drop table if exists pricing_tier           cascade;
drop table if exists software_testimonial   cascade;
drop table if exists testimonials           cascade;
drop table if exists software_products      cascade;
drop table if exists laptops                cascade;
drop table if exists courses                cascade;
drop table if exists contact_messages       cascade;
drop view  if exists v_course_full          cascade;
drop view  if exists v_software_full        cascade;

-- =========================================================
-- COURSES  (src/data/courses.js)
-- =========================================================
create table if not exists courses (
  id            text primary key,          -- slug, e.g. 'frontend-web-development'
  title         text not null,
  description   text not null,
  duration      text not null,             -- '8 weeks'
  price         text not null,             -- stored as display string '350,000' (see note below)
  level         text not null,             -- 'Beginner', 'Intermediate', ...
  mode          text not null default 'hybrid',
  location      text not null,
  image         text,
  -- optional: numeric price for filtering/sorting
  price_numeric numeric,
  featured      boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Per-course bullet points ("features" array)
create table if not exists course_features (
  id          bigint generated always as identity primary key,
  course_id   text not null references courses(id) on delete cascade,
  position    int not null default 0,
  text        text not null
);

-- Per-course curriculum ("curriculum": [{week, title, topics:[...]}])
create table if not exists course_curriculum (
  id          bigint generated always as identity primary key,
  course_id   text not null references courses(id) on delete cascade,
  week        int not null,
  title       text not null,
  topics      text[] not null default '{}'   -- array of topic strings
);

-- =========================================================
-- LAPTOPS  (src/data/laptops.js)
-- =========================================================
create table if not exists laptops (
  id              bigint generated always as identity primary key,
  name            text not null,
  brand           text not null,            -- 'Dell', 'HP', 'Lenovo'
  category        text not null,            -- 'Business' | 'Consumer'
  specs           text not null,
  price           text not null,            -- display string '850,000'
  original_price  text,
  price_numeric   numeric,                  -- for sorting/filtering
  image           text,
  available       boolean not null default true,
  condition       text not null,            -- 'Refurbished' | 'New'
  bulk_available  boolean not null default true,
  description     text
);

-- =========================================================
-- SOFTWARE PRODUCTS  (ReportTube, CBT Tube, BillTube)
-- =========================================================
create table if not exists software_products (
  id                 text primary key,     -- 'reporttube', 'cbttube', 'billtube'
  name               text not null,
  tagline            text,
  description        text not null,
  google_integration text,
  payment_note       text,                 -- 'One-time payment — pay once...'
  screenshots        text[] not null default '{}',
  sort_order         int not null default 0,
  created_at         timestamptz not null default now()
);

-- Software feature cards (array of {title, description})
create table if not exists software_feature (
  id          bigint generated always as identity primary key,
  product_id  text not null references software_products(id) on delete cascade,
  position    int not null default 0,
  title       text not null,
  description text not null
);

-- Pricing tiers (array of {name, price, period, features, popular})
create table if not exists pricing_tier (
  id          bigint generated always as identity primary key,
  product_id  text not null references software_products(id) on delete cascade,
  position    int not null default 0,
  name        text not null,               -- 'Basic' | 'Professional' | 'Enterprise'
  price       text not null,               -- '50,000'
  period      text not null default 'one-time',
  popular     boolean not null default false
);

-- Features within a pricing tier
create table if not exists pricing_tier_feature (
  id          bigint generated always as identity primary key,
  tier_id     bigint not null references pricing_tier(id) on delete cascade,
  position    int not null default 0,
  text        text not null
);

-- =========================================================
-- TESTIMONIALS  (shared across pages & software products)
-- =========================================================
create table if not exists testimonials (
  id          bigint generated always as identity primary key,
  name        text not null,
  location    text not null default 'Ibadan',
  text        text not null,
  product     text,                          -- 'ReportTube', 'CBT Tube', 'BillTube'
  rating      int not null default 5 check (rating between 1 and 5),
  source_page text,                          -- 'home' | 'reporttube' | ...
  created_at  timestamptz not null default now()
);

-- Join table mapping a testimonial to one or more software products
create table if not exists software_testimonial (
  product_id  text not null references software_products(id) on delete cascade,
  testimonial_id bigint not null references testimonials(id) on delete cascade,
  primary key (product_id, testimonial_id)
);

-- =========================================================
-- CONTACT FORM  (from src/pages/Contact.jsx)
-- =========================================================
create table if not exists contact_messages (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  status      text not null default 'new',  -- 'new' | 'read' | 'replied' | 'closed'
  created_at  timestamptz not null default now()
);
```

---

## 3. Views (handy for the frontend)

```sql
-- A flat, JSON-ready course (features + curriculum in one row)
create or replace view v_course_full as
select
    c.id, c.title, c.description, c.duration, c.price,
    c.level, c.mode, c.location, c.image, c.featured, c.sort_order,
    coalesce(
      jsonb_agg(distinct f.text) filter (where f.text is not null)
      order by min(f.position), f.text, '{}'
    ) as features,
    coalesce(
      jsonb_agg(
        jsonb_build_object('week', cc.week, 'title', cc.title, 'topics', cc.topics)
        order by cc.week
      ) filter (where cc.id is not null), '[]'
    ) as curriculum
from courses c
left join course_features f on f.course_id = c.id
left join course_curriculum cc on cc.course_id = c.id
group by c.id;

-- A flat, JSON-ready software product
create or replace view v_software_full as
select
    s.id, s.name, s.tagline, s.description, s.google_integration,
    s.payment_note, s.screenshots, s.sort_order,
    coalesce(
      jsonb_agg(distinct
        jsonb_build_object('title', f.title, 'description', f.description)
      ) filter (where f.id is not null), '[]'
    ) as features,
    coalesce(
      jsonb_agg(distinct
        jsonb_build_object(
          'name', t.name,
          'price', t.price,
          'period', t.period,
          'popular', t.popular,
          'features', ( select coalesce(jsonb_agg(tf.text order by tf.position), '[]'::jsonb)
                        from pricing_tier_feature tf where tf.tier_id = t.id )
        )
        order by t.position
      ) filter (where t.id is not null), '[]'
    ) as pricing
from software_products s
left join software_feature f on f.product_id = s.id
left join pricing_tier t on t.product_id = s.id
group by s.id;
```

---

## 4. Updated-at trigger

```sql
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_courses_updated
  before update on courses
  for each row execute function set_updated_at();
```

---

## 5. RLS Policies (security)

```sql
alter table courses              enable row level security;
alter table course_features      enable row level security;
alter table course_curriculum    enable row level security;
alter table laptops              enable row level security;
alter table software_products    enable row level security;
alter table software_feature     enable row level security;
alter table pricing_tier         enable row level security;
alter table pricing_tier_feature enable row level security;
alter table testimonials         enable row level security;
alter table software_testimonial enable row level security;
alter table contact_messages     enable row level security;

-- Public read access to all catalog content
create policy "public read courses" on courses
  for select using (true);
create policy "public read course_features" on course_features
  for select using (true);
create policy "public read course_curriculum" on course_curriculum
  for select using (true);
create policy "public read laptops" on laptops
  for select using (true);
create policy "public read software_products" on software_products
  for select using (true);
create policy "public read software_feature" on software_feature
  for select using (true);
create policy "public read pricing_tier" on pricing_tier
  for select using (true);
create policy "public read pricing_tier_feature" on pricing_tier_feature
  for select using (true);
create policy "public read testimonials" on testimonials
  for select using (true);
create policy "public read software_testimonial" on software_testimonial
  for select using (true);

-- Contact messages: anyone can insert (submission form),
-- but only authenticated admins can read/update.
create policy "public insert contact_messages" on contact_messages
  for insert with check (true);
create policy "admin read contact_messages" on contact_messages
  for select using (auth.role() = 'authenticated');
create policy "admin update contact_messages" on contact_messages
  for update using (auth.role() = 'authenticated');
```

---

## Important Notes

1. **Prices are stored as text** (`'350,000'`) because that's the exact
   display string your frontend uses. The optional `price_numeric` column
   lets you sort/filter numerically without parsing commas. Fill these via
   a data migration (see below) or an update trigger.
2. **`courses.id` is the slug** (e.g. `frontend-web-development`), matching
   the `id` your `CourseDetail` route uses via `/courses/:id`.
3. **Enums vs lookup tables:** `brand`, `category`, `level`, `condition`,
   `status` are plain text here for simplicity. If you need strict values,
   convert them to Postgres enums or reference tables.
4. **The contact form currently opens WhatsApp** instead of hitting a
   backend. To persist submissions, point `handleSubmit` at a Supabase
   client insert into `contact_messages` (and optionally keep the WhatsApp
   redirect).

---

## Seed Data (from your static files)

The static arrays in `src/data/*.js` and page components can be migrated
into these tables. Here's a representative snippet to get you started;
adjust to include all records.

```sql
begin;

-- COURSES ------------------------------------------------
insert into courses
  (id, title, description, duration, price, price_numeric, level, mode, location, image, sort_order)
values
  ('frontend-web-development',
   'Frontend Web Development',
   'Learn to build beautiful, responsive websites and web applications from scratch…',
   '8 weeks', '350,000', 350000, 'Beginner to Intermediate',
   'hybrid', 'Ibadan',
   'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
   1);
-- ... repeat for each course

insert into course_features (course_id, position, text) values
  ('frontend-web-development', 0, 'HTML5 & CSS3 fundamentals'),
  ('frontend-web-development', 1, 'JavaScript (ES6+) programming'),
  -- ...

insert into course_curriculum (course_id, week, title, topics) values
  ('frontend-web-development', 1, 'HTML Foundations',
   array['HTML5 elements','Forms & inputs','Semantic HTML']),
  -- ...

-- LAPTOPS ------------------------------------------------
insert into laptops
  (name, brand, category, specs, price, original_price, price_numeric, image,
   available, condition, bulk_available, description)
values
  ('Dell Latitude 5520', 'Dell', 'Business',
   'Intel Core i5-11th Gen, 8GB RAM, 256GB SSD, 15.6" FHD',
   '850,000', '1,200,000', 850000,
   'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop',
   true, 'Refurbished', true,
   'Reliable business laptop perfect for office work and CBT examination centers.');
-- ...

-- SOFTWARE PRODUCTS --------------------------------------
insert into software_products
  (id, name, tagline, description, google_integration, payment_note, sort_order)
values
  ('reporttube', 'ReportTube',
   'Automate School Reports — Built on Google Workspace',
   'ReportTube is a Google Workspace add-on that streamlines and automates…',
   'Works with your existing Google account…',
   'One-time payment — pay once, use forever. Free updates included.',
   1);
-- ... (cbttube, billtube)

insert into software_feature (product_id, position, title, description) values
  ('reporttube', 0, 'Built on Google Workspace', 'Runs inside Google Sheets…'),
  -- ...

insert into pricing_tier (product_id, position, name, price, period, popular) values
  ('reporttube', 0, 'Basic', '50,000', 'one-time', false),
  ('reporttube', 1, 'Professional', '150,000', 'one-time', true),
  ('reporttube', 2, 'Enterprise', '300,000', 'one-time', false);

insert into pricing_tier_feature (tier_id, position, text) values
  ((select id from pricing_tier where product_id='reporttube' and name='Basic'),
   0, 'Up to 100 students'),
  -- ...

-- TESTIMONIALS -------------------------------------------
insert into testimonials (name, location, text, product, rating, source_page) values
  ('Proprietor, Chrisdem Nursery & Primary School', 'Ibadan',
   'ReportTube has completely transformed how we prepare term reports…',
   'ReportTube', 5, 'home');
-- ...

commit;
```

> **Tip:** For a truly clean migration, instead of hand-writing every seed
> `INSERT`, you can write a small Node script using the Supabase JS client
> (or `pg`) that reads your existing `src/data/*.js` arrays and upserts them
> into the tables above.
