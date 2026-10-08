import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API02 - Consultar produto por ID', () => {

  test('deve retornar o produto P001 com status 200', async ({ request }) => {

    const response = await request.get(`${API_URL}/produtos/P001`);

    // Status HTTP
    expect(response.status()).toBe(200);

    // Resposta deve ser JSON
    expect(response.headers()['content-type']).toContain('application/json');

    const produto = await response.json();

    // Validar estrutura
    expect(produto).toHaveProperty('id');
    expect(produto).toHaveProperty('nome');
    expect(produto).toHaveProperty('descricao');
    expect(produto).toHaveProperty('categoria');
    expect(produto).toHaveProperty('preco');

    // Validar dados do produto
    expect(produto.id).toBe('P001');
    expect(produto.nome).toBe('Camiseta Essencial');
    expect(produto.preco).toBe(59.9);
  });
});