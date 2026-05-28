/**
 * CONTROLADOR: UserController
 * Maneja la lógica de gestión de usuarios
 */

const UserController = {
    /**
     * Obtener todos los usuarios
     * @returns {Promise<Array>}
     */
    async getAll() {
        try {
            const usersData = localStorage.getItem('lentsoft_all_users');
            return usersData ? JSON.parse(usersData) : this.getMockUsers();
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            return [];
        }
    },

    /**
     * Obtener un usuario por ID
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        try {
            const users = await this.getAll();
            return users.find(u => u.id === id) || null;
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            return null;
        }
    },

    /**
     * Actualizar usuario existente
     * @param {number} id
     * @param {Object} userData
     * @returns {Promise<Object|null>}
     */
    async update(id, userData) {
        try {
            const users = await this.getAll();
            const index = users.findIndex(u => u.id === id);
            
            if (index === -1) {
                throw new Error('Usuario no encontrado');
            }

            const updatedUser = new User({ ...users[index], ...userData });
            const validation = updatedUser.validate();
            
            if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
            }

            users[index] = updatedUser.toJSON();
            localStorage.setItem('lentsoft_all_users', JSON.stringify(users));
            
            // Actualizar usuario actual si es el mismo
            const currentUser = AuthService.getCurrentUser();
            if (currentUser && currentUser.id === id) {
                localStorage.setItem('lentsoft_user', JSON.stringify(users[index]));
            }
            
            return users[index];
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            return null;
        }
    },

    /**
     * Eliminar usuario
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        try {
            const users = await this.getAll();
            const filtered = users.filter(u => u.id !== id);
            
            localStorage.setItem('lentsoft_all_users', JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            return false;
        }
    },

    /**
     * Obtener usuarios mock (datos de ejemplo)
     * @returns {Array}
     */
    getMockUsers() {
        return [
            {
                id: 1,
                nombre: 'Administrador',
                email: 'admin@lentsoft.com',
                telefono: '300 123 4567',
                role: 'admin',
                fechaRegistro: '2026-01-01T00:00:00.000Z'
            },
            {
                id: 2,
                nombre: 'Usuario Demo',
                email: 'user@lentsoft.com',
                telefono: '310 987 6543',
                role: 'usuario',
                fechaRegistro: '2026-01-01T00:00:00.000Z'
            },
            {
                id: 3,
                nombre: 'Juan Pérez',
                email: 'juan@example.com',
                telefono: '320 456 7890',
                role: 'usuario',
                fechaRegistro: '2026-02-15T10:30:00.000Z'
            },
            {
                id: 4,
                nombre: 'María García',
                email: 'maria@example.com',
                telefono: '315 234 5678',
                role: 'usuario',
                fechaRegistro: '2026-03-20T14:15:00.000Z'
            }
        ];
    }
};
