export declare function list(query: any): Promise<{
    total: any;
    page: number;
    per: number;
    products: any;
}>;
export declare function getById(id: string): Promise<any>;
export declare function create(data: any): Promise<any>;
export declare function update(id: string, data: any): Promise<any>;
export declare function remove(id: string): Promise<any>;
