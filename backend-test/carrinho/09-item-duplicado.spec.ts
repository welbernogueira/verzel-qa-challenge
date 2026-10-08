import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API09 - Item duplicado', () => {

  test('deve retornar 422 quando o mesmo produto aparecer mais de uma vez', async ({ request }) => {

    const response = await request.post(`${API_URL}/carrinho/calcular`, {
      data: {
        itens: [
          {
            produtoId: 'P001',
            quantidade: 1
          },
          {
            produtoId: 'P001',
            quantidade: 2
          }
        ]
      }
    });

    // Produto duplicado deve retornar 422
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
    expect(body.erro.codigo).toBe('ITEM_DUPLICADO');
  });
});