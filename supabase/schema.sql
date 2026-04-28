create table if not exists public.wines (
  bottle text primary key,
  order_index integer not null default 0,
  wine_name jsonb not null,
  region text not null default '',
  appel text not null default '',
  cepage text not null default '',
  conditionnement text not null default '',
  price text,
  garde text not null default '',
  temp text not null default '',
  description jsonb not null,
  pairing jsonb not null,
  caract jsonb not null,
  bottle_image_path text,
  title_image_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.wines add column if not exists bottle_image_path text;
alter table public.wines add column if not exists title_image_path text;
alter table public.wines add column if not exists price text;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists wines_set_updated_at on public.wines;
create trigger wines_set_updated_at
before update on public.wines
for each row
execute function public.set_updated_at();

alter table public.wines enable row level security;

drop policy if exists "Public read wines" on public.wines;
create policy "Public read wines"
on public.wines
for select
to anon, authenticated
using (true);

create table if not exists public.site_content (
  content_key text primary key,
  content_value jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
on public.site_content
for select
to anon, authenticated
using (true);
