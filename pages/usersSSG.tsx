// pages/usersSSG.tsx     -- http://localhost:3000/usersSSG

import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { GetStaticProps } from 'next'

export interface User {
  id: number;
  name: string;
  username: string;
}

interface Props {
  users: User[]
}

const Users : React.FC<Props> = ({users}) => {
  console.log(users)
  
  if (!users) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>NextJS Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from Users - # of users: {users?.length}</h1>

      <ul>
        {users && users.map(user => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// (Static Generation): Fetch data at build time
export const getStaticProps: GetStaticProps = async context => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
  
  // if (!response.data) { // 404 page
  //   return {
  //     notFound: true,
  //   }
  // }

  if (!response.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  // By returning { props: users }, the Users component
  // will receive `users` as a prop at build time
  return {
    props: { // A required object with the props that will be received by the page component.
      users: response.data 
    },
    // Re-generate the post at most once per 10 second
    // if a request comes in
    revalidate: 10  // An optional amount in seconds after which a page re-generation can occur in production.
  }
}

export default Users

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation


