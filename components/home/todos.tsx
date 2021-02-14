
import Head from 'next/head'
import useSWR from 'swr'
import axios from 'axios'

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetcher = async (url: string) => {
  const {data} = await axios.get<Todo[]>(url)
  return data
}

const Todos = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/todos', fetcher)
  console.log(data)
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>NextJS Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from Todos - # of todos: {data?.length}</h1>

      <ul>
        {data && data.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Todos

// The old ways:

// method 1: use native fetch 
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/todos')
       .then(response => response.json())
       .then(json => setTodos(json))
  }, [])
*/

// method 2: use axios
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
	  const fetchData = async () => {
	    const {data} = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
		  setTodos(data)
	  }
	  
	  fetchData()
	}, []) 
*/