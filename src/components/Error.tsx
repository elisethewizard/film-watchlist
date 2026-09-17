function Error({ message }: { message?: string }) {
    return (
        <h1 className='main-content error'>There was an error: {message || 'unknown error.'}</h1>
    )
}

export default Error