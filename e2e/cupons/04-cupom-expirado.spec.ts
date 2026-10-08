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

test.describe('CA04 - Rejeitar cupom expirado', () => {

  test('deve rejeitar o cupom expirado VERAO2026', async ({ page }) => {

    await prepararCarrinho(page);

    const campoCupom = page.getByRole('textbox');

    // Informa cupom expirado
    await campoCupom.fill('VERAO2026');

    // Tenta aplicar
    await page
      .getByRole('button', { name: /aplicar cupom/i })
      .click();

    // Valida mensagem de cupom expirado
    await expect(
      page.getByText('Cupom expirado.')
    ).toBeVisible();

    // Valida que nenhum desconto foi aplicado
    await expect(
      page.locator('dd[data-valor="desconto"]')
    ).toHaveText('R$ 0,00');

    // Valida que o total permaneceu inalterado
    await expect(
      page.locator('dd[data-valor="total"]')
    ).toHaveText('R$ 229,90');
  });

});