import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA18 - CEP com formato inválido', () => {

  test('deve impedir a finalização quando o CEP possuir quantidade inválida de dígitos', async ({ page }) => {

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

    // Dados válidos
    await page.getByLabel('Nome completo').fill('Welber Nogueira');
    await page.getByLabel('E-mail').fill('welber@teste.com');

    // CEP inválido: apenas 7 dígitos
    await page.getByLabel('CEP').fill('5840052');

    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve apresentar a validação do CEP
    await expect(
      page.getByText('Somente números ou no formato 00000-000.')
    ).toBeVisible();

    // O pedido não deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).not.toBeVisible();
  });
});