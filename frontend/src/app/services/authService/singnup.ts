import { httpClient } from '../httpClient';

export interface SingnupParams {
    name: string;
    email: string;
    password: string;
}

interface SingnupRespose {
    accessToken: string;
}

export async function singnup(params: SingnupParams) {
    const { data } = await httpClient.post<SingnupRespose>(
        "/auth/singup",
        params
    );

    return data;
}


