import { driver } from "driver.js";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#painelFuncionalidades', popover: { title: 'Painel', description: 'Use as funcionalidades desse painel para gerenciar seus processos.', side: 'bottom', align: 'start' } },
    { element: '#criarProcessos', popover: { title: 'Criar um modelo de processo', description: 'Crie um modelo passo a passo de algum processo.', side: 'bottom', align: 'start' } },
    { element: '#iniciarProcessos', popover: { title: 'Iniciar um processo', description: 'Inicie um processo de acordo com o modelo criado.', side: 'bottom', align: 'start' } },
    { element: '#salvarProcessos', popover: { title: 'Salvar os processos', description: 'Salve o processo em um banco de dados para poder ter acesso através do localizador e do token de criptografia gerado, tendo em vista que o processo iniciado aqui só fica armazenado nesse navegador.', side: 'bottom', align: 'start' } },
    { element: '#atualizarProcessos', popover: { title: 'Atualizar os processos salvos', description: 'Atualize o banco de dados com a modificações realizadas.', side: 'bottom', align: 'start' } },
    { element: '#carregarProcessos', popover: { title: 'Carregar mais processos', description: 'Carregue seus processo que estão armazenados no banco de dados utilizando o localizador e o token de criptografia, podendo ser carregados outros juntamento com os processos que estão no menu "Meus processos".', side: 'bottom', align: 'start' } },
    { element: '#deletarProcessos', popover: { title: 'Deletar processos', description: 'Delete os processos que estiverem no menu "Meus processos".', side: 'bottom', align: 'start' } },
    { element: '#meusProcessos', popover: { title: 'Meus processos iniciados', description: 'Exibe os processos que você iniciou.', side: 'bottom', align: 'start' } },
    
  ]
});

export const iniciarTutorialProcesso = () => driverObj.drive();