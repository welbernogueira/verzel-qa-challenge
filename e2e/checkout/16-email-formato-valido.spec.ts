import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA16 - Validação do formato do e-mail', () => {
  test('deve impedir a finalização com e-mail em formato inválido', async ({
    page,
  }) => {
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

    // E-mail inválido
    await page.getByLabel('E-mail').fill('welber@teste');

    // CEP válido
    await page.getByLabel('CEP').fill('58400520');

    // Tenta confirmar o pedido
    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve impedir a finalização
    await expect(
      page.getByText('Informe um e-mail válido.')
    ).toBeVisible();

    // O pedido não deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).not.toBeVisible();
  });
});