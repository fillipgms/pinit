# Pinit - Gerenciador de Tarefas Retro

Um aplicativo de gerenciamento de tarefas com estética retro, construído com Next.js e TypeScript. Organize suas tarefas de forma simples e elegante com uma interface que remete aos computadores clássicos.

![Pinit Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Pinit+Todo+App)

## Funcionalidades

-   **Adicionar tarefas** - Crie novas tarefas facilmente
-   **Editar tarefas** - Clique no texto para editar
-   **Excluir tarefas** - Remova tarefas desnecessárias
-   **Filtros inteligentes** - Visualize todas, ativas ou concluídas
-   **Persistência local** - Suas tarefas ficam salvas no navegador
-   **Barra de progresso** - Acompanhe seu progresso visualmente
-   **Design retro** - Interface inspirada nos computadores clássicos
-   **Responsivo** - Funciona em desktop e mobile

## Como executar

### Pré-requisitos

-   Node.js 18+ ou Bun
-   npm, yarn ou bun

### Instalação

1. **Clone o repositório**

    ```bash
    git clone https://github.com/seu-usuario/pinit.git
    cd pinit
    ```

2. **Instale as dependências**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    bun install
    ```

3. **Execute o projeto**

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    bun dev
    ```

4. **Acesse o aplicativo**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Tecnologias utilizadas

-   **Next.js 15** - Framework React com Turbopack
-   **React 19** - Biblioteca para interfaces
-   **TypeScript** - Tipagem estática
-   **Tailwind CSS 4** - Framework CSS utilitário
-   **LocalStorage** - Persistência de dados

## Estrutura do projeto

```
pinit/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   └── Task.tsx         # Componente de tarefa
├── public/              # Arquivos estáticos
└── package.json         # Dependências e scripts
```

## Como usar

1. **Adicionar tarefa**: Digite no campo de texto e pressione "ADICIONAR"
2. **Marcar como concluída**: Clique na caixa de seleção
3. **Editar tarefa**: Clique no texto da tarefa ou no botão "EDITAR"
4. **Excluir tarefa**: Clique no botão "EXCLUIR"
5. **Filtrar tarefas**: Use os botões "TODAS", "A FAZER" ou "CONCLUÍDAS"
6. **Limpar concluídas**: Use o botão "LIMPAR" na seção de progresso

## Design

O Pinit utiliza uma estética retro inspirada nos computadores clássicos dos anos 80/90, com:

-   Gradientes em tons de azul e ciano
-   Bordas e sombras características
-   Tipografia monospace
-   Botões com aparência de interface antiga
-   Grid de fundo sutil

## Scripts disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**

-   GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

-   Inspirado na estética retro dos computadores clássicos
-   "A jornada de mil milhas começa com um único passo." — Lao Tzu

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
