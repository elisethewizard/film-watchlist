import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb"
import type { PageData } from "../types"

export default function Pagination({ page, setPage, hasMore, isPlaceholderData }: PageData) {
    
    function Button(
        { type, onClick, disabled }: { type: 'previous' | 'next', onClick: () => void, disabled: boolean }
    ) {
        const text = type.slice(0, 1).toUpperCase() + type.slice(1)
        const Icon = (props: { size: number }) => 
            type === 'previous' ? 
            <TbArrowBigLeft {...props} /> : 
            <TbArrowBigRight {...props} />
        
        return (
            <button
                className="btn"
                onClick={onClick}
                disabled={disabled}
                style={{
                    opacity: disabled ? 0 : 1,
                    cursor: disabled ? 'default' : 'pointer',
                    flexDirection: type === 'previous' ? 'row' : 'row-reverse',
                }}
                aria-label={`Go to the ${type} page`}
            >
                <Icon size={18} aria-hidden />
                {text}
            </button>
        )

    }

    return (
        <div className="pagination">
            <Button
                type="previous"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
            />
            <span>Page {page}</span>
            <Button
                type="next"
                onClick={() => {
                    if (!isPlaceholderData && hasMore) {
                        setPage((prev) => prev + 1)
                    }
                }}
                disabled={isPlaceholderData || !hasMore}
            />
        </div>
    )
}