import type { Film } from '../types.ts'
import Card from './Card.tsx'

function List(props: { data: Film[] }) {
    const { data } = props

    return (
        <div className='main-content list-cont'>
            { data.map(element => <Card film={element} key={element.id} />) }
        </div>
    )
}

export default List