import Image from 'next/image';
import MinarahLogo from '@/public/logos/logo.svg';

export default function Header() {
    return (
        <div className='flex items-center justify-center p-2 font-[family-name:var(--font-figtree)]'>
            <div className='flex items-center'>
                <Image alt={'logo'} src={MinarahLogo} className='w-6' width={24} height={29}/>
                <span className='font-display tracking-widest font-medium ml-1 text-lg pt-1 text-[#2e7764]'>MANARAH</span>
            </div>
        </div>
    )
}