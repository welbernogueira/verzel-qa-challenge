import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA17 - CEP obrigatório', () => {

  test('deve impedir a finalização quando o CEP não for informado', async ({ page }) => {

    // Acessa a loja
    await page.goto(URL);

    // Acessa os produtos
    await page.getByRole('link', { name: 'Produtos' }).click();

    // Adiciona a Camiseta Essencial
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

    // Vai para o checkout
    await page.getByRole('link', { name: /finalizar compra/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Finalizar compra' })
    ).toBeVisible();

    // Preenche nome e e-mail válidos
    await page.getByLabel('Nome completo').fill('Welber Nogueira');
    await page.getByLabel('E-mail').fill('welber@teste.com');

    // Não informa o CEP
    await page.getByLabel('CEP').fill('');

    // Tenta confirmar o pedido
await page.getByRole('button', { name: 'Confirmar pedido' }).click();

// Deve apresentar a mensagem de validação do CEP
await expect(
  page.getByText('Informe o CEP.')
).toBeVisible();

// Não deve confirmar o pedido
await expect(
  page.getByText('Pedido confirmado')
).not.toBeVisible();
  });
});