import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API04 - Calcular carrinho', () => {

  test('deve calcular corretamente um carrinho com item válido', async ({ request }) => {

    const response = await request.post(`${API_URL}/carrinho/calcular`, {
      data: {
        itens: [
          {
            produtoId: 'P001',
            quantidade: 1
          }
        ]
      }
    });

    // Status esperado
    expect(response.status()).toBe(200);

    // Resposta JSON
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();

    // Validar estrutura principal
    expect(body).toHaveProperty('itens');
    expect(body).toHaveProperty('subtotal');
    expect(body).toHaveProperty('desconto');
    expect(body).toHaveProperty('frete');
    expect(body).toHaveProperty('freteGratis');
    expect(body).toHaveProperty('valorFaltanteFreteGratis');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('cupom');

    // Validar item
    expect(body.itens).toHaveLength(1);
    expect(body.itens[0].produtoId).toBe('P001');
    expect(body.itens[0].nome).toBe('Camiseta Essencial');
    expect(body.itens[0].precoUnitario).toBe(59.9);
    expect(body.itens[0].quantidade).toBe(1);
    expect(body.itens[0].total).toBe(59.9);

    // Validar cálculo
    expect(body.subtotal).toBe(59.9);
    expect(body.desconto).toBe(0);
    expect(body.frete).toBe(19.9);
    expect(body.freteGratis).toBe(false);
    expect(body.valorFaltanteFreteGratis).toBe(140.1);
    expect(body.total).toBe(79.8);

    // Sem cupom
    expect(body.cupom).toBeNull();
  });
});