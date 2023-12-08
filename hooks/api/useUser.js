import { useMutation, useQuery } from 'react-query';
import { API } from '~/core/api/config';
import api, { encodeQueryData } from '~/core/api/api';
import { getSession } from 'next-auth/react';

async function getProfile(filter) {
    let session;
    await getSession().then(data => session = data);
    filter = encodeQueryData(filter)
    const result = await api.get(API.USER.GET + '?' + filter, {
        headers: {
            Authorization: 'Bearer ' + session.user.data.token
        },
    });
    if (result) {
        const { data } = result;
        return data;
    }
    return {};
}

export const useGetProfile = (filter) => {
    return useQuery(['get-profile', filter], () => getProfile(filter));
};
