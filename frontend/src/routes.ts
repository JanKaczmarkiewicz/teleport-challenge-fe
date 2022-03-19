const routes = {
    root: '/' as const,
    notFound: '/not-found' as const,
    folder: '/folder/*' as const,
    login: `/login?redirected_from=` as const,
};

export default routes;
