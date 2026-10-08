import { test, expect } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test.describe('CA12 - Finalizar compra com dados válidos', () => {
  test('deve permitir finalizar uma compra com dados válidos', async ({
    page,
  }) => {
    // Acessa a loja
    await page.goto(URL);

    // Acessa os produtos
    await page.getByRole('link', { name: 'Produtos' }).click();

    // Adiciona um produto ao carrinho
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

    // Confirma que o produto está no carrinho
    await expect(
      page.getByRole('heading', {
        name: 'Camiseta Essencial',
        level: 3,
      })
    ).toBeVisible();

    // Finaliza a compra
    await page.getByRole('link', { name: /finalizar compra/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Finalizar compra' })
    ).toBeVisible();

    // Preenche os dados do cliente
    await page.getByLabel('Nome completo').fill('Welber Nogueira');
    await page.getByLabel('E-mail').fill('welber@teste.com');
    await page.getByLabel('CEP').fill('58400520');

    // Confirma o pedido
    await page.getByRole('button', { name: 'Confirmar pedido' }).click();

    // Deve apresentar confirmação do pedido
    await expect(page.getByText('Pedido confirmado')).toBeVisible();

    // Deve gerar um número de pedido no padrão VZ-000000
    await expect(
      page.getByText(/VZ-\d{6}/)
    ).toBeVisible();

    // O carrinho deve ser esvaziado após a confirmação
    await expect(
      page.getByRole('link', { name: /carrinho 0 itens no carrinho/i })
    ).toBeVisible();
  });
});