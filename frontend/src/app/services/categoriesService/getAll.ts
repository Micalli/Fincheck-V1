import { Category } from '../../entities/Category';
import { httpClient } from "../httpClient";

type CategoryAccountResponse = Array<Category>;

export async function getAll() {
    const { data } = await httpClient.get<CategoryAccountResponse>(
        "/categories"
    );

    return data;
}
