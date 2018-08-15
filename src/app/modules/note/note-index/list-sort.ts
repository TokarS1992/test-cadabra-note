export interface IlistSort {
    title: string;
    val: string;
    keyQuery: string;
}

export const listSort: IlistSort[] = [
    {title: 'All', val: '', keyQuery: 'filter'},
    {title: 'Active', val: 'active', keyQuery: 'filter'},
    {title: 'Archived', val: 'archived', keyQuery: 'filter'}
];
