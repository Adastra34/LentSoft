/**
 * CONTROLADOR: AuthController
 * Maneja la lógica de autenticación y autorización
 */

const AuthController = {
    /**
     * Procesar login de usuario
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>} User data or null
     */
    async login(credentials) {
        try {
            const user = await AuthService.login(credentials.email, credentials.password);
            return user;
        } catch (error) {
            console.error('Error en login:', error);
            return null;
        }
    },

    /**
     * Procesar registro de nuevo usuario
     * @param {Object} userData - { nombre, email, telefono, password }
     * @returns {Promise<Object>} User data or null
     */
    async register(userData) {
        try {
            // Validar datos usando el modelo User
            const user = new User(userData);
            const validation = user.validate();
            
            if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
            }

            const registeredUser = await AuthService.register(userData);
            return registeredUser;
        } catch (error) {
            console.error('Error en registro:', error);
            return null;
        }
    },

    /**
     * Cerrar sesión
     */
    logout() {
        AuthService.logout();
    },

    /**
     * Obtener usuario actual
     * @returns {Object|null}
     */
    getCurrentUser() {
        return AuthService.getCurrentUser();
    },

    /**
     * Verificar si está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        return AuthService.isAuthenticated();
    },

    /**
     * Verificar si es administrador
     * @returns {boolean}
     */
    isAdmin() {
        return AuthService.isAdmin();
    }
};
