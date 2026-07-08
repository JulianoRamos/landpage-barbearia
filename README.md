# 💈 Landing Page de Barbearia — conteúdo editável

Landing page moderna para barbearia (tema escuro + dourado) onde **o próprio dono edita
os textos, imagens e vídeos direto na página**, sem mexer em código.

- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Edição:** inline na própria página, protegida por senha
- **Persistência:** Supabase (Postgres) — com fallback local em desenvolvimento
- **Mídia:** upload para Cloudinary (com opção de colar URL)
- **Deploy:** Vercel

## Seções
Hero · Sobre · Serviços & Preços · Galeria · Equipe · Depoimentos · Contato/Agendamento (WhatsApp) · Rodapé

---

## Como editar o site

1. Acesse `/login` e entre com a **senha de administrador** (`ADMIN_PASSWORD`).
2. Você volta ao site com uma **barra flutuante** embaixo. Clique em **✏️ Editar site**.
3. No modo edição:
   - **Textos:** clique e digite (salva ao clicar fora).
   - **Imagens/vídeos:** passe o mouse sobre a mídia → **Trocar mídia** (upload) ou **Colar URL**.
   - **Listas** (serviços, galeria, equipe, depoimentos, horários): use os botões
     **↑ ↓** para reordenar, **✕** para remover e **+ Adicionar** para incluir.
4. Clique em **Salvar**. Pronto — as mudanças valem para todos os visitantes.

> Sem Cloudinary configurado, "Trocar mídia" cai automaticamente para **colar a URL** da imagem/vídeo.

---

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # ajuste as variáveis (veja abaixo)
npm run dev                  # http://localhost:3000
```

**Modo desenvolvimento sem contas externas:** se as variáveis do Supabase não estiverem
configuradas, o conteúdo é salvo num arquivo local (`.data/content.json`) — dá para testar
toda a edição inline imediatamente. A senha padrão de admin nesse modo é `admin`
(defina `ADMIN_PASSWORD` para trocar).

---

## Variáveis de ambiente

Veja `.env.example`. Resumo:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `ADMIN_PASSWORD` | sim | Senha para editar o site |
| `SESSION_SECRET` | sim | Segredo para assinar o cookie de sessão |
| `SUPABASE_URL` | produção | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | produção | Service role key (uso só no servidor) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | mídia | Cloud name do Cloudinary |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | mídia | Credenciais de upload |

---

## Configurando o Supabase (produção)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode o conteúdo de [`supabase/schema.sql`](./supabase/schema.sql).
3. Em **Project Settings → API**, copie a `URL` e a `service_role key` para as variáveis
   `SUPABASE_URL` e `SUPABASE_SERVICE_KEY`.

O conteúdo fica numa única linha (`id = 1`) da tabela `site_content`. A leitura é pública;
a gravação só acontece pelo backend com a service role key (após login por senha).

## Configurando o Cloudinary (upload de mídia)

1. Crie uma conta em [cloudinary.com](https://cloudinary.com).
2. No Dashboard, copie **Cloud name**, **API Key** e **API Secret** para as variáveis
   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

O upload é assinado no servidor e enviado direto do navegador ao Cloudinary (o arquivo não
passa pelo nosso backend).

---

## Deploy na Vercel

1. Importe o repositório em [vercel.com](https://vercel.com).
2. Em **Settings → Environment Variables**, adicione todas as variáveis acima.
3. Deploy. A cada `git push` a Vercel publica automaticamente.

---

## Estrutura do projeto

```
app/
  page.tsx              # página pública (Server Component) + provider de edição
  login/page.tsx        # tela de login
  api/
    auth/login|logout   # sessão por senha (cookie assinado)
    content  (PUT)      # salva o conteúdo (protegido)
    upload   (POST)     # assinatura de upload do Cloudinary (protegido)
components/
  edit/                 # EditProvider, EditToolbar, EditableText/Media, ListControls
  sections/             # Header, Hero, About, Services, Gallery, Team, Testimonials, Contact, Footer
lib/
  content.types.ts      # tipos + validação (Zod) do documento de conteúdo
  defaultContent.ts     # conteúdo inicial (pt-BR) com placeholders
  store.ts              # leitura/gravação (Supabase ↔ arquivo local)
  auth.ts               # sessão por senha única (HMAC)
  cloudinary.ts         # assinatura de upload
  placeholder.ts        # placeholders SVG embutidos
supabase/schema.sql     # schema da tabela site_content
```

## Próximos passos (fase 2, se quiser)
- Sistema de agendamento com calendário/horários reais (hoje é CTA de WhatsApp)
- Múltiplos usuários/contas para a área administrativa
- Edição de cores/tema pela interface
