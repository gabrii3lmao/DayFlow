# ⏳ Daily Activity Timer

Um gerenciador de atividades semanais simples e eficiente, onde você pode organizar suas tarefas por dia da semana e acompanhar o tempo de execução de cada uma com um timer dedicado.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Andamento-orange)
![Licença](https://img.shields.io/badge/License-MIT-blue)

## 📖 Sobre o Projeto

Este projeto é uma aplicação web Fullstack desenvolvida para ajudar na produtividade diária. O usuário pode visualizar os dias da semana, adicionar atividades específicas para cada dia (com título e duração estimada) e utilizar um timer integrado para focar na execução da tarefa.

A persistência de dados é feita através do MongoDB, garantindo que suas tarefas fiquem salvas.

## 🚀 Funcionalidades

- **Organização Semanal:** Visualização de tarefas separadas por dias da semana (Segunda a Domingo).
- **Gerenciamento de Atividades (CRUD):**
  - **Criar:** Adicionar novas atividades com duração definida em minutos.
  - **Ler:** Listar todas as atividades de um dia específico.
  - **Atualizar:** Editar título, duração ou marcar como concluída.
  - **Deletar:** Remover atividades que não são mais necessárias.
- **Timer Individual:** Cada atividade possui seu próprio cronômetro baseado na duração estipulada.
- **Interface Dinâmica:** Uso de EJS para renderização server-side e JavaScript no frontend para controle dos timers e menus expansíveis.

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) (Framework web)
- [Mongoose](https://mongoosejs.com/) (ODM para MongoDB)
- [Method-Override](https://www.npmjs.com/package/method-override) (Para suportar métodos PUT e DELETE em formulários HTML)

**Frontend:**
- **EJS** (Embedded JavaScript Templating)
- **CSS3** (Estilização customizada)
- **Vanilla JavaScript** (Lógica do Timer e interações de DOM)

**Banco de Dados:**
- [MongoDB](https://www.mongodb.com/)

## 📂 Estrutura do Projeto

```text
src/
├── controllers/      # Lógica de controle (Activity e Home)
├── models/           # Schemas do Mongoose (Day e Activity)
├── public/           # Arquivos estáticos
│   ├── css/          # Estilos (styles.css, activityForm.css)
│   └── js/           # Scripts do front (timer.js, collapsible.js)
├── routes/           # Rotas da aplicação
├── views/            # Templates EJS (Layouts e Páginas)
├── server.js         # Ponto de entrada da aplicação
└── seedDay.js        # Script para popular os dias da semana
```
## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js
- MongoDB (rodando localmente ou via Atlas)

---

## ⚡ Como Rodar o Projeto

1. **Clone o repositório (ou baixe os arquivos):**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
2. **Instale as dependências:**
``` bash
npm install
```
3. **Configure o banco de dados:**
Certifique-se de que o MongoDB está rodando na sua máquina na porta padrão (27017).

A string de conexão padrão configurada no `server.js` é:
```
mongodb://127.0.0.1:27017/activities_db
```
4. **Inicie o servidor:**
```
npm start
# ou
node src/server.js
```
5. **Acesse a aplicação:**
Abra seu navegador e vá para: 
```
http://localhost:3000
```
> Nota: Ao rodar pela primeira vez, o script seedDay irá popular automaticamente o banco de dados com os dias da semana (Segunda, Terça, etc.).

## 🛣️ Rotas da API

| Método | Rota                                 | Descrição                                   |
|--------|--------------------------------------|---------------------------------------------|
| GET    | `/`                                  | Página inicial (lista os dias e atividades) |
| GET    | `/days/:dayId/activities/new`         | Formulário para criar nova atividade        |
| POST   | `/days/:dayId/activities`             | Cria uma nova atividade no banco            |
| PUT    | `/days/:dayId/activities/:activityId` | Atualiza uma atividade existente            |
| DELETE | `/days/:dayId/activities/:activityId` | Remove uma atividade                        |
