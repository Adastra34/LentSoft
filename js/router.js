/**
 * LENTSOFT - Router JavaScript Vanilla
 * Sistema de enrutamiento SPA simple
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        
        // Listen to popstate events (browser back/forward)
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });
    }

    /**
     * Define a route
     * @param {string} path - Route path
     * @param {Function} handler - Function to execute when route is matched
     */
    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    /**
     * Navigate to a route
     * @param {string} path - Route path
     */
    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute(path);
    }

    /**
     * Load and execute route handler
     * @param {string} path - Route path
     */
    async loadRoute(path) {
        this.currentRoute = path;

        // Find matching route
        const handler = this.routes[path] || this.routes['/404'];

        if (handler) {
            try {
                await handler();
            } catch (error) {
                console.error('Error loading route:', error);
                this.loadRoute('/404');
            }
        } else {
            this.loadRoute('/404');
        }
    }

    /**
     * Initialize router with default route
     */
    init() {
        const path = window.location.pathname === '/' ? '/inicio' : window.location.pathname;
        this.loadRoute(path);
    }
}

// Create global router instance
const router = new Router();

/**
 * Load HTML content from Views folder
 * @param {string} viewName - Name of the view file (without .html)
 * @returns {Promise<string>} HTML content
 */
async function loadView(viewName) {
    try {
        const response = await fetch(`Views/${viewName}.html`);
        if (!response.ok) {
            throw new Error(`View not found: ${viewName}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading view ${viewName}:`, error);
        return '<div class="container"><h1>Error</h1><p>No se pudo cargar la página.</p></div>';
    }
}

/**
 * Render content in the app container
 * @param {string} html - HTML content to render
 */
function renderApp(html) {
    const app = document.getElementById('app');
    app.innerHTML = html;
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isAuthenticated() {
    return localStorage.getItem('lentsoft_user') !== null;
}

/**
 * Get current user data
 * @returns {Object|null}
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('lentsoft_user');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Require authentication for a route
 * @param {Function} handler - Route handler
 * @returns {Function}
 */
function requireAuth(handler) {
    return async () => {
        if (!isAuthenticated()) {
            router.navigate('/login');
            return;
        }
        await handler();
    };
}

/**
 * Require admin role for a route
 * @param {Function} handler - Route handler
 * @returns {Function}
 */
function requireAdmin(handler) {
    return async () => {
        const user = getCurrentUser();
        if (!user || user.role !== 'admin') {
            router.navigate('/');
            return;
        }
        await handler();
    };
}
