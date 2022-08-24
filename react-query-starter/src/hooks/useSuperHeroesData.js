import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperheroes, {
        cacheTime: 300000, // 5min by default
        staleTime: 0, // 0 by default
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchInterval: 2000, // polling - refetch every 2sec
        refetchIntervalInBackground: true,
        enabled: false, // fetch data on event (button click), disable fetching onMount
        onSuccess,
        onError,
    })
}