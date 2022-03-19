type File = {
    name: string;
    sizeKb: number;
    type: 'file';
};

type Folder = {
    name: string;
    sizeKb: number;
    type: 'dir';
    items: Location[];
};

export type Location = Folder | File;
