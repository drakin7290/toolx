import { useMutation, useQuery } from 'react-query';
import { API } from '~/core/api/config';
import api, { encodeQueryData } from '~/core/api/api';
import { getSession } from 'next-auth/react';

async function getListMission(filter) {
    let session;
    await getSession().then(data => session = data);
    filter = encodeQueryData(filter)
    const result = await api.get(API.MISSION.LIST + '?' + filter, {
        headers: {
            Authorization: 'Bearer ' + session?.user?.response?.data?.token
        },
    });
    if (result) {
        const { data } = result;
        return data;
    }
    return {};
}

export const useGetListMission = (filter) => {
    return useQuery(['list-mission', filter], () => getListMission(filter));
};

async function postVerifyMission(body) {
    let session;
    await getSession().then(data => session = data);
    let url = API.MISSION.VERIFY;
    url = url.replace(':code', body?.code)
    const { data } = await api.post(url, body, {
        headers: {
            Authorization: 'Bearer ' + session?.user?.response?.data?.token
        },
    });
    return data;
}

export const usePostVerifyMission = () => {
    return useMutation(postVerifyMission);
};
