import { Location, Folder } from './types';

const root: Location = {
    name: 'teleport',
    sizeKb: 0,
    type: 'dir',
    items: [
        {
            name: 'lib',
            sizeKb: 0,
            type: 'dir',
            items: [
                {
                    name: 'teleport.go',
                    sizeKb: 320,
                    type: 'file',
                },
                {
                    name: 'test.go',
                    sizeKb: 3320,
                    type: 'file',
                },
            ],
        },
        {
            name: 'README.md',
            sizeKb: 4340,
            type: 'file',
        },
    ],
};

export const findFolder = (path: string) => {
    const pathParts = path.split('/').filter(Boolean);

    let currentFolder: Folder = root;

    for (const name of pathParts) {
        const foundItem = currentFolder.items.find(
            (item) => item.name === name
        );

        // no item found
        if (!foundItem) return null;

        // found file
        if (!('items' in foundItem)) return null;

        currentFolder = foundItem;
    }

    return currentFolder;
};
