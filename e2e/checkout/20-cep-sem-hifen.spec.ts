import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA20 - CEP válido sem hífen', () => {

  test('deve permitir finalizar a compra com CEP contendo 8 números', async ({ page }) => {

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

    // CEP válido: 8 números, sem hífen
    await page.getByLabel('CEP').fill('58400520');

    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Pedido deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).toBeVisible();

    // Deve gerar número do pedido
    await expect(
      page.getByText(/VZ-\d{6}/)
    ).toBeVisible();
  });
});