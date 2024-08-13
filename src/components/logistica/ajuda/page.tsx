import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MdHelp, MdOutlineClose } from "react-icons/md";

export function MenuAjuda() {
    return (
        <AlertDialog.Root aria-controls="guia">
            <AlertDialog.Trigger asChild>
                <button type="button" className="hover:bg-orange-800 items-center text-xs bg-transparent border border-orange-700 uppercase text-white py-2 px-2 rounded-md flex gap-2"><MdHelp className="w-4 h-4" />Ajuda</button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] sm:w-10/12 w-10/12 max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                        Guia para uso do sistema
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal flex flex-col overflow-y-auto max-h-[60vh]">
                        <div className="w-full flex flex-col justify-center items-center gap-4 mb-2">
                            <div>
                                <h1 className="text-green-600 font-bold uppercase text-xl">Tokens</h1>
                                <p className="text-md text-gray-400">Ao criar um token você inicializa uma instalação que é capaz de armazenar dados de diversos setores como Rancho e Combustível, bem como recuperar os dados armazenados no banco de dados.</p>
                            </div>
                            <div>
                                <h1 className="text-red-600 font-bold uppercase text-xl">Importante!!</h1>
                                <p className="text-md text-gray-400">O token é uma forma de identificar a instalação no banco sendo necessário sempre que for gravar os dados ou recuperá-los. Não perca ou distribua esse TOKEN a outras pessoas, somente a quem for de responsabilidade.</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center gap-4">
                            <div>
                                <h1 className="text-green-600 font-bold uppercase text-xl">Armazenamento de dados</h1>
                                <p className="text-md text-gray-400">Os dados primeiramente ficam armazenados no navegador do usuário para que seja possível manipulá-los de forma offline. Caso já tenha o site carregado em cache, ao clicar em enviar e introduzir o token da instalação o usuário envia para o banco de dados online. Sendo necessário sempre que reenviar caso faça alguma alteração local, ficando armazenado a nova versão.</p>
                            </div>
                            <div>
                                <h1 className="text-red-600 font-bold uppercase text-xl">Importante!!</h1>
                                <p className="text-md text-gray-400">Mantenha sempre seus dados salvos localmente ou em um pendrive através da funcionalidade EXPORTAR, que fará o download de duas tabelas, sendo a tabela de item e a tabela de entrada e saída de material. Para retornar esses dados ao sistema use a funcionalidade de IMPORTAR para armazenar LOCALMENTE os dados da tabela de item e IMPORTAR REGISTROS para armazenar LOCALMENTE os dados de entrada e saída de material.</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="text-green-600 font-bold uppercase text-xl">Ferramentas de Logística</h1>
                            <p className="text-md text-gray-400">Todas as ferramentas funcionam basicamente da mesma forma, você cadastra um item em seguida ele aparecerá na tabela abaixo e será possível cadastrar entradas e saídas desse material. As diversas funcionalidades que estão dispostas são APAGAR, EXPORTAR, IMPORTAR, IMPORTAR REGISTROS e ENVIAR. </p>
                        </div>
                    </AlertDialog.Description>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}