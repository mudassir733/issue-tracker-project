import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
    const links = [
        {
            label: "dashboard",  href: "/dashboard"
        },
        {
            label: "issues",  href: "/issues"
        }
    ]
  return (
    <nav className='flex space-x-4 px-6 py-4 border-[1px] items-center'>
        <Link href="/" className='text-[1.6rem]'><AiFillBug />
        </Link>
        <div>
            <ul className='flex gap-4'>
            {links.map(link => <Link key={link.href} href={link.href} className='text-zinc-500 hover:text-zinc-800'>{link.label}</Link>)}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar