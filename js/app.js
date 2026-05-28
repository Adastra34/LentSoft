/**
 * LENTSOFT - Aplicación Principal
 * Inicialización y configuración de rutas
 */

// Define all routes
router.addRoute('/inicio', async () => {
    const html = await loadView('home');
    renderApp(html);
    renderNavbar();
    renderFooter();
});

router.addRoute('/tienda', async () => {
    const html = await loadView('tienda');
    renderApp(html);
    renderNavbar();
    renderFooter();
});

router.addRoute('/nosotros', async () => {
    const html = await loadView('nosotros');
    renderApp(html);
    renderNavbar();
    renderFooter();
});

router.addRoute('/login', async () => {
    if (AuthService.isAuthenticated()) {
        router.navigate('/inicio');
        return;
    }
    const html = await loadView('login');
    renderApp(html);
    renderNavbar();
    renderFooter();
});

router.addRoute('/registro', async () => {
    if (AuthService.isAuthenticated()) {
        router.navigate('/inicio');
        return;
    }
    const html = await loadView('registro');
    renderApp(html);
    renderNavbar();
    renderFooter();
});

router.addRoute('/dashboard', requireAuth(async () => {
    const html = await loadView('dashboard-usuario');
    renderApp(html);
    renderNavbar();
    renderFooter();
}));

router.addRoute('/dashboard-admin', requireAuth(requireAdmin(async () => {
    const html = await loadView('dashboard-admin');
    renderApp(html);
    renderNavbar();
    renderFooter();
})));

router.addRoute('/404', async () => {
    renderApp(`
        <div class="container text-center" style="padding: 4rem 0;">
            <h1 style="color: var(--purple-700); font-size: 4rem;">404</h1>
            <h2>Página no encontrada</h2>
            <p style="margin: 2rem 0;">Lo sentimos, la página que buscas no existe.</p>
            <button onclick="router.navigate('/inicio')" class="btn btn-primary">
                Volver al Inicio
            </button>
        </div>
    `);
    renderNavbar();
    renderFooter();
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    renderNavbar();
    renderFooter();
});
