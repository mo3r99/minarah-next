import Image from 'next/image';
import MinarahLogo from '@/public/logos/minarah_logo.png';

export default function Header() {
    return (
        <div className='flex items-center justify-center p-2 font-[family-name:var(--font-figtree)]'>
            <div className='flex items-center'>
                <Image alt={'logo'} src={MinarahLogo} className='w-3' width={12} height={43}/>
                <span className='font-display tracking-widest font-medium text-lg pl-2 pt-1 text-[#2e7764]'>MINARAH</span>
            </div>
        </div>
    )
}