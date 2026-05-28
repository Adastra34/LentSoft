/**
 * LENTSOFT - Gestión de Autenticación
 * Sistema de autenticación con LocalStorage
 */

const AuthService = {
    /**
     * Iniciar sesión
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>} User object or null
     */
    async login(email, password) {
        // Simulación de usuarios (en producción esto sería una llamada a API)
        const users = [
            {
                id: 1,
                nombre: 'Administrador',
                email: 'admin@lentsoft.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                id: 2,
                nombre: 'Usuario Demo',
                email: 'user@lentsoft.com',
                password: 'user123',
                role: 'usuario'
            }
        ];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Remove password from stored data
            const { password, ...userData } = user;
            localStorage.setItem('lentsoft_user', JSON.stringify(userData));
            localStorage.setItem('lentsoft_token', 'fake-jwt-token-' + Date.now());
            return userData;
        }

        return null;
    },

    /**
     * Registrar nuevo usuario
     * @param {Object} userData
     * @returns {Promise<Object>} User object or null
     */
    async register(userData) {
        // Simulación de registro (en producción esto sería una llamada a API)
        const newUser = {
            id: Date.now(),
            nombre: userData.nombre,
            email: userData.email,
            role: 'usuario'
        };

        localStorage.setItem('lentsoft_user', JSON.stringify(newUser));
        localStorage.setItem('lentsoft_token', 'fake-jwt-token-' + Date.now());
        
        return newUser;
    },

    /**
     * Cerrar sesión
     */
    logout() {
        localStorage.removeItem('lentsoft_user');
        localStorage.removeItem('lentsoft_token');
        router.navigate('/login');
    },

    /**
     * Obtener usuario actual
     * @returns {Object|null}
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('lentsoft_user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Verificar si está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        return localStorage.getItem('lentsoft_user') !== null;
    },

    /**
     * Verificar si es administrador
     * @returns {boolean}
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
};

/**
 * Renderizar navegación basada en estado de autenticación
 */
function renderNavbar() {
    const navbar = document.getElementById('navbar');
    const user = AuthService.getCurrentUser();

    if (user) {
        navbar.innerHTML = `
            <div class="container">
                <a href="#" onclick="router.navigate('/inicio'); return false;" class="navbar-brand">
                    LentSoft
                </a>
                <ul class="navbar-nav">
                    <li><a href="#" onclick="router.navigate('/inicio'); return false;" class="navbar-link">Inicio</a></li>
                    <li><a href="#" onclick="router.navigate('/tienda'); return false;" class="navbar-link">Tienda</a></li>
                    ${user.role === 'admin' 
                        ? '<li><a href="#" onclick="router.navigate(\'/dashboard-admin\'); return false;" class="navbar-link">Dashboard Admin</a></li>'
                        : '<li><a href="#" onclick="router.navigate(\'/dashboard\'); return false;" class="navbar-link">Mi Cuenta</a></li>'
                    }
                    <li><a href="#" onclick="router.navigate('/nosotros'); return false;" class="navbar-link">Nosotros</a></li>
                    <li>
                        <span class="navbar-link" style="cursor: default;">Hola, ${user.nombre}</span>
                    </li>
                    <li>
                        <button onclick="AuthService.logout()" class="btn btn-outline" style="padding: 0.5rem 1rem;">
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        `;
    } else {
        navbar.innerHTML = `
            <div class="container">
                <a href="#" onclick="router.navigate('/inicio'); return false;" class="navbar-brand">
                    LentSoft
                </a>
                <ul class="navbar-nav">
                    <li><a href="#" onclick="router.navigate('/inicio'); return false;" class="navbar-link">Inicio</a></li>
                    <li><a href="#" onclick="router.navigate('/tienda'); return false;" class="navbar-link">Tienda</a></li>
                    <li><a href="#" onclick="router.navigate('/nosotros'); return false;" class="navbar-link">Nosotros</a></li>
                    <li><a href="#" onclick="router.navigate('/login'); return false;" class="navbar-link">Iniciar Sesión</a></li>
                    <li>
                        <button onclick="router.navigate('/registro')" class="btn btn-primary" style="padding: 0.5rem 1rem;">
                            Registrarse
                        </button>
                    </li>
                </ul>
            </div>
        `;
    }
}

/**
 * Renderizar footer
 */
function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="container" style="padding: 3rem 0; text-align: center; border-top: 2px solid var(--purple-200);">
            <p style="color: var(--purple-700); font-weight: 600;">
                &copy; ${new Date().getFullYear()} LentSoft. Todos los derechos reservados.
            </p>
            <p style="color: var(--gray-600); margin-top: 0.5rem;">
                Plataforma E-commerce Óptico
            </p>
        </div>
    `;
}
