import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
    const QueryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-Hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )

    console.log({ QueryResults })
    
    return <div>Dynamic Parallel Page</div>
}