import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup from './setup';

test('should navigate between folders', async () => {
    setup({ at: generateFolderPath() });

    // click on folder
    userEvent.click(screen.getByText('nested'));

    // expect to be redirected to folder
    expect(screen.getByText('foo')).toBeInTheDocument();

    // click on breadcrumb to return
    userEvent.click(screen.getByText('My folder'));

    expect(screen.getByText('nested')).toBeInTheDocument();
});

test('should display formatted size', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    expect(screen.getByText('500 B')).toBeInTheDocument();
    expect(screen.getByText('320 kB')).toBeInTheDocument();
    expect(screen.getByText('3.32 MB')).toBeInTheDocument();
});

test('should sort by name ascending', async () => {
    setup({ at: generateFolderPath() });

    const [first, second] = screen.getAllByRole('listitem');

    expect(within(first).getByText('css')).toBeInTheDocument();
    expect(within(second).getByText('favorites')).toBeInTheDocument();
});

test('should sort by name descending', async () => {
    setup({ at: generateFolderPath() });

    userEvent.click(screen.getByText('Name'));

    const [first, second] = screen.getAllByRole('listitem');

    expect(within(first).getByText('nested')).toBeInTheDocument();
    expect(within(second).getByText('music')).toBeInTheDocument();
});

test('should sort by size ascending', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    userEvent.click(screen.getByText('Size'));

    const [first, second] = screen.getAllByRole('listitem');

    expect(within(first).getByText('500 B')).toBeInTheDocument();
    expect(within(second).getByText('320 kB')).toBeInTheDocument();
});

test('should order by size descending', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    userEvent.click(screen.getByText('Size'));
    userEvent.click(screen.getByText('Size'));

    const [first, second] = screen.getAllByRole('listitem');

    expect(within(first).getByText('3.32 MB')).toBeInTheDocument();
    expect(within(second).getByText('320 kB')).toBeInTheDocument();
});
