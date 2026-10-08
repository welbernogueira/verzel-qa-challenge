import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA13 - Validação do nome obrigatório', () => {
  test('deve impedir a finalização sem informar o nome', async ({ page }) => {
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

    // Vai para o checkout
    await page.getByRole('link', { name: /finalizar compra/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Finalizar compra' })
    ).toBeVisible();

    // Nome permanece vazio.
    // Os demais campos recebem dados válidos.
    await page.getByLabel('E-mail').fill('welber@teste.com');
    await page.getByLabel('CEP').fill('58400520');

    // Tenta confirmar o pedido
    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve impedir a finalização e apresentar a validação do nome
    await expect(
      page.getByText('Informe o nome completo.')
    ).toBeVisible();

    // O pedido não deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).not.toBeVisible();
  });
});