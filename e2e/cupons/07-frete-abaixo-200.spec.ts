import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA07 - Frete abaixo de R$ 200,00', () => {
  test('deve cobrar frete de R$ 19,90 e informar quanto falta para frete grátis', async ({
    page,
  }) => {
    await page.goto(URL);

    await page.getByRole('link', { name: 'Produtos' }).click();

    // Produto com valor abaixo de R$ 200,00
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
    const frete = page.locator('dd[data-valor="frete"]');
    const total = page.locator('dd[data-valor="total"]');

    // Subtotal deve estar abaixo de R$ 200,00
    await expect(subtotal).toHaveText('R$ 59,90');

    // Frete fixo para compras abaixo de R$ 200,00
    await expect(frete).toHaveText('R$ 19,90');

    // Total = subtotal + frete
    await expect(total).toHaveText('R$ 79,80');

    // Deve informar quanto falta para atingir o frete grátis
    await expect(
      page.getByText(/faltam/i)
    ).toBeVisible();
  });
});