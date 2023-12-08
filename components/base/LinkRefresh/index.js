import Link from 'next/link'
import React from 'react'

const LinkOutside = React.forwardRef(({ children, href, className }, ref) => {
    return (
        <a href={href} className={className} ref={ref} >
            {children}
        </a>
    )
})

const LinkRefresh = ({ className, children, ...props }) => {
    return (
        <Link passHref legacyBehavior {...props}>
            <LinkOutside className={className} >
                {children}
            </LinkOutside>
        </Link>
    )
}

export default LinkRefresh