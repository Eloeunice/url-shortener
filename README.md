# URL Shortener API

API REST para encurtamento de URLs com autenticação JWT, gerenciamento de domínios e URLs personalizadas.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **Passport.js** + **JWT** - Autenticação
- **Zod** - Validação de schemas
- **PostgreSQL** - Banco de dados

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd url-shortener
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/url_shortener"
AUTH_SECRET="seu-secret-jwt-aqui"
```

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma migrate dev
```

## 🏃 Como executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração das rotas
├── index.ts               # Entry point
├── config/
│   ├── auth.ts           # Configuração JWT
│   └── prisma.ts         # Cliente Prisma
├── modules/
│   ├── users/            # Módulo de usuários
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.repository.ts
│   │   ├── user.routes.ts
│   │   ├── user.dto.ts
│   │   └── user.schema.ts
│   ├── domains/          # Módulo de domínios
│   │   ├── domain.controller.ts
│   │   ├── domain.service.ts
│   │   ├── domain.repository.ts
│   │   ├── domain.routes.ts
│   │   ├── domain.dto.ts
│   │   └── domain.schema.ts
│   ├── urls/             # Módulo de URLs
│   │   ├── url.controller.ts
│   │   ├── url.service.ts
│   │   ├── urlRepository.ts
│   │   ├── url.routes.ts
│   │   ├── url.dto.ts
│   │   └── url.schema.ts
│   └── middlewares/
│       ├── passport.ts   # Configuração JWT Passport
│       └── errorHandler.ts
└── @types/
    └── express/
        └── index.d.ts    # Tipos TypeScript para Express
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas, você precisa:

1. Fazer login em `POST /user/login`
2. Copiar o token do header `Authorization`
3. Incluir o token em todas as requisições protegidas:
```
Authorization: Bearer <seu-token>
```

## 📚 Documentação da API

### Rotas de Usuário

#### `GET /user`
Lista todos os usuários (público)

**Resposta:**
```json
{
  "message": "Aqui você encontra todos os seus users"
}
```

#### `POST /user/register`
Cria um novo usuário (público)

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Resposta:**
```json
{
  "id": 1,
  "email": "usuario@example.com",
  "name": "Nome do Usuário",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `POST /user/login`
Faz login e retorna token JWT (público)

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:**
- Status: `201`
- Header: `Authorization: Bearer <token>`
- Body:
```json
{
  "message": "Usuário Logado"
}
```

#### `PUT /user/:id`
Atualiza um usuário (requer autenticação)

**Parâmetros:**
- `id`: Email do usuário ou ID numérico (atualmente só email funciona)

**Body:**
```json
{
  "name": "Novo Nome",
  "password": "novaSenha123"
}
```

#### `DELETE /user/:id`
Deleta um usuário (requer autenticação)

**Parâmetros:**
- `id`: Email do usuário ou ID numérico (atualmente só email funciona)

### Rotas de Domínio (Requerem Autenticação)

#### `GET /domain`
Lista todos os domínios do usuário autenticado

**Resposta:**
```json
{
  "message": "Aqui você encontra todas as suas domínios"
}
```

#### `POST /domain`
Cria um novo domínio

**Body:**
```json
{
  "name": "exemplo.com",
  "subdomain": "www"
}
```

**Resposta:**
```json
{
  "message": "Domain created",
  "domain": {
    "id": 1,
    "name": "exemplo.com",
    "subdomain": "www",
    "authorId": 1,
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `PUT /domain/:domainId`
Atualiza um domínio

**Parâmetros:**
- `domainId`: ID do domínio

**Body:**
```json
{
  "name": "novo-exemplo.com",
  "subdomain": "www",
  "isActive": false
}
```

#### `DELETE /domain/:domainId`
Deleta um domínio

**Parâmetros:**
- `domainId`: ID do domínio

### Rotas de URL (Requerem Autenticação)

#### `GET /url`
Lista todas as URLs do usuário autenticado

**Resposta:**
```json
{
  "message": "Aqui você encontra todas as suas urls"
}
```

#### `POST /domain/:domainId/url`
Cria uma nova URL encurtada

**Parâmetros:**
- `domainId`: ID do domínio

**Body:**
```json
{
  "destinationUrl": "https://www.google.com",
  "slug": "google"  // opcional, será gerado automaticamente se não fornecido
}
```

**Resposta:**
```json
{
  "message": "Url criada",
  "url": {
    "shortenedUrl": "https://www.exemplo.com/google",
    "url": {
      "id": 1,
      "slug": "google",
      "destinationUrl": "https://www.google.com",
      "domainId": 1,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### `PUT /url/:urlId`
Atualiza uma URL

**Parâmetros:**
- `urlId`: ID da URL

**Body:**
```json
{
  "slug": "novo-slug",
  "destinationUrl": "https://www.novo-site.com",
  "isActive": false
}
```

#### `DELETE /url/:urlId`
Deleta uma URL

**Parâmetros:**
- `urlId`: ID da URL

## 📝 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação ou requisição inválida
- `401` - Não autenticado (token ausente ou inválido)
- `403` - Não autorizado (sem permissão)
- `404` - Recurso não encontrado
- `409` - Conflito (ex: slug já existe, domínio já existe)

## 🧪 Exemplo de Uso

### 1. Criar usuário
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123",
    "name": "Usuário Teste"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }' \
  -i
```

Copie o token do header `Authorization`.

### 3. Criar domínio
```bash
curl -X POST http://localhost:3000/domain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "name": "meusite.com",
    "subdomain": "www"
  }'
```

### 4. Criar URL encurtada
```bash
curl -X POST http://localhost:3000/domain/1/url \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "destinationUrl": "https://www.google.com",
    "slug": "google"
  }'
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia em modo desenvolvimento (watch)
npm run build    # Compila TypeScript para JavaScript
npm start         # Inicia em modo produção
npm run lint      # Executa o linter
npm run lint:fix  # Corrige problemas do linter
npm run format    # Formata o código com Prettier
```

## 📦 Banco de Dados

O projeto usa Prisma como ORM. Para gerenciar o banco:

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar nova migration
npx prisma migrate dev

# Visualizar banco (Prisma Studio)
npx prisma studio
```

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Validação de dados com Zod
- ✅ Verificação de autorização (usuário só acessa seus próprios recursos)
- ⚠️ **Atenção**: A senha está sendo armazenada em texto plano. Recomenda-se implementar hash (bcrypt) em produção.

## 🐛 Problemas Conhecidos

- Senha não está sendo hasheada (armazenada em texto plano)
- `DELETE /user/:id` não requer autenticação (deveria ter `authJwt`)
- Token JWT não é retornado no body do login (apenas no header)

## 📄 Licença

ISC

## 👤 Autor

Desenvolvido como projeto de estudo.

