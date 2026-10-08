import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API13 - Criar pedido', () => {

  test('deve criar um pedido com dados válidos', async ({ request }) => {

    const response = await request.post(`${API_URL}/pedidos`, {
      data: {
        cliente: {
          nome: 'Maria Silva',
          email: 'maria@exemplo.com',
          cep: '01310-100'
        },
        itens: [
          {
            produtoId: 'P001',
            quantidade: 1
          }
        ]
      }
    });

    // Pedido criado
    expect(response.status()).toBe(201);

    // Resposta JSON
    expect(
      response.headers()['content-type']
    ).toContain('application/json');

    const body = await response.json();

    // Estrutura principal
    expect(body).toHaveProperty('numero');
    expect(body).toHaveProperty('criadoEm');
    expect(body).toHaveProperty('cliente');
    expect(body).toHaveProperty('itens');
    expect(body).toHaveProperty('subtotal');
    expect(body).toHaveProperty('desconto');
    expect(body).toHaveProperty('frete');
    expect(body).toHaveProperty('freteGratis');
    expect(body).toHaveProperty('valorFaltanteFreteGratis');
    expect(body).toHaveProperty('total');

    // Número do pedido
    expect(body.numero).toMatch(/^VZ-\d{6}$/);

    // Cliente
    expect(body.cliente.nome).toBe('Maria Silva');
    expect(body.cliente.email).toBe('maria@exemplo.com');

    // A API normaliza o CEP removendo o hífen
    expect(body.cliente.cep).toBe('01310100');

    // Item
    expect(body.itens).toHaveLength(1);
    expect(body.itens[0].produtoId).toBe('P001');
    expect(body.itens[0].quantidade).toBe(1);
    expect(body.itens[0].precoUnitario).toBe(59.9);
    expect(body.itens[0].total).toBe(59.9);

    // Cálculo
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