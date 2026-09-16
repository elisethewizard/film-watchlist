import { useState } from "react"

function Description({ desc }: { desc: string | null }) {
    const [readMore, setReadMore] = useState(false)

    const type = desc?.length && desc.length > 250 ? 'long' :
    desc ? 'short' :
    'none'

    switch (type) {
        case "long": return (
            <div className="desc">
                {readMore ? desc : `${desc!.slice(0, 230).trim()}..`}
                <span
                    className='desc-span'
                    role="button"
                    onClick={() => setReadMore(prev => !prev)}
                >
                    {readMore ? 'Hide' : 'Read more'}
                </span>
            </div>
        )
        case "short": return (
            <div className="desc">{desc}</div>
        )
        case "none": return (
            <div className="desc">Description unavailable.</div>
        )
    }
}

export default Description