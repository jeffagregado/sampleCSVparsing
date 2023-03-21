import { Inter } from 'next/font/google'
import Upload from './components/upload'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`container  max-w-[720px] h-[100vh] flex flex-col justify-center`}>
      <div>
        <Upload />
      </div>
    </main>
  )
}
