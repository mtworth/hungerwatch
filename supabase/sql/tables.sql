-- Event table: one row per pageview
create table if not exists sentinel_events (
  id uuid default gen_random_uuid() primary key,
  ts timestamptz default now(),
  hostname text
);