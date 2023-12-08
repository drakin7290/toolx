import React from 'react'

const LoadingContainer = () => {
    return (
        <div className='w-full h-full flex justify-center items-center min-h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-white'>
            <div className='loader'>
                <span>

                </span>
                <div className='loader-img'>
                    <img src='/imgs/logo.png' />
                </div>
            </div>
        </div>
    )
}

export default LoadingContainer