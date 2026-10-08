import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA15 - Validação do e-mail obrigatório', () => {
  test('deve impedir a finalização sem informar o e-mail', async ({ page }) => {
    await page.goto(URL);

    // Adiciona produto
    await page.getByRole('link', { name: 'Produtos' }).click();

    const produto = page.getByText('Camiseta Essencial');

    await expect(produto).toBeVisible();

    await produto
      .locator('..')
      .getByRole('button', { name: /adicionar/i })
      .click();

    // Acessa o carrinho
    await page.getByRole('link', { name: /carrinho/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Carrinho' })
    ).toBeVisible();

    // Acessa o checkout
    await page.getByRole('link', { name: /finalizar compra/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Finalizar compra' })
    ).toBeVisible();

    // Nome válido
    await page.getByLabel('Nome completo').fill('Welber Nogueira');

    // E-mail permanece vazio

    // CEP válido
    await page.getByLabel('CEP').fill('58400520');

    // Tenta confirmar o pedido
    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve apresentar a validação do e-mail
    await expect(
      page.getByText('Informe o e-mail.')
    ).toBeVisible();

    // O pedido não deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).not.toBeVisible();
  });
});