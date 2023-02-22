import { NextPage } from "next";
import Link from "next/link";
import { IconType } from "react-icons";

interface AdminNavBarProps{
  navbarIcons: {name: IconType, href: string, label: string}[]
}

const AdminNavBar: NextPage<AdminNavBarProps> = ({navbarIcons}) => {
	return (
	  <nav className='ml-2 space-y-6'>
	    {navbarIcons.map(icon=>{
	      return (
	        <Link key={icon.href} href={icon.href} className='flex items-center gap-2 hover:scale-95 ease-out'>
	          <icon.name />
	          <span>{icon.label}</span>
	        </Link>
	      )
	    })}
	  </nav>
	)
}

export default AdminNavBar;