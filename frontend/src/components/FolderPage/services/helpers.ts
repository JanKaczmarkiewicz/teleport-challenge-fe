import { generateFolderPath } from '../../../routes';
import { Location, Folder } from './types';

const root: Location = {
    name: 'root',
    sizeKb: 0,
    type: 'dir',
    items: [
        {
            name: 'index.js',
            sizeKb: 2333,
            type: 'file',
        },
        {
            name: 'lorem-ipsum-dolor-sit-amet.js',
            sizeKb: 23,
            type: 'file',
        },
        {
            name: 'nested',
            sizeKb: 0,
            type: 'dir',
            items: [
                {
                    name: 'foo',
                    sizeKb: 0,
                    type: 'dir',
                    items: [
                        {
                            name: 'bar',
                            sizeKb: 0,
                            type: 'dir',
                            items: [
                                {
                                    name: 'main.js',
                                    sizeKb: 0.5,
                                    type: 'file',
                                },
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
                            name: 'test.go',
                            sizeKb: 3320,
                            type: 'file',
                        },
                    ],
                },
            ],
        },
        {
            name: 'favorites',
            sizeKb: 0,
            type: 'dir',
            items: [],
        },
        {
            name: 'music',
            sizeKb: 0,
            type: 'dir',
            items: [],
        },
        {
            name: 'css',
            sizeKb: 0,
            type: 'dir',
            items: [],
        },
        {
            name: 'db',
            sizeKb: 12476236523,
            type: 'file',
        },

        {
            name: 'README.md',
            sizeKb: 0,
            type: 'file',
        },
    ],
};

export const getFolder = (directoryParts: string[]) => {
    let currentFolder: Folder = root;

    for (const name of directoryParts) {
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

export const getBreadcrumbs = (paths: string[]) => {
    const breadcrumbs = [
        {
            label: 'My folder',
            to: generateFolderPath(),
        },
    ];

    for (const [index, label] of paths.entries())
        breadcrumbs.push({
            label,
            to: generateFolderPath(...paths.slice(0, index + 1)),
        });

    return breadcrumbs;
};

export const by =
    <T extends Record<string, unknown>>(property: keyof T) =>
    (left: T, right: T) => {
        if (left[property] < right[property]) return -1;
        if (left[property] > right[property]) return 1;
        return 0;
    };

export const formatSize = (sizeKb: number) => {
    const SCALE = 1000;
    const sizeBytes = sizeKb * SCALE;
    const i =
        sizeBytes === 0 ? 0 : Math.floor(Math.log(sizeBytes) / Math.log(SCALE));
    const unit = ['B', 'kB', 'MB', 'GB', 'TB'][i];
    const value = Number.parseFloat(
        (sizeBytes / Math.pow(SCALE, i)).toFixed(2)
    );

    return `${value} ${unit}`;
};
