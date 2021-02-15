// pages/users.tsx     -- http://localhost:3000/users

import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { GetStaticProps, GetStaticPaths } from 'next'

export interface User {
  id: number;
  name: string;
  username: string;
}

const User = ({user}) => {
  if (!user) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>NextJS Basic | User: {user.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from User - {user.name}</h1>

      <Link href={`/users`}>
        Back To Users
      </Link>
    </div>
  )
}

// (Static Generation): Fetch data at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${params.id}`)
  
  if (!response.data) { // 404 page
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: response.data 
    }
  }
}

// only runs at build time on server-side.
// only be exported from a page. You can’t export it from non-page files.
export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')

  // Get the paths we want to pre-render based on data (users)
  const paths = data.map((user) => ({
    params: { id: '' + user.id },
  }))

  return {
    paths,
    fallback: false // any paths not returned by getStaticPaths will result in a 404 page
  };
}
// if fallback: true
// Enable statically generating additional pages
// For example: `/users/11`

export default User

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation



