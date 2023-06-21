import { render, screen } from "@testing-library/react"
import TodoList from "../components/TodoList"
import userEvent from "@testing-library/user-event/" //Lembra de tirar aqui em cima


describe("Tests do componente ToDoList", () => {
    test("Deve renderizar com um título", () => {
        //renderizar o componente a ser testado
        render(<TodoList />) //Renderiza o componente que quer testar
        //buscar a funcionalidade a ser testada
        const title = screen.getByText("Todo List") //Pega a funcionalidade que quer que tenha ou não
        //ter certeza que o componente possui um título
        expect(title).toBeInTheDocument() //Espero que esse título exista nesse documento
    })

    test("Deve iniciar com o input vazio", () => {
        //renderizar o componente a ser testado
        render(<TodoList />)
        //buscar a funcionalidade a ser testada
        const input = screen.getByPlaceholderText("Enter a todo")
        //ter certeza que o input inicia vazio
        expect(input).toHaveValue("")
    })

    test("Deve atualizar o valor do input ao digitar nele", async () => {
        //criar um usuário para a simulação
        const user = userEvent.setup()
        //renderizar o componente a ser testado
        render(<TodoList />)
        //buscar pela funcionalidade a ser testada
        //exemplo com regex. mais informações https://ihateregex.io/cheatsheet/
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //simular o usuário digitando
        await user.type(input, "adoro vocês da barbosa <3")
        //ter certeza que o componente atualiza quando o usuário digitar algo
        expect(input).toHaveValue("adoro vocês da barbosa <3")
    })

    test("2.2 Deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER", async () => {
        //criar um usuário para simulação
        const user = userEvent.setup()
        //renderizar o componente a ser testado
        render(<TodoList />)
        //buscar pela funcionalidade a ser testada
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //simular o usuário digitar no input e apertar ENTER doc -> https://testing-library.com/docs/ecosystem-user-event/
        await user.type(input, "vocês são sensacionais{enter}")
        //buscar pela taefa digitada pelo usuário
        const newTask = screen.getByText("vocês são sensacionais")
        //ter certeza que o componente atualiza quando o usuário digitar algo
        expect(newTask).toBeInTheDocument()
    })

    test("3. Deve alterar o status da tarefa quando o botão toggle for clicado", async () => {
        //criar um usuário para simulação
        const user = userEvent.setup()
        //renderizar o componente a ser testado
        render(<TodoList />)
        //buscar pela primeira funcionalidade a ser testada
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //simular usuário digitando e apertando
        await user.type(input, "estudar pós aula{enter}")
        //buscar pela tarefa digitada pelo usuário
        const newTask = screen.getByText("estudar pós aula")
        //buscar pelo botão Toggle
        // screen.logTestingPlaygroundURL()  //verificar simulação no navegador -> 
        const toggleButton = screen.getByRole("button", {name: /toggle/i})
        //simular o usuário clicando no botão Toggle
        await user.click(toggleButton)
        //ter certeza que o componente renderizará uma tarefa concluída ao clique do usuário
        expect(newTask).toHaveStyle("text-decoration: line-through")
    })

    test("4. Deve remover a tarefa quando o botão de deletar for clicado", async () => {
        //criar um usuário para simulação
        const user = userEvent.setup()
        //renderizar o componente a ser testado
        render(<TodoList />)
        //buscar pela primeira funcionalidade a ser testada
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //simular usuário digitando e apertando
        await user.type(input, "estudar para aula{enter}")
        //buscar pela tarefa digitada pelo usuário
        const newTask = screen.getByText("estudar para aula")
        //buscar pelo botão delete
        // screen.logTestingPlaygroundURL()
        const deleteButton = screen.getByRole('button', { name: /delete/i })
        //simular o usuário clicando no botão delete
        await user.click(deleteButton)
        //ter certeza que a tarefa foi excluída
        expect(newTask).not.toBeInTheDocument()
    })

})