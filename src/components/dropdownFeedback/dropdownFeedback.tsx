"use client"

import Rating from "@mui/material/Rating";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
export default function DropdownFeedback({ city }: { city: any }) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label="Customise options" className="shadow-shape cursor-pointer focus:outline-none hover:bg-gradient-to-r hover:from-green-900 hover:to-gray-950	 bg-gradient-to-r from-green-700 to-green-900 rounded-full p-2 w-6 h-6 flex justify-center items-center">
                    <p className="text-white uppercase ">{((city.saude + city.educacao + city.trabalho + city.seguranca + city.infraEstrutura + city.pnr + city.batalhao + city.custoVida) / 8).toFixed(1)}</p>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-[#192132] rounded-md px-3 py-2 text-gray-400 flex flex-col gap-1">
                    <div className="flex flex-col border-b border-green-800 flex-1">
                     <h1 className="flex justify-center text-white ">
                        Média geral das análises
                    </h1> 
                    <p className="flex justify-center text-green-700">{city.city}</p>
                    </div>
                    
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Educação<Rating name="size-large" precision={0.5} value={city.educacao} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Saúde<Rating name="size-large" precision={0.5} value={city.saude} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Trabalho para Dependente<Rating name="size-large" precision={0.5} value={city.trabalho} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Segurança<Rating name="size-large" precision={0.5} value={city.seguranca} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Infraestrutura<Rating name="size-large" precision={0.5} value={city.infraEstrutura} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        PNR<Rating name="size-large" precision={0.5} value={city.pnr} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Batalhão<Rating name="size-large" precision={0.5} value={city.batalhao} size="small" readOnly />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="focus:outline-none flex align-middle items-center gap-2">
                        Custo de vida<Rating name="size-large" precision={0.5} value={city.custoVida} size="small" readOnly />
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="fill-[#192132]" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}