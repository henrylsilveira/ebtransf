import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { Links } from '@/components/Links'

export default function SobreNos() {
    return (
        <>
        <title>EBCalc - Sobre nós</title>
        <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
            <h1 className="text-green-600 font-bold uppercase text-xl text-center pb-2">Sobre Nós</h1>
            <article>
                <p className="font-light text-gray-300 text-justify py-4">
                Bem-vindo ao EB#Cacl, projetado para simplificar cálculos. Nossa missão é fornecer ferramentas precisas e acessíveis que ajudem você a tomar decisões informadas e a resolver problemas com facilidade.
                </p>
            </article>
            <h2 className="text-green-600 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Quem Somos</h2>
            <article>
                <p className="font-light text-gray-300 text-justify py-4">
                Somos apaixonados por tecnologia e matemática, dedicados a criar formas de facilitar e otimizar o tempo gasto para conseguir as informações que precisamos.</p>
            </article>
            <h1 className="text-green-600 font-bold pt-3 uppercase border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />O Que Oferecemos</h1>
            <article>
                <p className="font-light text-gray-300 text-justify py-4">
                    No EB#Calc, oferecemos calculadoras em diversas áreas e com o tempo iremos implementado outras, incluindo:
                    <ul>
                        <li>
                            - Calculadora para cálculo transfência e gratificação representação.
                        </li>
                        <li>
                            - Calculadora para tempo de serviço.
                        </li>
                        <li>
                            - Tabela com os dados necessários para os cálculos. Sendo possível saber caso algum valor esteja desatualizado.
                        </li>
                    </ul>
                </p>
            </article>
            <h1 className="text-green-600 font-bold pt-3 uppercase border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Nosso Compromisso</h1>
            <article>
                <p className="font-light text-gray-300 text-justify py-4">
                    <ul>
                        <li>
                            - Precisão: Todas as nossas calculadoras são construídas com base em cálculos matemáticos precisos e atualizados.
                        </li>
                        <li>
                            - Facilidade de Uso: Nossas calculadoras são intuitivas e fáceis de usar, tornando o processo de cálculo simples e acessível a todos.
                        </li>
                        <li>
                            - Acesso Gratuito: Acreditamos que o conhecimento deve ser livremente acessível. Portanto, todas as nossas calculadoras são oferecidas gratuitamente, sem custos ocultos.
                        </li>
                        <li>
                            - Privacidade e Segurança: Levamos a sério a privacidade dos usuários. Nenhum dado pessoal é coletado ou armazenado ao usar nossas calculadoras.
                        </li>
                        {/* <li>
                            - Feedback: Valorizamos a opinião dos nossos usuários. Se você tiver sugestões para novas calculadoras ou melhorias, entre em contato conosco. Estamos sempre trabalhando para aprimorar nossos serviços.
                        </li> */}
                    </ul>
                </p>
            </article>
            <article>
                <p className="font-light text-gray-300 text-justify py-4">
                Obrigado por escolher o EB#Calc. Esperamos que nossas ferramentas facilitem sua vida e contribuam para seu sucesso em diversas áreas. Explore nossas calculadoras e comece a simplificar sua vida hoje mesmo!
                </p>
            </article>
           
            <Links />
        </div>
        </>
    )
}