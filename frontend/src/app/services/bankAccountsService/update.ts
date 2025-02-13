import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
    id: string;
    name: string;
    initialBalance?: string | number;
    color: string;
    type: "CHECKING" | "INVESTING" | "CASH";
}


export async function update({ id, ...params }: UpdateBankAccountParams) {
    const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

    return data;
}
