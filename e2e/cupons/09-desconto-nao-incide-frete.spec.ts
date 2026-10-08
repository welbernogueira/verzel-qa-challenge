import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA09 - Desconto do cupom não incide sobre o frete', () => {
  test('deve aplicar o desconto somente sobre o subtotal e manter o frete integral', async ({
    page,
  }) => {
    await page.goto(URL);

    await page.getByRole('link', { name: 'Produtos' }).click();

    const produto = page.getByText('Camiseta Essencial');

    await expect(produto).toBeVisible();

    await produto
      .locator('..')
      .getByRole('button', { name: /adicionar/i })
      .click();

    await page.getByRole('link', { name: /carrinho/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Carrinho' })
    ).toBeVisible();

    const subtotal = page.locator('dd[data-valor="subtotal"]');
    const desconto = page.locator('dd[data-valor="desconto"]');
    const frete = page.locator('dd[data-valor="frete"]');
    const total = page.locator('dd[data-valor="total"]');

    // Subtotal abaixo de R$ 200,00
    await expect(subtotal).toHaveText('R$ 59,90');

    // Frete fixo de R$ 19,90
    await expect(frete).toHaveText('R$ 19,90');

    // Aplica o cupom de 10%
    await page.getByRole('textbox').fill('BEMVINDO10');

    await page
      .getByRole('button', { name: /aplicar cupom/i })
      .click();

    await expect(
      page.getByText(/Cupom BEMVINDO10 aplicado/i)
    ).toBeVisible();

    // 10% de R$ 59,90 = R$ 5,99
    await expect(desconto).toHaveText('- R$ 5,99');

    // O frete continua R$ 19,90, sem desconto
    await expect(frete).toHaveText('R$ 19,90');

    // Total = 59,90 - 5,99 + 19,90 = 73,81
    await expect(total).toHaveText('R$ 73,81');
  });
});