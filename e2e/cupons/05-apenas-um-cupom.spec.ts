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

  await expect(
    page.locator('dd[data-valor="subtotal"]')
  ).toHaveText('R$ 229,90');
}

async function aplicarCupom(page: Page, cupom: string) {
  const campoCupom = page.getByRole('textbox');

  await campoCupom.fill(cupom);

  await page
    .getByRole('button', { name: /aplicar cupom/i })
    .click();
}

async function removerCupom(page: Page) {
  await page
    .getByRole('button', { name: /remover cupom/i })
    .click();

  await expect(
    page.getByRole('textbox')
  ).toBeVisible();

  await page.getByRole('textbox').fill('');
}

test.describe('CA05 - Apenas um cupom pode ser aplicado por vez', () => {

  test('deve exigir a remoção do cupom atual antes de aplicar outro', async ({ page }) => {

    await prepararCarrinho(page);

    // --------------------------------------------------
    // 1. Aplica o primeiro cupom
    // --------------------------------------------------

    await aplicarCupom(page, 'BEMVINDO10');

    await expect(
      page.getByText(/Cupom BEMVINDO10 aplicado/i)
    ).toBeVisible();

    await expect(
      page.locator('dd[data-valor="desconto"]')
    ).toHaveText('- R$ 22,99');

    await expect(
      page.locator('dd[data-valor="total"]')
    ).toHaveText('R$ 206,91');

    // --------------------------------------------------
    // 2. Confirma que o cupom atual está aplicado
    // --------------------------------------------------

    await expect(
      page.getByRole('button', { name: /remover cupom/i })
    ).toBeVisible();

    // --------------------------------------------------
    // 3. Remove o cupom atual
    // --------------------------------------------------

    await removerCupom(page);

    // --------------------------------------------------
    // 4. Confirma que o desconto foi removido
    // --------------------------------------------------

    await expect(
      page.locator('dd[data-valor="desconto"]')
    ).toHaveText('R$ 0,00');

    await expect(
      page.locator('dd[data-valor="total"]')
    ).toHaveText('R$ 229,90');

    // --------------------------------------------------
    // 5. Aplica novamente o cupom
    // --------------------------------------------------

    await aplicarCupom(page, 'BEMVINDO10');

    // --------------------------------------------------
    // 6. Confirma nova aplicação
    // --------------------------------------------------

    await expect(
      page.getByText(/Cupom BEMVINDO10 aplicado/i)
    ).toBeVisible();

    await expect(
      page.locator('dd[data-valor="desconto"]')
    ).toHaveText('- R$ 22,99');

    await expect(
      page.locator('dd[data-valor="total"]')
    ).toHaveText('R$ 206,91');

  });

});