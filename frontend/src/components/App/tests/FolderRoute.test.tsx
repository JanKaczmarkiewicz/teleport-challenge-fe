import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import baseSetup, { login } from './setup';

const setup = async () => {
    baseSetup({ at: generateFolderPath() });
    login();
    expect(await screen.findByText('My folder')).toBeVisible();
};

test('should navigate between folders', async () => {
    await setup();

    userEvent.click(screen.getByText('nested'));

    expect(await screen.findByText('fileInNestedFolder.rs')).toBeVisible();

    userEvent.click(screen.getByText('My folder'));

    expect(await screen.findByText('nested')).toBeVisible();
});

test('should display formatted size', async () => {
    await setup();

    expect(screen.getByText('500 B')).toBeVisible();
    expect(screen.getByText('320 kB')).toBeVisible();
    expect(screen.getByText('3.2 MB')).toBeVisible();
});

test('should sort by name ascending', async () => {
    await setup();

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(within(first).getByText('nested')).toBeVisible();
    expect(within(second).getByText('large.rs')).toBeVisible();
    expect(within(third).getByText('medium.rs')).toBeVisible();
});

test('should sort by name descending', async () => {
    await setup();

    userEvent.click(screen.getByRole('button', { name: 'Name' }));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(within(first).getByText('nested')).toBeVisible();
    expect(within(second).getByText('small.rs')).toBeVisible();
    expect(within(third).getByText('medium.rs')).toBeVisible();
});

test('should sort by size ascending', async () => {
    await setup();

    userEvent.click(screen.getByRole('button', { name: 'Size' }));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(within(first).getByText('-')).toBeVisible();
    expect(within(second).getByText('500 B')).toBeVisible();
    expect(within(third).getByText('320 kB')).toBeVisible();
});

test('should order by size descending', async () => {
    await setup();

    userEvent.click(screen.getByRole('button', { name: 'Size' }));
    userEvent.click(screen.getByRole('button', { name: 'Size' }));

    const [first, second, third] = screen.getAllByRole('listitem');

    expect(within(first).getByText('-')).toBeVisible();
    expect(within(second).getByText('3.2 MB')).toBeVisible();
    expect(within(third).getByText('320 kB')).toBeVisible();
});
