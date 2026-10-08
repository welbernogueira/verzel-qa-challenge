import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api';

test.describe('API14 - Dados do cliente inválidos', () => {

  test('deve retornar 422 quando o nome do cliente for inválido', async ({ request }) => {

    const response = await request.post(`${API_URL}/pedidos`, {
      data: {
        cliente: {
          nome: '',
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

    // Dados inválidos devem retornar 422
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
    expect(body.erro.codigo).toBe('DADOS_INVALIDOS');

    // Deve informar os campos inválidos
    expect(body.erro).toHaveProperty('campos');
  });
});