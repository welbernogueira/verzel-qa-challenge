import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API16 - Cupom expirado no pedido', () => {

  test('deve retornar 422 quando o pedido utilizar um cupom expirado', async ({ request }) => {

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
        ],
        cupom: 'VERAO2026'
      }
    });

    // Cupom expirado deve retornar 422
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
    expect(body.erro.codigo).toBe('CUPOM_EXPIRADO');
  });
});