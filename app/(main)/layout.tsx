import '../globals.css'
import MainHeader from '@/components/MainHeader'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>

        <main>
          <div className='main-page'>
            <MainHeader />

            <div className="main-page__content mt-5">
              {children}
            </div>

            <footer>
              &copy; 2023 Guangxue Zhang
            </footer>

          </div>
        </main>

      </body>
    </html>
  )
}
