# Verzel QA Challenge --- Verzel Store

Projeto de Quality Assurance desenvolvido para o desafio técnico da
Verzel Store. O objetivo é validar os fluxos de cupons de desconto,
cálculo do carrinho, regra de frete grátis, checkout e contratos da API,
combinando testes manuais e automatizados.

> **Ambiente de teste:**
> https://verzel-store.qa-test-verzel-store.workers.dev/\
> **Documentação funcional/API:**
> https://verzel-store.qa-test-verzel-store.workers.dev/documentacao

## Sumário

-   [Objetivos](#objetivos)
-   [Tecnologias e ferramentas](#tecnologias-e-ferramentas)
-   [Pré-requisitos](#pré-requisitos)
-   [Configuração do ambiente](#configuração-do-ambiente)
-   [Estrutura do projeto](#estrutura-do-projeto)
-   [Como executar os testes](#como-executar-os-testes)
-   [Relatório e evidências](#relatório-e-evidências)
-   [Testes cobertos](#testes-cobertos)
-   [Defeitos identificados](#defeitos-identificados)
-   [Integração contínua](#integração-contínua)
-   [Escopo e observações](#escopo-e-observações)

## Objetivos

-   Validar os critérios de aceite relacionados a cupons, descontos e
    frete grátis.
-   Verificar fluxos positivos e negativos do checkout.
-   Testar os endpoints da API de produtos, cálculo do carrinho e
    criação de pedidos.
-   Validar regras de entrada, limites, respostas HTTP e códigos de
    erro.
-   Registrar defeitos com passos de reprodução e evidências.
-   Disponibilizar instruções para reproduzir a execução dos testes.

## Tecnologias e ferramentas

  -----------------------------------------------------------------------
  Tecnologia/ferramenta              Utilização
  ---------------------------------- ------------------------------------
  Node.js                            Ambiente de execução dos testes

  npm                                Instalação e gerenciamento de
                                     dependências

  Playwright Test                    Execução e organização dos testes
                                     automatizados

  TypeScript                         Linguagem utilizada nos arquivos de
                                     teste

  Chromium                           Navegador usado para executar a
                                     suíte

  Relatório HTML do Playwright       Consulta dos resultados de execução

  Git e GitHub                       Versionamento e hospedagem do
                                     projeto

  GitHub Actions                     Pipeline de automação definido em
                                     `.github/workflows/playwright.yml`

  Chrome DevTools Console            Execução dos testes manuais de API e
                                     inspeção de respostas
  -----------------------------------------------------------------------

## Pré-requisitos

Instale:

-   Node.js e npm.
-   Git.
-   Um navegador Chromium/Google Chrome.
-   Visual Studio Code ou outro editor, opcional.

O projeto foi executado durante o desenvolvimento com Node.js `v24.21.0`
e npm `11.19.0`.

## Configuração do ambiente

### 1. Clonar o repositório

``` bash
git clone https://github.com/welbernogueira/verzel-qa-challenge.git
cd verzel-qa-challenge
```

### 2. Instalar as dependências

``` bash
npm ci
```

### 3. Instalar o navegador do Playwright

``` bash
npx playwright install chromium
```

Se o comando não instalar as dependências de sistema necessárias no seu
ambiente, consulte a documentação oficial do Playwright:
https://playwright.dev/docs/browsers.

### 4. Conferir a configuração

A configuração geral está em `playwright.config.ts`. Ela define a
descoberta dos testes, o navegador/projeto e as opções de geração de
evidências e relatório.

A configuração utilizada durante o desenvolvimento inclui relatório HTML
e captura de screenshot/vídeo conforme as opções definidas no arquivo.
Os detalhes efetivos devem ser conferidos diretamente em
`playwright.config.ts`.

## Estrutura do projeto

``` text
verzel-qa-challenge/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── backend-test/
│   ├── carrinho/       # Testes de cálculo, itens e quantidades
│   ├── http/           # Métodos HTTP
│   ├── pedidos/        # Criação de pedidos e validações
│   └── produtos/       # Listagem e consulta de produtos
├── bugs/               # Registros de defeitos e evidências
├── documentos/         # Cenários, análise, Gherkin e execução manual
├── e2e/
│   ├── checkout/       # Testes E2E do checkout
│   └── cupons/         # Testes E2E de cupons, frete e cálculos
├── test-results/       # Artefatos de execução gerados pelo Playwright
├── package.json
├── package-lock.json
└── playwright.config.ts
```

## Como executar os testes

Execute os comandos a partir da raiz do projeto. Os exemplos usam
Chromium, que foi o projeto de navegador utilizado na execução local.

### Executar toda a suíte

``` bash
npx playwright test --project=chromium
```

### Executar os testes E2E

``` bash
npx playwright test e2e/cupons/ --project=chromium
npx playwright test e2e/checkout/ --project=chromium
```

### Executar os testes de API

``` bash
npx playwright test backend-test/carrinho/ --project=chromium
npx playwright test backend-test/pedidos/ --project=chromium
npx playwright test backend-test/produtos/ --project=chromium
npx playwright test backend-test/http/ --project=chromium
```

### Executar um teste específico

Exemplo --- cupom válido:

``` bash
npx playwright test e2e/cupons/01-cupom-valido.spec.ts --project=chromium
```

Exemplo --- validação do checkout:

``` bash
npx playwright test e2e/checkout/16-email-formato-valido.spec.ts --project=chromium
```

Exemplo --- cálculo do carrinho via API:

``` bash
npx playwright test backend-test/carrinho/04-calcular-carrinho.spec.ts --project=chromium
```

Exemplo --- método HTTP não permitido:

``` bash
npx playwright test backend-test/http/18-metodo-nao-permitido.spec.ts --project=chromium
```

### Consultar opções do Playwright

``` bash
npx playwright test --help
```

### Executar suítes por pasta

Além de executar a suíte completa, é possível executar cada grupo
isoladamente:

``` powershell
npx playwright test e2e/cupons/ --project=chromium
npx playwright test e2e/checkout/ --project=chromium
npx playwright test backend-test/carrinho/ --project=chromium
npx playwright test backend-test/pedidos/ --project=chromium
npx playwright test backend-test/produtos/ --project=chromium
npx playwright test backend-test/http/ --project=chromium
```

### Comandos para consultar as evidências

No PowerShell, listar todos os arquivos gerados:

``` powershell
Get-ChildItem test-results -Recurse
```

Para listar somente os vídeos:

``` powershell
Get-ChildItem test-results -Recurse -Filter *.webm
```

## Relatório e evidências

### Abrir o relatório HTML

Após executar os testes, rode:

``` bash
npx playwright show-report
```

O Playwright abrirá o relatório HTML no navegador. Por padrão, o
servidor local costuma utilizar `http://localhost:9323`.

### Consultar evidências

Os artefatos gerados ficam em `test-results/`. Conforme a configuração e
o tipo de execução, podem existir vídeos `.webm`, screenshots e outros
dados de diagnóstico.

No PowerShell, liste os arquivos com:

``` powershell
Get-ChildItem test-results -Recurse
```

No terminal Bash:

``` bash
find test-results -type f
```

Nem todo teste necessariamente gera todos os tipos de evidência; isso
depende da configuração e do resultado da execução.

## Testes cobertos

### Testes E2E --- Cupons, carrinho e frete

A suíte em `e2e/cupons/` cobre, entre outros pontos:

-   Aplicação de cupom válido.
-   Variações de maiúsculas, minúsculas e espaços.
-   Cupom inexistente e cupom expirado.
-   Restrição de aplicação de cupons.
-   Frete grátis a partir do limite de compra.
-   Frete abaixo do limite.
-   Cálculo do frete com base no subtotal anterior ao desconto.
-   Garantia de que o desconto não incida sobre o frete.
-   Limite de cinco unidades por produto na interface e validação
    exploratória da API.
-   Arredondamento de valores monetários para duas casas decimais.

### Testes E2E --- Checkout

A suíte em `e2e/checkout/` cobre:

-   Finalização da compra com dados válidos.
-   Obrigatoriedade e conteúdo do nome.
-   Obrigatoriedade e formato do e-mail.
-   Obrigatoriedade e formato do CEP.
-   CEP com e sem hífen.
-   Opção de pagamento na entrega.

### Testes de API

A suíte em `backend-test/` cobre:

-   Listagem e consulta de produtos.
-   Cálculo do carrinho.
-   Campo `itens` ausente ou vazio.
-   Item inválido e produto inexistente.
-   Itens duplicados.
-   Quantidade inválida e quantidade acima do limite.
-   Criação de pedido.
-   Dados inválidos do cliente.
-   Cupons inválidos ou expirados no pedido.
-   Rota inexistente e método HTTP não permitido.

Os cenários manuais, resultados e evidências complementares estão em
`documentos/`.

## Tratativas de bugs e evidências

Os defeitos identificados e suas tratativas estão documentados nos
seguintes locais do repositório:

-   **`bugs/`** --- registros dos bugs encontrados, incluindo descrição,
    passos para reprodução, comportamento esperado e observado e
    evidências disponíveis.
-   **`documentos/bugs/`** --- documentação complementar de bugs e
    evidências, quando aplicável.
-   **`documentos/05-bugs-encontrados.md`** --- visão consolidada dos
    defeitos identificados durante a execução.
-   **Relatório Playwright** --- detalhes das execuções automatizadas
    que reproduzem os comportamentos, acessíveis por
    `npx playwright show-report`.

### Defeitos conhecidos

#### BUG-CA10-API-001 --- API permite quantidade superior a cinco unidades

-   **Endpoint:** `POST /api/carrinho/calcular`
-   **Comportamento observado:** a API aceita uma quantidade superior a
    cinco unidades.
-   **Comportamento esperado:** rejeitar a requisição com HTTP `422` e
    código `QUANTIDADE_MAXIMA_EXCEDIDA`.
-   **Evidência/documentação:** consulte o arquivo
    `BUG-CA10-API-001-limite-quantidade.md` em `bugs/` ou
    `documentos/bugs/`.

#### BUG-API-002 --- Código incorreto para item inválido

-   **Endpoint:** `POST /api/carrinho/calcular`
-   **Payload documentado:** `{"itens":[{}]}`
-   **Comportamento observado:** a API retorna `PRODUTO_NAO_ENCONTRADO`.
-   **Comportamento esperado:** HTTP `422` com código `ITEM_INVALIDO`.
-   **Evidência/documentação:** consulte
    `BUG-API-002-item-invalido-retorna-produto-nao-encontrado.md` na
    pasta `bugs/`.

Um teste que evidencia um defeito conhecido deve ser analisado junto ao
respectivo registro de bug e ao relatório da execução. Isso permite
distinguir um defeito da aplicação de um problema na automação ou no
ambiente de teste.

## Integração contínua

O repositório contém o workflow `.github/workflows/playwright.yml`,
utilizado para configurar a execução automatizada no GitHub Actions.

Para verificar a execução da pipeline, abra o repositório no GitHub e
acesse a aba **Actions**. O resultado depende da configuração atual do
workflow, dos eventos configurados e do estado da suíte.

## Escopo e observações

-   A aplicação é um ambiente fictício de teste técnico. Nenhuma compra
    é real, não há cobrança e nenhum e-mail é enviado.
-   O ambiente é compartilhado e utiliza produtos, preços e cupons
    fixos.
-   A documentação da aplicação informa que o carrinho fica armazenado
    apenas na aba do navegador; outra aba, outro navegador ou uma janela
    anônima começam vazios.
-   Os pedidos não são persistidos: o número apresentado é fictício e
    não existe consulta posterior de pedidos.
-   A API recebe os dados, calcula e responde; não mantém estado entre
    chamadas.
-   Login, cadastro de clientes, pagamento online e consulta de pedidos
    estão fora do escopo definido para o desafio.
-   Um teste que evidencia um defeito conhecido deve ser interpretado
    junto do respectivo registro de bug e do relatório de execução. Não
    se deve ocultar a falha do produto nem confundi-la com uma falha do
    framework de automação.

## Referências

-   **Aplicação:**
    https://verzel-store.qa-test-verzel-store.workers.dev/
-   **Documentação da aplicação:**
    https://verzel-store.qa-test-verzel-store.workers.dev/documentacao
-   **Repositório:**
    https://github.com/welbernogueira/verzel-qa-challenge
-   **Playwright --- documentação oficial:**
    https://playwright.dev/docs/intro
