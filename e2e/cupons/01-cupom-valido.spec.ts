import { test, expect } from '@playwright/test';

test.describe('Cupons de desconto - Verzel Store', () => {

  test('CA01 - deve aplicar 10% de desconto com o cupom BEMVINDO10', async ({ page }) => {

    // Dados esperados
    const produto = 'Jaqueta Corta-Vento';
    const subtotalEsperado = 229.90;
    const percentualDesconto = 0.10;

    const descontoEsperado = Number(
      (subtotalEsperado * percentualDesconto).toFixed(2)
    );

    const freteEsperado = 0;

    const totalEsperado = Number(
      (subtotalEsperado - descontoEsperado + freteEsperado).toFixed(2)
    );

    // --------------------------------------------------
    // 1. Acessar a loja
    // --------------------------------------------------

    await page.goto(
      'https://verzel-store.qa-test-verzel-store.workers.dev/'
    );

    await expect(
      page.getByRole('link', { name: 'Produtos' })
    ).toBeVisible();

    // --------------------------------------------------
    // 2. Acessar produtos
    // --------------------------------------------------

    await page.getByRole('link', { name: 'Produtos' }).click();

    // --------------------------------------------------
    // 3. Localizar o produto
    // --------------------------------------------------

    const produtoCard = page
      .getByText(produto)
      .locator('..');

    await expect(
      produtoCard
    ).toBeVisible();

    // --------------------------------------------------
    // 4. Adicionar produto ao carrinho
    // --------------------------------------------------

    await produtoCard
      .getByRole('button', { name: /adicionar/i })
      .click();

    // --------------------------------------------------
    // 5. Acessar carrinho
    // --------------------------------------------------

    await page.getByRole('link', { name: /carrinho/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Carrinho' })
    ).toBeVisible();

    // --------------------------------------------------
    // 6. Validar produto
    // --------------------------------------------------

    await expect(
      page.getByRole('heading', {
        name: produto,
        level: 3
      })
    ).toBeVisible();

    // --------------------------------------------------
    // 7. Validar subtotal
    // --------------------------------------------------

    const subtotal = page.locator(
      'dd[data-valor="subtotal"]'
    );

    await expect(subtotal).toHaveText('R$ 229,90');

    // --------------------------------------------------
    // 8. Aplicar cupom
    // --------------------------------------------------

    await page
      .getByRole('textbox')
      .fill('BEMVINDO10');

    await page
      .getByRole('button', {
        name: /aplicar cupom/i
      })
      .click();

    // --------------------------------------------------
    // 9. Validar que o cupom foi aplicado
    // --------------------------------------------------

    await expect(
      page.getByText('Cupom BEMVINDO10 aplicado.')
    ).toBeVisible();

    // --------------------------------------------------
    // 10. Validar desconto
    // --------------------------------------------------

    const desconto = page.locator(
      'dd[data-valor="desconto"]'
    );

    await expect(desconto).toHaveText(
      `- R$ ${descontoEsperado.toFixed(2).replace('.', ',')}`
    );

    // --------------------------------------------------
    // 11. Validar frete grátis
    // --------------------------------------------------

    const frete = page.locator(
      'dd[data-valor="frete"]'
    );

    await expect(frete).toHaveText('Grátis');

    // --------------------------------------------------
    // 12. Validar total
    // --------------------------------------------------

    const total = page.locator(
      'dd[data-valor="total"]'
    );

    await expect(total).toHaveText(
      `R$ ${totalEsperado.toFixed(2).replace('.', ',')}`
    );

  });

});