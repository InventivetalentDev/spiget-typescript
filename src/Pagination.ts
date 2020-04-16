export class Pagination {
    size: number;
    page: number;
    sort: string;

    constructor(size: number = 10, page: number = 1, sort: string = "") {
        this.size = size;
        this.page = page;
        this.sort = sort;
    }
}
export default Pagination
