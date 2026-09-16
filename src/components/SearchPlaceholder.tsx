import { TbMovie } from 'react-icons/tb'

function SearchPlaceholder() {
    return (
        <div className='main-content results-placeholder-cont'>
            <TbMovie size={74} strokeWidth={'1.5'} />
            <h2>Start exploring</h2>
        </div>
    )
}

export default SearchPlaceholder