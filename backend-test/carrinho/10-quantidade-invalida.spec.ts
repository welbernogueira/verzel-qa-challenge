import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API10 - Quantidade inválida', () => {

  const casos = [
    {
      descricao: 'quantidade igual a zero',
      quantidade: 0
    },
    {
      descricao: 'quantidade negativa',
      quantidade: -1
    },
    {
      descricao: 'quantidade decimal',
      quantidade: 1.5
    }
  ];

  for (const caso of casos) {

    test(`deve retornar QUANTIDADE_INVALIDA para ${caso.descricao}`, async ({ request }) => {

      const response = await request.post(`${API_URL}/carrinho/calcular`, {
        data: {
          itens: [
            {
              produtoId: 'P001',
              quantidade: caso.quantidade
            }
          ]
        }
      });

      // Quantidade inválida deve retornar 422
      expect(response.status()).toBe(422);

      // Resposta deve ser JSON
      expect(
        response.headers()['content-type']
      ).toContain('application/json');

      const body = await response.json();

      // Validar estrutura do erro
      expect(body).toHaveProperty('erro');
      expect(body.erro).toHaveProperty('codigo');
      expect(body.erro).toHaveProperty('mensagem');

      // Código esperado pela documentação
      expect(body.erro.codigo).toBe('QUANTIDADE_INVALIDA');
    });
  }
});