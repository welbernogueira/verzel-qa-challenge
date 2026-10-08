import { test, expect, Page } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

async function prepararCarrinho(page: Page) {
  await page.goto(URL);

  await page.getByRole('link', { name: 'Produtos' }).click();

  // Adiciona 2 unidades da Camiseta Essencial
  const camiseta = page.getByText('Camiseta Essencial');
  await expect(camiseta).toBeVisible();

  const cardCamiseta = camiseta.locator('..');
  const botaoAdicionarCamiseta = cardCamiseta.getByRole('button', {
    name: /adicionar/i,
  });

  await botaoAdicionarCamiseta.click();
  await botaoAdicionarCamiseta.click();

  // Adiciona 1 unidade da Mochila Urbana 20L
  const mochila = page.getByText('Mochila Urbana 20L');
  await expect(mochila).toBeVisible();

  await mochila
    .locator('..')
    .getByRole('button', { name: /adicionar/i })
    .click();

  await page.getByRole('link', { name: /carrinho/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Carrinho' })
  ).toBeVisible();
}

test.describe('CA08 - Frete considera subtotal antes do desconto', () => {
  test('deve manter frete grátis quando subtotal antes do desconto é maior ou igual a R$ 200,00', async ({
    page,
  }) => {
    await prepararCarrinho(page);

    const subtotal = page.locator('dd[data-valor="subtotal"]');
    const desconto = page.locator('dd[data-valor="desconto"]');
    const frete = page.locator('dd[data-valor="frete"]');
    const total = page.locator('dd[data-valor="total"]');

    // Subtotal antes do desconto
    await expect(subtotal).toHaveText('R$ 219,80');

    // Aplica o cupom de 10%
    await page.getByRole('textbox').fill('BEMVINDO10');
    await page
      .getByRole('button', { name: /aplicar cupom/i })
      .click();

    await expect(
      page.getByText(/Cupom BEMVINDO10 aplicado/i)
    ).toBeVisible();

    // Desconto de 10% sobre R$ 219,80
    await expect(desconto).toHaveText('- R$ 21,98');

    // Após o desconto: R$ 197,82 (< R$ 200,00)
    await expect(total).toHaveText('R$ 197,82');

    // O frete continua grátis porque a regra considera
    // o subtotal ANTES do desconto: R$ 219,80 >= R$ 200,00
    await expect(frete).toHaveText('Grátis');
  });
});