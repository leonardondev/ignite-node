# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa
- Linguagem ubíqua

- Usuário

  - Cliente
  - Fornecedor
  - Vendedor
  - Atendente

- Agregados
- Eventos de domínio
- Subdomínios
- Entidades
- Casos de uso

---

### Conversação com o Expert sobre um fórum de dúvida

- Muita dificuldade em saber as dúvidas dos alunos
- Eu tenho que responser os alunos e eu me perco em quais dúvidas já foram respondidas

---

# Conceitos

- Aggregate
- WatchedList

## Exemplo

- Order -> OrderItem[]
- Order -> Shipping

-Question -> Attachment[]

### Criação

- Título
- Conteúdo
- Anexo (3)

### Edição

- Título
- Conteúdo

- Adicionar uim novo anexo (create)
- Remover o segundo anexo que tinha criado previamente (delete)
- Editar um anexo existente (update)

---

# Subdomínios

- Core: O que dá dinheiro
- Supporting; Dá suporte para o core funcionar
- Generic: Necessários, mas não são tão importante.

## Core

- Compra
- Catálogo
- Pagamento
- Entrega
- Faturamento

## Supporting

- Estoque

## Generic

- Notificações
- Promoções
- Chat
