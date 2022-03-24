import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../../request';
import routes, { generateFolderPath } from '../../../routes';
import { FolderData } from './types';

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

export const useCurrentFolderPath = () =>
    useParams<typeof routes.any>()['*'] || '';

export const useFolderData = () => {
    const folderPath = useCurrentFolderPath();
    const [data, setData] = useState<'loading' | 'error' | FolderData>(
        'loading'
    );

    useEffect(() => {
        setData('loading');
        request(`/folder${folderPath}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(setData)
            .catch(() => {
                setData('error');
            });
    }, [folderPath]);

    return data;
};

export const parseFolderPath = (path: string) =>
    path.split('/').filter(Boolean);
