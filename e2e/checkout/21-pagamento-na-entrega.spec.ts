import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA21 - Pagamento na entrega', () => {

  test('deve informar que o pagamento é realizado na entrega', async ({ page }) => {

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

    await page.getByRole('link', { name: /finalizar compra/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Finalizar compra' })
    ).toBeVisible();

    // Deve informar que o pagamento ocorre na entrega
    await expect(
      page.getByText('O pagamento é feito na entrega.')
    ).toBeVisible();

    // Não deve existir etapa/campo de pagamento online
    await expect(
      page.getByText(/cartão|pix|boleto/i)
    ).not.toBeVisible();
  });
});