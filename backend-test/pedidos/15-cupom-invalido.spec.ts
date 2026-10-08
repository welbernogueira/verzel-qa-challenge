import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API15 - Cupom inválido no pedido', () => {

  test('deve retornar 422 quando o pedido utilizar um cupom inexistente', async ({ request }) => {

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
        cupom: 'CUPOM_INEXISTENTE'
      }
    });

    // Cupom inválido no pedido deve retornar 422
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
    expect(body.erro.codigo).toBe('CUPOM_INVALIDO');
  });
});