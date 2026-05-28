/**
 * MODELO: Product
 * Gestión de datos de productos
 */

class Product {
    constructor(data) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.descripcion = data.descripcion || '';
        this.precio = data.precio || 0;
        this.precioDescuento = data.precioDescuento || null;
        this.categoria = data.categoria || '';
        this.marca = data.marca || '';
        this.stock = data.stock || 0;
        this.imagenUrl = data.imagenUrl || '';
        this.activo = data.activo !== undefined ? data.activo : true;
    }

    /**
     * Calcular porcentaje de descuento
     * @returns {number}
     */
    getDiscountPercentage() {
        if (!this.precioDescuento || this.precioDescuento >= this.precio) {
            return 0;
        }
        return Math.round(((this.precio - this.precioDescuento) / this.precio) * 100);
    }

    /**
     * Obtener precio final (con descuento si aplica)
     * @returns {number}
     */
    getFinalPrice() {
        return this.precioDescuento && this.precioDescuento < this.precio 
            ? this.precioDescuento 
            : this.precio;
    }

    /**
     * Verificar si hay stock disponible
     * @param {number} quantity
     * @returns {boolean}
     */
    hasStock(quantity = 1) {
        return this.stock >= quantity;
    }

    /**
     * Validar datos del producto
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.nombre || this.nombre.length < 3) {
            errors.push('El nombre debe tener al menos 3 caracteres');
        }

        if (this.precio < 0) {
            errors.push('El precio no puede ser negativo');
        }

        if (this.stock < 0) {
            errors.push('El stock no puede ser negativo');
        }

        if (this.precioDescuento && this.precioDescuento >= this.precio) {
            errors.push('El precio de descuento debe ser menor al precio regular');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Convertir a objeto plano
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            precioDescuento: this.precioDescuento,
            categoria: this.categoria,
            marca: this.marca,
            stock: this.stock,
            imagenUrl: this.imagenUrl,
            activo: this.activo
        };
    }
}
