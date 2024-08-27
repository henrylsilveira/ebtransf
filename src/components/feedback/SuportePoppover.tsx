'use client'
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { MdOutlineContactSupport } from 'react-icons/md'
export default function Suporte() {
    return (
        <Popover.Root >
            <Popover.Trigger aria-controls="suporte">
                <MdOutlineContactSupport className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />
            </Popover.Trigger>
                
                <Popover.Content className='data-[side=right]:animate-slideLeftAndFade '>
                    <div className='bg-black p-4 border border-green-600 rounded-lg'>
                        <div className='block text-sm text-white font-light'>
                            <p className='font-bold'>Suporte por E-mail</p>
                            <Link className='text-green-500 pointer hover:underline' href="mailto:suporte@ebcalc.net">suporte@ebcalc.net </Link>
                        </div>
                    </div>
                    <Popover.Close />
                    <Popover.Arrow />
                </Popover.Content>
        </Popover.Root>
    )
}
