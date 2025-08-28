# Lista de Músicas Favoritas

Um aplicativo para organizar suas músicas favoritas com estética retro, construído com Next.js e TypeScript. Crie listas personalizadas, marque suas músicas favoritas e compartilhe com amigos.

## Funcionalidades

-   **Adicionar músicas** - Crie suas listas com título, artista e capa
-   **Editar músicas** - Clique no texto para editar informações
-   **Favoritar músicas** - Marque suas músicas preferidas
-   **Múltiplas listas** - Organize músicas em diferentes coleções
-   **Filtros inteligentes** - Visualize todas, favoritas ou outras músicas
-   **Compartilhamento** - Compartilhe suas listas com códigos únicos
-   **Importação** - Importe listas de outros usuários
-   **Persistência local** - Suas listas ficam salvas no navegador
-   **Design responsivo** - Funciona perfeitamente em desktop e mobile

## Como executar

### Pré-requisitos

-   Node.js 18+ ou Bun
-   npm, yarn ou bun

### Instalação

1. **Clone o repositório**

    ```bash
    git clone https://github.com/seu-usuario/lista-musicas.git
    cd lista-musicas
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
lista-musicas/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   └── Music.tsx        # Componente de música
├── public/              # Arquivos estáticos
└── package.json         # Dependências e scripts
```

## Como usar

1. **Adicionar música**: Preencha título, artista e URL da capa (opcional)
2. **Favoritar música**: Clique no coração ao lado da música
3. **Editar música**: Clique no texto da música ou no menu de três pontos
4. **Excluir música**: Use o menu de três pontos e selecione "Excluir"
5. **Criar nova lista**: Use o botão "GERENCIAR" para criar listas
6. **Filtrar músicas**: Use os botões "TODAS", "FAVORITAS" ou "OUTRAS"
7. **Compartilhar lista**: Use o botão "COMPARTILHAR" para gerar código
8. **Importar lista**: Use o botão "IMPORTAR" com código de compartilhamento

## Design

O aplicativo utiliza uma estética retro inspirada nos computadores clássicos, com:

-   Gradientes em tons de roxo e rosa
-   Bordas e sombras características
-   Tipografia monospace
-   Botões com aparência de interface antiga
-   Layout responsivo otimizado para mobile

## Scripts disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

**Seu Nome**

-   GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

Se este projeto te ajudou, considere dar uma estrela no repositório!
