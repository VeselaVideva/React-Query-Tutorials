import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperheroes, {
    // cacheTime: 300000, // 5min by default
    // staleTime: 0, // 0 by default
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000, // polling - refetch every 2sec
    // refetchIntervalInBackground: true,
    // enabled: false, // fetch data on event (button click), disable fetching onMount
    onSuccess,
    onError,
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => { // for handling mutation response
    //   // queryClient.invalidateQueries('super-heroes') // makes a 2nd request to get the updated data
    //   queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, {
            id: oldQueryData?.data.length + 1,
            ...newHero
          }]
        }
      })
      return {
        previousHeroData, 
      }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}