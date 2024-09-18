"use client"
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classnames from "classnames"

const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        {
            label: "dashboard",  href: "/"
        },
        {
            label: "issues",  href: "/issues"
        }
    ]
  return (
    <nav className='flex space-x-4 px-6 py-4 items-center bg-red-400'>
        <Link href="/" className='text-[1.6rem] text-white drop-shadow-lg'><AiFillBug />
        </Link>
        <div>
            <ul className='flex gap-4'>
            {links.map(link => <Link key={link.href} href={link.href} className={classnames({
                "text-zinc-100": link.href === currentPath,
                "text-zinc-300": link.href !== currentPath,
                "hover:text-zinc-100 transition-color duration-200": true,
            })}>{link.label}</Link>)}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar