import { useMutation, useQuery } from 'react-query';
import { API } from '~/core/api/config';
import api from '~/core/api/api';

async function postContact(body) {
    const formData = new FormData();

    for (const key in body) {
        formData.append(key, body[key]);
    }

    const { data } = await api.post(API?.CONTACT?.SEND, formData);
    return data;
}

export const usePostContact = () => {
    return useMutation(postContact);
};

// with header Bearer token
async function getListBrand(lang) {
    const result = await api.get(API?.BRAND?.LIST + '?lang=' + lang);
    if (result) {
        const { data } = result;
        return data;
    }
    return {};
}

export const useGetListBrand = (lang) => {
    return useQuery(['list-brand', lang], () => getListBrand(lang));
};
