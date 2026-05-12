import { useState } from "react"
import { TbSearch, TbEraser } from "react-icons/tb"

function Searchbar(props: { getFilmRequest: (a: string) => Promise<void> }) {
    const { getFilmRequest } = props
    const [input, setInput] = useState('')

    function search() {
        if (!input) {
            return
        }
        getFilmRequest(input)
    }

    function resetInput() {
        setInput('')
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
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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