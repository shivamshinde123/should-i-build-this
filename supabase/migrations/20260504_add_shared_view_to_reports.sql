alter table public.reports
add column if not exists shared_view jsonb;
