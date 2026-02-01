import type { JsonObject } from 'swagger-ui-express';

export const swaggerDocument: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'URL Shortener API',
    version: '1.0.0',
    description:
      'API REST para encurtamento de URLs com autenticação JWT, gerenciamento de domínios e URLs personalizadas.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtido em POST /user/login (header Authorization)',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', example: 'usuario@example.com' },
          name: { type: 'string', example: 'Nome do Usuário' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Domain: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'exemplo.com' },
          subdomain: { type: 'string', nullable: true, example: 'www' },
          authorId: { type: 'integer', example: 1 },
          isActive: { type: 'boolean', example: true },
          isDeleted: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Url: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          slug: { type: 'string', example: 'google' },
          destinationUrl: { type: 'string', example: 'https://www.google.com' },
          domainId: { type: 'integer', example: 1 },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterBody: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email', example: 'usuario@example.com' },
          password: { type: 'string', example: 'senha123' },
          name: { type: 'string', example: 'Nome do Usuário' },
        },
      },
      LoginBody: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'usuario@example.com' },
          password: { type: 'string', example: 'senha123' },
        },
      },
      CreateDomainBody: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'exemplo.com' },
          subdomain: { type: 'string', example: 'www' },
        },
      },
      UpdateDomainBody: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'novo-exemplo.com' },
          subdomain: { type: 'string', example: 'www' },
          isActive: { type: 'boolean', example: false },
        },
      },
      CreateUrlBody: {
        type: 'object',
        required: ['destinationUrl'],
        properties: {
          destinationUrl: { type: 'string', format: 'uri', example: 'https://www.google.com' },
          slug: { type: 'string', example: 'google', description: 'Opcional. Gerado automaticamente se não informado.' },
        },
      },
      UpdateUrlBody: {
        type: 'object',
        properties: {
          slug: { type: 'string', example: 'novo-slug' },
          destinationUrl: { type: 'string', format: 'uri' },
          isActive: { type: 'boolean' },
        },
      },
      UpdateUserBody: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Novo Nome' },
          password: { type: 'string', example: 'novaSenha123' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Mensagem de erro' },
        },
      },
    },
  },
  paths: {
    '/user': {
      get: {
        tags: ['Usuário'],
        summary: 'Listar users',
        description: 'Retorna mensagem informativa (público)',
        responses: {
          '200': {
            description: 'Sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                },
              },
            },
          },
        },
      },
    },
    '/user/register': {
      post: {
        tags: ['Usuário'],
        summary: 'Criar usuário',
        description: 'Registra um novo usuário (público)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterBody' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuário criado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': {
            description: 'Erro de validação',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/user/login': {
      post: {
        tags: ['Usuário'],
        summary: 'Login',
        description: 'Autentica e retorna token JWT no header Authorization',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginBody' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Login realizado. Token no header Authorization: Bearer &lt;token&gt;',
            headers: {
              Authorization: {
                description: 'Bearer &lt;token&gt;',
                schema: { type: 'string', example: 'Bearer eyJhbGc...' },
              },
            },
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Usuário Logado' } },
                },
              },
            },
          },
          '400': {
            description: 'Credenciais inválidas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/user/{id}': {
      put: {
        tags: ['Usuário'],
        summary: 'Atualizar usuário',
        description: 'Atualiza usuário por email ou ID (requer autenticação)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Email do usuário ou ID numérico',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserBody' },
            },
          },
        },
        responses: {
          '200': { description: 'Usuário atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
          '400': { description: 'Erro', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['Usuário'],
        summary: 'Deletar usuário',
        description: 'Remove usuário por email ou ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': { description: 'Usuário deletado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '400': { description: 'Parâmetro inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/domain': {
      get: {
        tags: ['Domínio'],
        summary: 'Listar domínios',
        description: 'Lista domínios do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                },
              },
            },
          },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      post: {
        tags: ['Domínio'],
        summary: 'Criar domínio',
        description: 'Cria um novo domínio para o usuário autenticado',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateDomainBody' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Domínio criado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    domain: { $ref: '#/components/schemas/Domain' },
                  },
                },
              },
            },
          },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '409': { description: 'Domínio já existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/domain/{domainId}': {
      put: {
        tags: ['Domínio'],
        summary: 'Atualizar domínio',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'domainId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateDomainBody' },
            },
          },
        },
        responses: {
          '200': { description: 'Domínio atualizado', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, domain: { $ref: '#/components/schemas/Domain' } } } } } },
          '400': { description: 'ID inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '403': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '404': { description: 'Domínio não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['Domínio'],
        summary: 'Deletar domínio',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'domainId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '200': { description: 'Domínio deletado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '400': { description: 'ID inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '403': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '404': { description: 'Domínio não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/domain/{domainId}/url': {
      post: {
        tags: ['URL'],
        summary: 'Criar URL encurtada',
        description: 'Cria uma URL encurtada no domínio informado',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'domainId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUrlBody' },
            },
          },
        },
        responses: {
          '201': {
            description: 'URL criada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    url: {
                      type: 'object',
                      properties: {
                        shortenedUrl: { type: 'string' },
                        url: { $ref: '#/components/schemas/Url' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '403': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '409': { description: 'Slug já existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/url': {
      get: {
        tags: ['URL'],
        summary: 'Listar URLs',
        description: 'Lista URLs do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                },
              },
            },
          },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/url/{urlId}': {
      put: {
        tags: ['URL'],
        summary: 'Atualizar URL',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'urlId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUrlBody' },
            },
          },
        },
        responses: {
          '200': { description: 'URL atualizada', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, url: { $ref: '#/components/schemas/Url' } } } } } },
          '400': { description: 'ID inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '403': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '404': { description: 'URL não encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '409': { description: 'Slug já existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['URL'],
        summary: 'Deletar URL',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'urlId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '200': { description: 'URL deletada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '400': { description: 'ID inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '401': { description: 'Não autenticado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '403': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '404': { description: 'URL não encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
  },
};
