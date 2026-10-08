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

async function removerCupom(page: Page) {
  await page
    .getByRole('button', { name: /remover cupom/i })
    .click();

  const campoCupom = page.getByRole('textbox');

  await expect(campoCupom).toBeVisible();

  await campoCupom.fill('');
}

test.describe('CA02 - Cupom com maiúsculas, minúsculas e espaços', () => {

  test('deve aceitar diferentes combinações de maiúsculas/minúsculas e espaços nas extremidades', async ({ page }) => {

    await prepararCarrinho(page);

    const campoCupom = page.getByRole('textbox');

    const variacoes = [
      'BEMVINDO10',
      'bemvindo10',
      'bemVINDO10',
      'beMvinDO10',
      '  BEMVINDO10  ',
    ];

    for (const cupom of variacoes) {

      // Preenche o cupom
      await campoCupom.fill(cupom);

      // Aplica o cupom
      await page
        .getByRole('button', { name: /aplicar cupom/i })
        .click();

      // Valida aplicação
      await expect(
        page.getByText(/Cupom BEMVINDO10 aplicado/i)
      ).toBeVisible();

      // Valida desconto de 10%
      await expect(
        page.locator('dd[data-valor="desconto"]')
      ).toHaveText('- R$ 22,99');

      // Valida total
      await expect(
        page.locator('dd[data-valor="total"]')
      ).toHaveText('R$ 206,91');

      // Remove o cupom antes da próxima variação
      await removerCupom(page);
    }
  });

});