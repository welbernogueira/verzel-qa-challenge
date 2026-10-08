import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA10 - Limite máximo de 5 unidades por produto', () => {
  test('deve impedir mais de 5 unidades do mesmo produto no carrinho', async ({
    page,
  }) => {
    await page.goto(URL);

    await page.getByRole('link', { name: 'Produtos' }).click();

    const produto = page.getByText('Camiseta Essencial');

    await expect(produto).toBeVisible();

    const cardProduto = produto.locator('..');

    const botaoAdicionar = cardProduto.getByRole('button', {
      name: /adicionar/i,
    });

    // Adiciona o mesmo produto 5 vezes
    for (let i = 0; i < 5; i++) {
      await botaoAdicionar.click();
    }

    await page.getByRole('link', { name: /carrinho/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Carrinho' })
    ).toBeVisible();

    // Localiza especificamente a quantidade da Camiseta Essencial
    const quantidade = page.getByRole('status', {
      name: 'Quantidade de Camiseta Essencial',
    });

    // Deve existir exatamente 5 unidades
    await expect(quantidade).toHaveText('5');

    // O botão de aumentar deve estar desabilitado ao atingir o limite
    const botaoMais = page.getByRole('button', {
      name: 'Aumentar quantidade de Camiseta Essencial',
    });

    await expect(botaoMais).toBeDisabled();

    // Confirma que a quantidade continua em 5
    await expect(quantidade).toHaveText('5');
  });
});