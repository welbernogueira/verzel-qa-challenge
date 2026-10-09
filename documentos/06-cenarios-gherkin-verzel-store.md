# Cenários em Gherkin — Verzel Store

> Documento complementar à matriz e à execução dos testes manuais. Os cenários foram organizados no estilo Gherkin (`Funcionalidade`, `Cenário`, `Dado`, `Quando`, `Então`) com base no documento compartilhado.

## Objetivo e observação

Este arquivo documenta cenários em Markdown usando a estrutura Gherkin. **Não é uma automação BDD executável**: para isso, seria necessário criar arquivos `.feature` e integrar uma ferramenta como Cucumber.js aos steps implementados em TypeScript/Playwright.

Os status abaixo refletem os resultados registrados na execução manual. Os defeitos permanecem identificados como falhas conhecidas.

---

## Funcionalidade: Aplicação de cupons

### CT-01 — Aplicar cupom válido
**Status registrado:** PASSOU

```gherkin
Cenário: Aplicar o cupom válido BEMVINDO10
  Dado que existe um carrinho com produtos válidos
  E que o cupom "BEMVINDO10" está disponível
  Quando aplico o cupom e solicito o cálculo do carrinho
  Então o cupom deve ser aplicado
  E deve conceder 10% de desconto sobre o subtotal
```

### CT-02 — Aceitar variações de caixa e espaços
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Aceitar variações do cupom válido
  Dado que existe um carrinho válido
  Quando informo o cupom "<cupom>"
  E solicito o cálculo do carrinho
  Então o sistema deve reconhecer o cupom BEMVINDO10
  E aplicar 10% de desconto sobre o subtotal

Exemplos:
  | cupom        |
  | BEMVINDO10   |
  | bemvindo10   |
  |  bemvindo10  |
```

### CT-03 — Rejeitar cupom inexistente
**Status registrado:** PASSOU

```gherkin
Cenário: Informar um cupom inexistente
  Dado que existe um carrinho com itens válidos
  Quando envio um cupom inexistente para calcular o carrinho
  Então a API deve retornar HTTP 200
  E não deve aplicar desconto
  E deve informar "Cupom inválido."
```

### CT-04 — Rejeitar cupom expirado
**Status registrado:** PASSOU

```gherkin
Cenário: Informar o cupom expirado VERAO2026
  Dado que existe um carrinho válido
  E que o cupom "VERAO2026" está expirado
  Quando solicito o cálculo do carrinho com esse cupom
  Então a API deve retornar HTTP 200
  E não deve aplicar desconto
  E deve informar "Cupom expirado."
```

### CT-05 — Permitir somente um cupom por vez
**Status registrado:** PASSOU

```gherkin
Cenário: Impedir aplicação simultânea de mais de um cupom
  Dado que existe um carrinho válido
  E que um cupom já está aplicado
  Quando tento aplicar outro sem remover o primeiro
  Então somente um cupom deve permanecer aplicado
```

---

## Funcionalidade: Cálculo de frete e valores

### CT-06 — Frete grátis no limite de R$ 200,00
**Status registrado:** PASSOU

```gherkin
Cenário: Calcular frete grátis para subtotal de R$ 200,00
  Dado que o subtotal do carrinho é R$ 200,00
  Quando solicito o cálculo do carrinho
  Então o frete deve ser R$ 0,00
  E o valor faltante para frete grátis deve ser R$ 0,00
```

### CT-07 — Cobrar frete abaixo de R$ 200,00
**Status registrado:** PASSOU

```gherkin
Cenário: Calcular frete para subtotal inferior a R$ 200,00
  Dado que o subtotal do carrinho é inferior a R$ 200,00
  Quando solicito o cálculo do carrinho
  Então o frete deve ser R$ 19,90
  E o valor faltante deve ser R$ 200,00 menos o subtotal
  E o valor faltante não deve ser negativo
```

### CT-08 — Calcular frete antes do desconto
**Status registrado:** PASSOU

```gherkin
Cenário: Manter frete grátis quando o subtotal original é elegível
  Dado que o subtotal original é igual ou superior a R$ 200,00
  E que um cupom válido está aplicado
  Quando solicito o cálculo do carrinho
  Então a elegibilidade do frete deve considerar o subtotal antes do desconto
  E o frete deve ser R$ 0,00
```

### CT-09 — Não aplicar desconto sobre o frete
**Status registrado:** PASSOU

```gherkin
Cenário: Aplicar desconto somente aos produtos
  Dado que o subtotal é inferior a R$ 200,00
  E que o cupom BEMVINDO10 é válido
  Quando solicito o cálculo do carrinho
  Então o desconto de 10% deve incidir somente sobre os produtos
  E o frete deve permanecer em R$ 19,90
