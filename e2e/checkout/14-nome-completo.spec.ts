import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA14 - Validação de nome e sobrenome', () => {
  test('deve impedir a finalização quando o nome não possui sobrenome', async ({
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

    // Nome sem sobrenome
    await page.getByLabel('Nome completo').fill('Welber');

    // Dados válidos nos demais campos
    await page.getByLabel('E-mail').fill('welber@teste.com');
    await page.getByLabel('CEP').fill('58400520');

    // Tenta finalizar
    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve apresentar a validação de nome completo
    await expect(
      page.getByText('Informe nome e sobrenome.')
    ).toBeVisible();

    // O pedido não deve ser confirmado
    await expect(
      page.getByText('Pedido confirmado')
    ).not.toBeVisible();
  });
});