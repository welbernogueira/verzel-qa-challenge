import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API01 - Listar produtos', () => {

  test('deve retornar a lista de produtos com status 200', async ({ request }) => {

    const response = await request.get(`${API_URL}/produtos`);

    // Status HTTP
    expect(response.status()).toBe(200);

    // Resposta deve ser JSON
    expect(response.headers()['content-type']).toContain('application/json');

    const produtos = await response.json();

    // Deve retornar uma lista
    expect(Array.isArray(produtos)).toBe(true);

    // A documentação disponibiliza 8 produtos
    expect(produtos).toHaveLength(8);

    // Validar estrutura dos produtos
    for (const produto of produtos) {
      expect(produto).toHaveProperty('id');
      expect(produto).toHaveProperty('nome');
      expect(produto).toHaveProperty('descricao');
      expect(produto).toHaveProperty('categoria');
      expect(produto).toHaveProperty('preco');

      expect(typeof produto.id).toBe('string');
      expect(typeof produto.nome).toBe('string');
      expect(typeof produto.descricao).toBe('string');
      expect(typeof produto.categoria).toBe('string');
      expect(typeof produto.preco).toBe('number');
    }

    // Validar produto conhecido
    const camiseta = produtos.find(
      (produto: { id: string }) => produto.id === 'P001'
    );

    expect(camiseta).toBeDefined();
    expect(camiseta.nome).toBe('Camiseta Essencial');
    expect(camiseta.preco).toBe(59.9);
  });
});