import Link from "next/link";

const MainHeader = () => {
	return (
		<header>
      <nav className='mt-10'>
	      <ul className='flex w-full gap-10'>
		      <li>
			    <Link href="/">
			      <span className='link-underline'>Home</span>
		      </Link>
		      </li>
		      <li>
		      <Link href="/blog">
		      	<span className='link-underline'>Blog</span>
		      </Link>
		      </li>
		      <li>
		      <Link href="/demo">
		     	 <span className='link-underline'>Demo</span>
		      </Link>
		      </li>
		      <li>
		      <Link href="/about">
		      	<span className='link-underline'>About</span>
		      </Link>
		      </li>
	      </ul>
      </nav>
    </header>
	)
}

export default MainHeader;