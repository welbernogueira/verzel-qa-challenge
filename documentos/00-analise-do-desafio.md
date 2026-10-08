# 01 — Análise do Desafio

## Objetivo

Validar a entrega **VZS-142 — Cupom de desconto e frete grátis** da Verzel Store, versão **2.3.0**, no ambiente de QA.

A entrega adiciona:
- aplicação de cupons de desconto no carrinho;
- regra de frete grátis;
- cálculos realizados pela API, com a interface exibindo os resultados.

## Escopo funcional

A execução considera os critérios de aceite e regras descritos na documentação da Verzel Store:

- **CA01:** BEMVINDO10 aplica 10% de desconto sobre o subtotal.
- **CA02:** cupom não diferencia maiúsculas/minúsculas e ignora espaços nas extremidades.
- **CA03:** cupom inexistente retorna mensagem `Cupom inválido.` e não concede desconto.
- **CA04:** cupom expirado retorna mensagem `Cupom expirado.` e não concede desconto.
- **CA05:** somente um cupom pode ser aplicado por vez.
- **CA06:** frete grátis para subtotal maior ou igual a R$ 200,00.
- **CA07:** abaixo de R$ 200,00, frete de R$ 19,90 e indicação do valor faltante.
- **CA08:** elegibilidade do frete grátis considera o subtotal antes do desconto.
- **CA09:** desconto não incide sobre o frete.
- **CA10:** máximo de 5 unidades do mesmo produto por pedido, na interface e na API.
- **CA11:** valores monetários arredondados para 2 casas decimais.

## Fórmula de cálculo

```text
total = subtotal - desconto + frete
```

- Subtotal = soma de preço unitário × quantidade.
- Desconto = percentual do cupom sobre o subtotal.
- Frete = R$ 0,00 quando subtotal >= R$ 200,00; caso contrário, R$ 19,90.
- Valor faltante = R$ 200,00 - subtotal, nunca menor que zero.

## Dados de teste

### Produtos

| ID | Produto | Preço |
|---|---|---:|
| P001 | Camiseta Essencial | R$ 59,90 |
| P002 | Calça Jeans Slim | R$ 139,90 |
| P003 | Tênis Casual Urbano | R$ 189,90 |
| P004 | Boné Aba Curva | R$ 49,90 |
| P005 | Mochila Urbana 20L | R$ 100,00 |
| P006 | Kit 3 Pares de Meias | R$ 29,90 |
| P007 | Jaqueta Corta-Vento | R$ 229,90 |
| P008 | Garrafa Térmica 750ml | R$ 50,00 |

### Cupons

| Código | Desconto | Situação |
|---|---:|---|
| BEMVINDO10 | 10% | Válido |
| VERAO2026 | 15% | Expirado em 31/03/2026 |

## Limites relevantes

- Quantidade válida: inteiro maior ou igual a 1.
- Quantidade máxima: 5 unidades por produto.
- Frete grátis: subtotal de R$ 200,00 ou mais.
- Limite inferior para frete: R$ 199,99.
- Limite superior para frete: R$ 200,01.
- CEP: 8 dígitos, com ou sem hífen.

## Estratégia

A matriz contém **31 cenários**, cobrindo:

- regras de negócio;
- cálculos;
- valores de fronteira;
- cupons válidos, inválidos e expirados;
- validações negativas;
- API;
- criação de pedidos;
- integração entre interface e API;
- comportamento da interface;
- isolamento do carrinho;
- formato de CEP.

## Fora do escopo

Não serão considerados bugs:

- carrinho isolado por aba/janela;
- pedidos não persistidos;
- número do pedido fictício;
- ausência de envio de e-mail;
- ausência de cobrança real;
- produtos, preços e cupons fixos;
- ausência de estoque;
- API stateless;
- login/cadastro;
- pagamento online;
- consulta de pedidos.

## Automação

Após a execução manual, serão selecionados pelo menos 3 cenários para automação com Playwright, conforme exigência do desafio técnico.

## Uso de IA

A IA foi utilizada como apoio à organização da análise, estruturação dos cenários, documentação e preparação da estratégia de testes. A execução dos testes, validação dos resultados e registro das evidências são realizados manualmente pelo candidato.
