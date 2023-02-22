import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <section className='mt-8'>
        <h1 className='greeting'>G'day, mate! How ya goin?</h1>
        <h2>Welcome to my corner of the internet!</h2>
      </section>
      <section className='mt-8'>
        <h2>Little about me</h2>
        <ul className='real-list'>
          <li>I'm a person who is obsessed with minimalism, not limited to writing codes.</li>
          <li>I share what I <Link href="/blog" className='link-underline-color'>thought of learning</Link> as self-taught developer.</li>
          <li>My main focus is on front-end development.</li>
          <li>I build web with <Link href="/demo" className='link-underline-color'>Next.js/MySQL/Node.js/Python/Go/PHP</Link>.</li>
          <li>I write codes on Sublime Text, not a big fan of laggy VS Code.</li>
          <li>My ambition is becoming a competent web developer and a good father.</li>
        </ul>
      </section>
    </>
  )
}
