import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperheroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {
    const { data: superHeroes } = useQuery('super-heroes', fetchSuperheroes)
    const { data: friends } = useQuery('friends', fetchFriends)

    return (
        <>
            <h2>Parallel Queries Page</h2>
            <h4>Heroes</h4>
            {superHeroes?.data.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })}
            <h4>Friends</h4>
            {friends?.data.map(friend => {
                return <div key={friend.id}>{friend.name}</div>
            })}
        </>
    )
}