```

### CT-12 e CT-13 — Arredondamento e total
**Status registrado:** PASSOU

```gherkin
Cenário: Arredondar valores monetários para duas casas decimais
  Dado que o cálculo do carrinho gera valores decimais
  Quando solicito o cálculo
  Então os valores monetários devem ter duas casas decimais

Cenário: Validar a fórmula do total
  Dado que conheço o subtotal, o desconto e o frete
  Quando solicito o cálculo do carrinho
  Então o total deve ser igual ao subtotal menos o desconto mais o frete
```

### CT-24 e CT-25 — Validar os limites do frete
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Validar o limite de frete grátis
  Dado que o subtotal do carrinho é R$ <subtotal>
  Quando solicito o cálculo do carrinho
  Então o frete deve ser R$ <frete>
  E o indicador de frete grátis deve ser <frete_gratis>
  E o valor faltante deve ser R$ <faltante>

Exemplos:
  | subtotal | frete | frete_gratis | faltante |
  | 199,99   | 19,90 | false        | 0,01     |
  | 200,01   | 0,00  | true         | 0,00     |
```

---

## Funcionalidade: Validação de itens e quantidades na API

### CT-10 — Rejeitar quantidade inválida
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Rejeitar quantidade que não seja inteiro positivo
  Dado que a API de cálculo está disponível
  Quando envio a quantidade <quantidade> para um produto
  Então a API deve retornar HTTP 422
  E o código deve ser "QUANTIDADE_INVALIDA"

Exemplos:
  | quantidade |
  | 0          |
  | -1         |
  | 1.5        |
```

### CT-11 / CA10 — Rejeitar mais de cinco unidades na API
**Status registrado:** NÃO PASSOU — BUG-CA10-API-001

```gherkin
Cenário: Rejeitar seis unidades do mesmo produto pela API
  Dado que a API de cálculo está disponível
  Quando envio o produto P001 com quantidade 6
  Então a API deveria retornar HTTP 422
  E o código deveria ser "QUANTIDADE_MAXIMA_EXCEDIDA"
```

**Resultado real registrado:** HTTP 200; a API aceitou o cálculo com seis unidades. A interface bloqueia a quantidade acima do limite.

**Registro do defeito:** `bugs/BUG-CA10-API-001-limite-quantidade.md`

### CT-14 — Rejeitar itens ausentes ou lista vazia
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Rejeitar requisição sem itens
  Dado que a API de cálculo está disponível
  Quando envio uma requisição <situacao>
  Então a API deve retornar HTTP 422
  E o código deve ser "ITENS_OBRIGATORIOS"

Exemplos:
  | situacao                    |
  | sem a propriedade itens     |
  | com itens como lista vazia  |
```

### CT-15.1 — Retornar o código correto para item inválido
**Status registrado:** NÃO PASSOU — BUG-API-002

```gherkin
Cenário: Retornar ITEM_INVALIDO para um objeto de item vazio
  Dado que a API de cálculo está disponível
  Quando envio o payload {"itens":[{}]}
  Então a API deve retornar HTTP 422
  E o código deve ser "ITEM_INVALIDO"
```

**Resultado real registrado:** HTTP 422, mas o código retornado foi `PRODUTO_NAO_ENCONTRADO`.

**Registro do defeito:** `bugs/BUG-API-002-item-invalido-retorna-produto-nao-encontrado.md`

### CT-16 — Rejeitar produto inexistente
**Status registrado:** PASSOU

```gherkin
Cenário: Informar um produto inexistente
  Dado que a API de cálculo está disponível
  Quando envio um produtoId que não existe no catálogo
  Então a API deve retornar HTTP 422
  E o código deve ser "PRODUTO_NAO_ENCONTRADO"
```

### CT-17 — Rejeitar produto duplicado
**Status registrado:** PASSOU

```gherkin
Cenário: Enviar o mesmo produto mais de uma vez
  Dado que a API de cálculo está disponível
  Quando envio o mesmo produto em mais de uma entrada de itens
  Então a API deve retornar HTTP 422
  E o código deve ser "ITEM_DUPLICADO"
```

### CT-27 — Limitar quantidade na interface
**Status registrado:** PASSOU

```gherkin
Cenário: Impedir adicionar uma sexta unidade pela interface
  Dado que o carrinho contém cinco unidades de um produto
  Quando tento adicionar uma sexta unidade pela interface
  Então a interface não deve permitir ultrapassar cinco unidades
```

