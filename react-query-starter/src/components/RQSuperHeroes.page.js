import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperheroes,
    {
      cacheTime: 300000, // 5min by default
      staleTime: 0, // 0 by default
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 2000, // polling - refetch every 2sec
      refetchIntervalInBackground: true,
    }
  )

  console.log({ isLoading, isFetching })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>{hero.name}</div>
        })
      }
    </>
  )
}
