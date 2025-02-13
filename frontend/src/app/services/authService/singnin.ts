import { httpClient } from "../httpClient";

export interface SingninParams {
    email: string;
    password: string;
}

interface SingninRespose {
    accessToken: string;
}

export async function singnin(params: SingninParams) {
    const { data } = await httpClient.post<SingninRespose>(
        "/auth/singin",
        params
    );

    return data;
}
