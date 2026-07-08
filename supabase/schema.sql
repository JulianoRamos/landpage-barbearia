-- ==========================================================================
-- Schema do conteúdo do site (Supabase / Postgres)
-- Rode no SQL Editor do Supabase.
-- ==========================================================================

create table if not exists public.site_content (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- O conteúdo fica numa única linha (id = 1).
-- A escrita é feita pelo servidor com a SERVICE ROLE KEY (ignora RLS).

-- Habilita RLS e permite LEITURA pública (a página é pública).
alter table public.site_content enable row level security;

drop policy if exists "leitura publica do conteudo" on public.site_content;
create policy "leitura publica do conteudo"
  on public.site_content
  for select
  using (true);

-- Observação: não criamos policy de INSERT/UPDATE para o público.
-- A gravação acontece apenas via SERVICE ROLE KEY no backend (rota PUT /api/content),
-- que bypassa o RLS. Assim ninguém sem a senha de admin consegue alterar o conteúdo.

-- Seed opcional: o app faz seed automático a partir do defaultContent na primeira
-- gravação. Se quiser semear manualmente, insira um JSON válido:
-- insert into public.site_content (id, data) values (1, '{}'::jsonb)
--   on conflict (id) do nothing;
