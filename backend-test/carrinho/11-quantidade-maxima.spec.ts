import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API11 - Quantidade máxima por produto', () => {

  test('deve rejeitar quantidade superior a 5 unidades', async ({ request }) => {

    // BUG-CA10-API-001:
    // A API atualmente aceita quantidade 6 e retorna HTTP 200.
    // O comportamento esperado pela documentação é HTTP 422
    // com o código QUANTIDADE_MAXIMA_EXCEDIDA.

    test.fail(
      true,
      'BUG-CA10-API-001: API permite quantidade superior a 5 unidades'
    );

    const response = await request.post(`${API_URL}/carrinho/calcular`, {
      data: {
        itens: [
          {
            produtoId: 'P001',
            quantidade: 6
          }
        ]
      }
    });

    // Comportamento esperado
    expect(response.status()).toBe(422);

    expect(
      response.headers()['content-type']
    ).toContain('application/json');

    const body = await response.json();

    expect(body).toHaveProperty('erro');
    expect(body.erro).toHaveProperty('codigo');
    expect(body.erro).toHaveProperty('mensagem');

    expect(body.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
  });
});