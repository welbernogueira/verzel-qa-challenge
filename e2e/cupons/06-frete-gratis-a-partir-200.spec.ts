import { test, expect, Page } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

async function prepararCarrinho(page: Page) {
  await page.goto(URL);

  await page.getByRole('link', { name: 'Produtos' }).click();

  const produto = page.getByText('Jaqueta Corta-Vento');

  await expect(produto).toBeVisible();

  await produto
    .locator('..')
    .getByRole('button', { name: /adicionar/i })
    .click();

  await page.getByRole('link', { name: /carrinho/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Carrinho' })
  ).toBeVisible();
}

test.describe('CA06 - Frete grátis a partir de R$ 200,00', () => {
  test('deve conceder frete grátis para subtotal a partir de R$ 200,00', async ({
    page,
  }) => {
    await prepararCarrinho(page);

    const subtotal = page.locator('dd[data-valor="subtotal"]');
    const frete = page.locator('dd[data-valor="frete"]');
    const total = page.locator('dd[data-valor="total"]');

    // Subtotal da Jaqueta Corta-Vento
    await expect(subtotal).toHaveText('R$ 229,90');

    // R$ 229,90 >= R$ 200,00
    await expect(frete).toHaveText('Grátis');

    // Sem desconto, o total permanece igual ao subtotal
    await expect(total).toHaveText('R$ 229,90');
  });
});