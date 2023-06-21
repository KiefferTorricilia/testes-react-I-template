import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event/"
import Counter from "../components/Counter"

describe("Tests do componente Counter", () => {
    test("1. Deve aumentar em 3 o contador quando o botão de incremento for clicado 3 vezes.", async () => {
        //criar um usuário para simulação
        const user = userEvent.setup()
        //renderizar o componente a ser testado
        render(<Counter />)
        //buscar pela funcionalidade a ser testada
        // screen.logTestingPlaygroundURL()
        const incrementButton = screen.getByRole('button', { name: /\+/i })
        //simular um usuário apertando
        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)
        //buscar pela tarefa realizada pelo usuário
        const value = screen.getByText("3")
        //ter certeza que o componente atualiza quando o usuário clica
        expect(value).toBeInTheDocument()
    })
})