---

## Funcionalidade: Criação de pedidos e dados do cliente

### CT-18 — Criar pedido com cupom válido
**Status registrado:** PASSOU

```gherkin
Cenário: Criar pedido com dados válidos
  Dado que os dados do cliente são válidos
  E que o carrinho contém itens válidos
  E que o cupom BEMVINDO10 é válido
  Quando envio uma requisição para criar o pedido
  Então a API deve retornar HTTP 201
  E deve retornar um número no formato VZ-000000
  E deve retornar o resumo dos valores calculados
```

### CT-19 — Rejeitar pedido com cupom inválido ou expirado
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Rejeitar pedido com cupom não aplicável
  Dado que o carrinho e os dados do cliente são válidos
  Quando tento criar um pedido com o cupom "<cupom>"
  Então a API deve retornar HTTP 422
  E o código deve ser "<codigo>"

Exemplos:
  | cupom       | codigo         |
  | INEXISTENTE | CUPOM_INVALIDO |
  | VERAO2026   | CUPOM_EXPIRADO |
```

### CT-20 — Validar dados do cliente
**Status registrado:** PASSOU

```gherkin
Cenário: Rejeitar dados inválidos do cliente
  Dado que a API de pedidos está disponível
  Quando envio nome sem sobrenome, e-mail inválido ou CEP inválido
  Então a API deve retornar HTTP 422
  E o código deve ser "DADOS_INVALIDOS"
  E a resposta deve detalhar os campos inválidos
```

### CT-31 — Aceitar CEP com e sem hífen
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Aceitar CEP válido com ou sem hífen
  Dado que os dados do cliente e o carrinho são válidos
  Quando crio um pedido com o CEP "<cep>"
  Então o CEP deve ser aceito conforme a regra de oito dígitos

Exemplos:
  | cep       |
  | 01310-100 |
  | 01310100  |
```

---

## Funcionalidade: Contrato HTTP, produtos e isolamento do carrinho

### CT-21 — Validar erros HTTP comuns
**Status registrado:** PASSOU

```gherkin
Esquema do Cenário: Retornar erro apropriado para requisição inválida
  Dado que a API está disponível
  Quando realizo a requisição "<tipo>"
  Então a API deve retornar HTTP <status>
  E o código deve ser "<codigo>"

Exemplos:
  | tipo                 | status | codigo                |
  | JSON inválido        | 400    | JSON_INVALIDO         |
  | rota inexistente     | 404    | ROTA_NAO_ENCONTRADA   |
  | método não permitido | 405    | METODO_NAO_PERMITIDO  |
```

### CT-22 e CT-28 — Consultar produtos
**Status registrado:** PASSOU

```gherkin
Cenário: Consultar produto existente
  Dado que o produto P001 existe no catálogo
  Quando consulto GET /api/produtos/P001
  Então a API deve retornar HTTP 200
  E deve retornar os dados do produto

Cenário: Listar produtos
  Dado que a API está disponível
  Quando consulto GET /api/produtos
  Então a API deve retornar HTTP 200
  E deve conter os produtos P001 a P008 conforme a documentação
```

### CT-23 — Isolar o carrinho por aba ou janela
**Status registrado:** PASSOU

```gherkin
Cenário: Não compartilhar itens do carrinho entre abas
  Dado que adicionei produtos ao carrinho em uma aba
  Quando abro outra aba ou uma janela anônima
  Então o novo contexto deve iniciar com o carrinho vazio
  E os itens da primeira aba não devem ser replicados
```

---

## Rastreabilidade dos defeitos

| Cenário manual | Defeito | Resultado real |
|---|---|---|
| CT-11 / CA10 | `BUG-CA10-API-001` | HTTP 200 ao enviar quantidade 6; esperado HTTP 422 e `QUANTIDADE_MAXIMA_EXCEDIDA` |
| CT-15.1 | `BUG-API-002` | HTTP 422 com `PRODUTO_NAO_ENCONTRADO`; esperado `ITEM_INVALIDO` |

## Como evoluir para BDD executável

1. Selecionar os cenários que serão automatizados em BDD.
2. Criar arquivos `.feature` com a sintaxe Gherkin.
3. Integrar uma ferramenta BDD compatível com Playwright, como Cucumber.js.
4. Implementar os steps em TypeScript e associá-los aos testes e às evidências.

Até essa integração ser feita, descreva este arquivo como **documentação de cenários em formato Gherkin**, e não como automação BDD executável.
