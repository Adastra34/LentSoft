/**
 * MODELO: User
 * Gestión de datos de usuarios
 */

class User {
    constructor(data) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.email = data.email || '';
        this.telefono = data.telefono || '';
        this.role = data.role || 'usuario';
        this.fechaRegistro = data.fechaRegistro || new Date().toISOString();
    }

    /**
     * Validar datos del usuario
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.nombre || this.nombre.length < 3) {
            errors.push('El nombre debe tener al menos 3 caracteres');
        }

        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('El email no es válido');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validar formato de email
     * @param {string} email
     * @returns {boolean}
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Convertir a objeto plano
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            role: this.role,
            fechaRegistro: this.fechaRegistro
        };
    }
}
