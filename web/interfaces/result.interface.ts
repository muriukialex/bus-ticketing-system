export interface Result<T> {
    data: Array<T>;
    meta: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
    links: {
        first: string;
        last: string;
        current: string;
        next: string;
        previous: string;
    };
}
