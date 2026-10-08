import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API17 - Rota inexistente', () => {

  test('deve retornar 404 para uma rota que não existe', async ({ request }) => {

    const response = await request.get(
      `${API_URL}/rota-que-nao-existe`
    );

    // Rota inexistente deve retornar 404
    expect(response.status()).toBe(404);

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
    expect(body.erro.codigo).toBe('ROTA_NAO_ENCONTRADA');
  });
});