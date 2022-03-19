import { Location } from './types';

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

export const findLocation = (path: string) => {
    const pathParts = path.split('/').filter(Boolean);

    let currentLocation: Location = root;

    for (const name of pathParts) {
        if ('items' in currentLocation) {
            const foundLocation = currentLocation.items.find(
                (location) => location.name === name
            ) as Location; //TODO: inspect type

            if (!foundLocation) return null;

            currentLocation = foundLocation;
        }

        if (currentLocation.name != name) return null;
    }

    return currentLocation;
};
