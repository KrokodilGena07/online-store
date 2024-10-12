export interface IProductQuery {
    search?: string;
    sort?: string;
    brandId?: string;
    categoryId?: string;
    limit?: number;
    page?: number;
}