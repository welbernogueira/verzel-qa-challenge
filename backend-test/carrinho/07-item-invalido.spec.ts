import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API07 - Item inválido', () => {

  test('deve retornar 422 quando um item não possuir produtoId e quantidade', async ({ request }) => {

    const response = await request.post(`${API_URL}/carrinho/calcular`, {
      data: {
        itens: [
          {}
        ]
      }
    });

    expect(response.status()).toBe(422);

    expect(
      response.headers()['content-type']
    ).toContain('application/json');

    const body = await response.json();

    expect(body).toHaveProperty('erro');
    expect(body.erro).toHaveProperty('codigo');
    expect(body.erro).toHaveProperty('mensagem');

    expect(body.erro.codigo).toBe('ITEM_INVALIDO');
  });
});