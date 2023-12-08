'use client';

import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerFb = () => {
    return (
        <FacebookProvider appId={'1095189654952557'} chatSupport>
            <CustomChat pageId='174804855721267' minimized={true} />
        </FacebookProvider>
    )
}

export default MessengerFb