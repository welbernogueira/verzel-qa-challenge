# 02 — Cenários de Teste

Esta matriz contém os 31 cenários definidos para a validação da Verzel Store. Os cenários seguem o padrão utilizado no projeto de QA e devem ser executados conforme a matriz Excel.

| # | Cenário | Prioridade | Tipo | Veredito |
|---:|---|---|---|---|
| 1 | Aplicar cupom válido BEMVINDO10 | CRÍTICA | FUNCIONAL | PENDENTE |
| 2 | Aceitar cupom com maiúsculas/minúsculas e espaços nas extremidades | ALTA | FUNCIONAL | PENDENTE |
| 3 | Rejeitar cupom inexistente | ALTA | FUNCIONAL | PENDENTE |
| 4 | Rejeitar cupom expirado | ALTA | FUNCIONAL | PENDENTE |
| 5 | Impedir aplicação simultânea de mais de um cupom | MÉDIA | FUNCIONAL | PENDENTE |
| 6 | Frete grátis no limite de R$ 200,00 | CRÍTICA | FUNCIONAL | PENDENTE |
| 7 | Frete de R$ 19,90 abaixo de R$ 200,00 | CRÍTICA | FUNCIONAL | PENDENTE |
| 8 | Frete considera subtotal antes do desconto | CRÍTICA | FUNCIONAL | PENDENTE |
| 9 | Desconto não incide sobre o frete | ALTA | FUNCIONAL | PENDENTE |
| 10 | Rejeitar quantidade inválida | ALTA | FUNCIONAL | PENDENTE |
| 11 | Rejeitar quantidade superior a 5 | ALTA | FUNCIONAL | PENDENTE |
| 12 | Arredondar valores monetários para 2 casas | MÉDIA | FUNCIONAL | PENDENTE |
| 13 | Validar fórmula do total | CRÍTICA | FUNCIONAL | PENDENTE |
| 14 | Rejeitar itens ausentes ou vazios | ALTA | FUNCIONAL | PENDENTE |
| 15 | Rejeitar item inválido | ALTA | FUNCIONAL | PENDENTE |
| 16 | Rejeitar produto inexistente | ALTA | FUNCIONAL | PENDENTE |
| 17 | Rejeitar produto duplicado | ALTA | FUNCIONAL | PENDENTE |
| 18 | Criar pedido com cupom válido | CRÍTICA | FUNCIONAL | PENDENTE |
| 19 | Rejeitar pedido com cupom inválido ou expirado | ALTA | FUNCIONAL | PENDENTE |
| 20 | Validar dados do cliente | ALTA | FUNCIONAL | PENDENTE |
| 21 | Validar JSON inválido, rota inexistente e método não permitido | MÉDIA | FUNCIONAL | PENDENTE |
| 22 | Consultar produto existente e inexistente | MÉDIA | FUNCIONAL | PENDENTE |
| 23 | Validar isolamento do carrinho por aba/janela | BAIXA | FUNCIONAL | PENDENTE |
| 24 | Validar frete imediatamente abaixo do limite de R$200,00 | MÉDIA | FUNCIONAL | PENDENTE |
| 25 | Validar frete imediatamente acima do limite de R$200,00 | MÉDIA | FUNCIONAL | PENDENTE |
| 26 | Validar frete grátis após aplicação de desconto quando subtotal original é elegível | ALTA | FUNCIONAL | PENDENTE |
| 27 | Validar limite máximo de 5 unidades por produto na interface | ALTA | FUNCIONAL | PENDENTE |
| 28 | Consultar lista de produtos pela API | MÉDIA | FUNCIONAL | PENDENTE |
| 29 | Validar cálculo oficial de cupom pela API | ALTA | FUNCIONAL | PENDENTE |
| 30 | Comparar resultado apresentado na interface com o cálculo da API | ALTA | INTEGRAÇÃO | PENDENTE |
| 31 | Validar CEP com e sem hífen na criação do pedido | MÉDIA | FUNCIONAL | PENDENTE |

## Observações

- O detalhamento completo de pré-requisito, passos, resultado esperado, resultado obtido e evidências permanece na planilha `Cenarios_QA_Verzel_Store_Completo.xlsx`.
- O documento `05-evidencias.md` deve ser preenchido durante a execução manual.
- Sempre que um cenário falhar, registrar o comportamento observado e manter as evidências correspondentes.