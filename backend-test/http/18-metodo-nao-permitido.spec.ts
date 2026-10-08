import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API18 - Método HTTP não permitido', () => {

  test('deve retornar 405 ao utilizar método não permitido na rota', async ({ request }) => {

    const response = await request.post(`${API_URL}/produtos`, {
      data: {}
    });

    // Método não permitido deve retornar 405
    expect(response.status()).toBe(405);

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
    expect(body.erro.codigo).toBe('METODO_NAO_PERMITIDO');
  });
});