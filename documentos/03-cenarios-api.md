# Cenários de Teste de API — Verzel Store

## 1. GET /api/produtos

### API-001 — Listar produtos

**Método:** GET  
**Endpoint:** `/api/produtos`  
**Tipo:** FUNCIONAL  
**Prioridade:** ALTA

**Resultado esperado:**
- HTTP 200.
- Retorno em JSON.
- Lista de produtos.
- Produtos contendo identificador, nome e preço.

**Status:** PENDENTE

---

### API-002 — Validar produtos esperados

**Método:** GET  
**Endpoint:** `/api/produtos`

**Resultado esperado:**
A resposta deve conter os produtos P001 a P008 com os preços definidos na documentação.

**Status:** PENDENTE

---

## 2. GET /api/produtos/{id}

### API-003 — Consultar produto existente

**Método:** GET  
**Endpoint:** `/api/produtos/P001`

**Resultado esperado:**
- HTTP 200.
- Produto correspondente ao ID informado.

**Status:** PENDENTE

---

### API-004 — Consultar produto inexistente

**Método:** GET  
**Endpoint:** `/api/produtos/INVALIDO`

**Resultado esperado:**
- HTTP 404.
- Código de erro `PRODUTO_NAO_ENCONTRADO`.

**Status:** PENDENTE

---

## 3. POST /api/carrinho/calcular

### API-005 — Calcular carrinho sem cupom

**Método:** POST  
**Endpoint:** `/api/carrinho/calcular`

**Dados:**

```json
{
  "itens": [
    {
      "produtoId": "P005",
      "quantidade": 1
    }
  ]
}