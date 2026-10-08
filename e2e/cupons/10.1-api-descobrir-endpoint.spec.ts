import { test } from '@playwright/test';

const URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

test('descobrir requisições da API do carrinho', async ({ page }) => {
  page.on('request', request => {
    const url = request.url();

    if (
      request.method() !== 'GET' ||
      url.includes('api')
    ) {
      console.log(
        `>>> ${request.method()} ${url}`
      );

      if (request.postData()) {
        console.log(
          `>>> BODY: ${request.postData()}`
        );
      }
    }
  });

  await page.goto(URL);

  await page.getByRole('link', { name: 'Produtos' }).click();

  const produto = page.getByText('Camiseta Essencial');

  await produto
    .locator('..')
    .getByRole('button', { name: /adicionar/i })
    .click();

  await page.getByRole('link', { name: /carrinho/i }).click();
});