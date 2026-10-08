import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA19 - CEP válido com hífen', () => {

  test('deve permitir finalizar a compra com CEP no formato 00000-000', async ({ page }) => {

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

    // CEP válido com hífen
    await page.getByLabel('CEP').fill('58400-520');

    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve confirmar o pedido
    await expect(
      page.getByText('Pedido confirmado')
    ).toBeVisible();

    // Deve gerar número do pedido
    await expect(
      page.getByText(/VZ-\d{6}/)
    ).toBeVisible();
  });
});