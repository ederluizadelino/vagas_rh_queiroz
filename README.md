# Painel de Vagas

Sistema em **Next.js + Prisma + Neon Database + Tailwind CSS + Recharts**, com layout moderno seguindo a identidade visual da logo enviada.

## Funcionalidades
- Dashboard com cards, filtros por **Empresa** e **Tipo de vaga**
- Gráficos com Recharts
- Tela de lançamentos com **cadastro, edição e exclusão**
- Coluna **Última Atualização** preenchida automaticamente pela coluna `updatedAt`
- Cadastros auxiliares para **Lojas** e **Tipos de vaga**
- Seed inicial com os dados da planilha enviada

## 1) Instalação
```bash
npm install
```

## 2) Configurar ambiente
Copie o arquivo `.env.example` para `.env` e ajuste a string do Neon:

```bash
cp .env.example .env
```

## 3) Prisma
```bash
npx prisma generate
npx prisma db push
npm run seed
```

## 4) Rodar em desenvolvimento
```bash
npm run dev
```

A aplicação abrirá em:
```bash
http://localhost:3000
```

## Estrutura
- `/dashboard` → visão geral com filtros, cards e gráficos
- `/lancamentos` → CRUD dos registros
- `/cadastros/lojas` → cadastro de lojas
- `/cadastros/tipos-vaga` → cadastro de tipos de vaga

## Observações
- A última atualização é controlada automaticamente pelo Prisma usando `@updatedAt`.
- Caso queira impedir exclusão de loja/tipo quando já houver lançamentos vinculados, você pode trocar a regra de remoção e exibir uma mensagem personalizada.
