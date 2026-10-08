import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API08 - Produto inexistente', () => {

  test('deve retornar 422 quando o produto informado não existir', async ({ request }) => {

    const response = await request.post(`${API_URL}/carrinho/calcular`, {
      data: {
        itens: [
          {
            produtoId: 'P999',
            quantidade: 1
          }
        ]
      }
    });

    // Produto inexistente deve retornar 422
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
    expect(body.erro.codigo).toBe('PRODUTO_NAO_ENCONTRADO');
  });
});