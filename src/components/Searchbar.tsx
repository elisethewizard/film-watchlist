import { useState, type Dispatch, type SetStateAction } from "react"
import { TbSearch, TbEraser } from "react-icons/tb"

function Searchbar({ setQueryFinal }: { setQueryFinal: Dispatch<SetStateAction<string>> }) {
    const [searchQuery, setSearchQuery] = useState('')

    function search() {
        if (!searchQuery) {
            return
        }
        setQueryFinal(searchQuery)
    }

    function resetInput() {
        setSearchQuery('')
    }

    return (
        <div className='searchbar-cont'>
            <div className="searchbar-inner">
                <label htmlFor='searchbar-input'>
                    <TbSearch className="icon" size={18} />
                    <input
                        placeholder='Search for a movie'
                        type="text"
                        id='searchbar-input'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                search()
                            }
                        }}
                    />
                </label>
                <TbEraser className="icon" size={18} onClick={resetInput} />
            </div>
            <button onClick={search}>Search</button>
        </div>
    )
}

export default Searchbar