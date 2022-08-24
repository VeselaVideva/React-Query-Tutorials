import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering an error', error)
  }
  
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperheroes,
    {
      cacheTime: 300000, // 5min by default
      staleTime: 0, // 0 by default
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 2000, // polling - refetch every 2sec
      refetchIntervalInBackground: true,
      enabled: false, // fetch data on event (button click), disable fetching onMount
      onSuccess,
      onError,
    }
  )

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )
}
