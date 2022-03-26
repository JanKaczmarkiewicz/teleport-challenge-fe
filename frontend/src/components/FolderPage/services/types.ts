export type FolderData = {
    name: string;
    items: {
        name: string;
        sizeKb: number;
        type: 'file' | 'dir';
    }[];
};

export type SortableAttributes = keyof Pick<
    FolderData['items'][number],
    'name' | 'sizeKb'
>;
