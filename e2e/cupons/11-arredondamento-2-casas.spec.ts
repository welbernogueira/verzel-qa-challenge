import { test, expect } from '@playwright/test';

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular';

test.describe('CA11 - Valores monetários arredondados para 2 casas', () => {
  test('deve retornar valores monetários com no máximo 2 casas decimais', async ({
    request,
  }) => {
    const response = await request.post(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        itens: [
          {
            produtoId: 'P001',
            quantidade: 1,
          },
        ],
        cupom: 'BEMVINDO10',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Valores esperados
    expect(body.subtotal).toBe(59.9);
    expect(body.desconto).toBe(5.99);
    expect(body.frete).toBe(19.9);
    expect(body.total).toBe(73.81);

    // Validação de precisão monetária:
    // nenhum valor pode possuir mais de 2 casas decimais.
    const valoresMonetarios = [
      body.subtotal,
      body.desconto,
      body.frete,
      body.total,
      body.itens[0].precoUnitario,
      body.itens[0].total,
    ];

    for (const valor of valoresMonetarios) {
      expect(Number(valor.toFixed(2))).toBe(valor);
    }
  });
});