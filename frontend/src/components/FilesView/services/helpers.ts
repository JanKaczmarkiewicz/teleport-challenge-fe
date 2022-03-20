import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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
