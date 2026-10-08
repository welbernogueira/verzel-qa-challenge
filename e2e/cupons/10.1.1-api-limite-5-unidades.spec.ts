import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular';

test.describe('CA10 - Limite de 5 unidades por produto - API', () => {
  test('deve rejeitar quantidade superior a 5 unidades', async ({
    request,
  }) => {
    const response = await request.post(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        itens: [
          {
            produtoId: 'P001',
            quantidade: 6,
          },
        ],
      },
    });

    expect(response.status()).toBe(422);

    const body = await response.json();

    expect(body.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
    expect(body.erro.campo).toBe('itens[0].quantidade');
  });
});