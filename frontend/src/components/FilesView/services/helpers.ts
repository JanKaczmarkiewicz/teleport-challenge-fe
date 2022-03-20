import { useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import routes from '../../../routes';
import { Location, Folder } from './types';

const root: Location = {
    name: 'teleport',
    sizeKb: 0,
    type: 'dir',
    items: [
        {
            name: 'index.js',
            sizeKb: 2333,
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
            sizeKb: 4340,
            type: 'file',
        },
    ],
};

const fetchFolder = async (directoryParts: string[]) => {
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

export const useCurrentDirectory = () => {
    const directory = useParams<'*'>()['*'] || '';

    const directoryParts = useMemo(
        () => directory.split('/').filter(Boolean),
        [directory]
    );

    const [data, setData] = useState<Folder | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchFolder(directoryParts).then((folder) => {
            setData(folder);
            setIsLoading(false);
        });
    }, [directoryParts]);

    return {
        isLoading,
        directory: {
            data,
            directoryParts,
        },
    };
};

export const generateFolderPath = (parts: string[] = ['']) =>
    generatePath(routes.folder, {
        '*': parts.join('/'),
    });

export const getBreadcumbs = (paths: string[]) => {
    const breadcrumbs = [
        {
            label: 'My folder',
            to: generateFolderPath(),
        },
    ];

    for (const [index, label] of paths.entries())
        breadcrumbs.push({
            label,
            to: generateFolderPath(paths.slice(0, index + 1)),
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
