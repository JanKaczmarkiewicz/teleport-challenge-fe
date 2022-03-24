export type FolderData = {
    name: string;
    type: 'dir';
    sizeKb: number;
    items: {
        name: string;
        sizeKb: number;
        type: 'file' | 'dir';
    }[];
};

export type SortableAttributes = keyof Pick<FolderData, 'name' | 'sizeKb'>;
