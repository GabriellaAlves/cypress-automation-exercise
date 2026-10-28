# Cypress UI Automation — Automation Exercise

Projeto de automação de testes de interface (UI) utilizando Cypress, JavaScript, Page Object Model (POM), fixtures, comandos customizados, relatórios Mochawesome e integração contínua com GitHub Actions.

O objetivo é automatizar os principais fluxos de autenticação, cadastro, pesquisa de produtos, assinatura de newsletter e compra no site [Automation Exercise](https://automationexercise.com/).

## 1. Tecnologias utilizadas

- **JavaScript:** linguagem utilizada para implementar os testes.
- **Cypress:** framework de automação de testes de interface.
- **cypress-mochawesome-reporter:** geração de relatórios HTML e JSON.
- **Page Object Model (POM):** padrão de projeto para separar a interação com as páginas dos cenários de teste.
- **Fixtures:** armazenamento de dados de teste em arquivos JSON.
- **Custom Commands:** reutilização de ações comuns entre diferentes cenários.
- **GitHub Actions:** execução automatizada dos testes em pipeline de CI/CD.
- **Node.js e npm:** ambiente de execução e gerenciamento de dependências.

## 2. Estrutura do projeto

```text
cypress-automation-exercise/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── authentication/
│   │   │   ├── register-user.cy.js
│   │   │   ├── login-user.cy.js
│   │   │   └── logout-user.cy.js
│   │   ├── products/
│   │   │   ├── product-details.cy.js
│   │   │   └── search-product.cy.js
│   │   ├── subscription/
│   │   │   └── subscription.cy.js
│   │   └── checkout/
│   │       ├── register-before-checkout.cy.js
│   │       └── login-before-checkout.cy.js
│   ├── fixtures/
│   │   ├── users.json
│   │   └── products.json
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   ├── AccountPage.js
│   │   ├── ProductsPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── reports/
│       └── .gitkeep
├── .gitignore
├── cypress.config.js
├── package.json
└── README.md
```

## 3. Pré-requisitos

Antes de executar o projeto, instale:

- Node.js 20 ou superior.
- npm.
- Google Chrome, caso deseje executar os testes nesse navegador.
- Git, para versionar o projeto e integrá-lo ao GitHub.

## 4. Instalação

Clone o repositório:

```bash
git clone https://github.com/GabriellaAlves/cypress-automation-exercise.git
```

Acesse o diretório:

```bash
cd cypress-automation-exercise
```

Instale as dependências:

```bash
npm install
```

Após a instalação, recomenda-se versionar o arquivo `package-lock.json` para garantir que as dependências possam ser instaladas de maneira reproduzível nos ambientes local e de CI.

## 5. Executando os testes

### 5.1. Abrir a interface do Cypress

Para abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Selecione **E2E Testing**, escolha um navegador e execute os cenários desejados.

### 5.2. Executar todos os testes em modo headless

```bash
npm run cy:run
```

Essa opção executa os testes sem abrir a interface gráfica do Cypress.

### 5.3. Executar os testes no Chrome

```bash
npm run cy:run:chrome
```

Essa execução é semelhante à utilizada no pipeline do GitHub Actions.

### 5.4. Executar um arquivo específico

Para executar somente os testes de cadastro:

```bash
npx cypress run --spec "cypress/e2e/authentication/register-user.cy.js"
```

Para executar somente os testes de produtos:

```bash
npx cypress run --spec "cypress/e2e/products/**/*.cy.js"
```

## 6. Casos de teste automatizados

O projeto contempla os dez cenários solicitados.

| ID | Caso de teste | Arquivo |
|---|---|---|
| TC01 | Register User | `authentication/register-user.cy.js` |
| TC02 | Login User with correct email and password | `authentication/login-user.cy.js` |
| TC03 | Login User with incorrect email and password | `authentication/login-user.cy.js` |
| TC04 | Logout User | `authentication/logout-user.cy.js` |
| TC05 | Register User with existing email | `authentication/login-user.cy.js` |
| TC08 | Verify All Products and product detail page | `products/product-details.cy.js` |
| TC09 | Search Product | `products/search-product.cy.js` |
| TC10 | Verify Subscription in home page | `subscription/subscription.cy.js` |
| TC15 | Place Order: Register before Checkout | `checkout/register-before-checkout.cy.js` |
| TC16 | Place Order: Login before Checkout | `checkout/login-before-checkout.cy.js` |

### Cobertura funcional

**Autenticação**
- Cadastro de novos usuários.
- Login com credenciais válidas.
- Validação de credenciais inválidas.
- Logout.
- Validação de e-mail já cadastrado.

**Produtos**
- Visualização da listagem de produtos.
- Validação dos detalhes de um produto.
- Pesquisa de produtos por nome.

**Newsletter**
- Inscrição utilizando um endereço de e-mail.

**Checkout**
- Cadastro antes da compra.
- Login antes da compra.
- Adição de produtos ao carrinho.
- Validação dos endereços e do pedido.
- Preenchimento dos dados de pagamento.
- Confirmação do pedido.
- Exclusão da conta ao final dos cenários.

## 7. Arquitetura e padrões de projeto

### 7.1. Page Object Model

O projeto utiliza o padrão Page Object Model para encapsular seletores e interações com as páginas.

Cada página possui uma classe responsável por suas operações.

Exemplo:

```javascript
class HomePage {
  visit() {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
  }

  openLogin() {
    cy.contains('a', 'Signup / Login').click();
  }

  openProducts() {
    cy.contains('a', 'Products').click();
  }

  openCart() {
    cy.contains('a', 'Cart').click();
  }
}

module.exports = new Home