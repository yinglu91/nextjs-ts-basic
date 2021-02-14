import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Users from '../components/home/users'
import Todos from '../components/home/todos'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs Basic</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js Basic</a>
        </h1>

        <Users />

        <Todos />
      </main>
    </div>
  )
}
