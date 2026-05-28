/**
 * MODELO: Order
 * Gestión de datos de pedidos
 */

class Order {
    constructor(data) {
        this.id = data.id || null;
        this.userId = data.userId || null;
        this.items = data.items || [];
        this.subtotal = data.subtotal || 0;
        this.descuento = data.descuento || 0;
        this.iva = data.iva || 0;
        this.total = data.total || 0;
        this.estado = data.estado || 'pendiente';
        this.metodoPago = data.metodoPago || '';
        this.direccionEnvio = data.direccionEnvio || '';
        this.fecha = data.fecha || new Date().toISOString();
    }

    /**
     * Agregar item al pedido
     * @param {Object} item - { productId, nombre, cantidad, precioUnitario }
     */
    addItem(item) {
        const existingItem = this.items.find(i => i.productId === item.productId);
        
        if (existingItem) {
            existingItem.cantidad += item.cantidad;
            existingItem.subtotal = existingItem.cantidad * existingItem.precioUnitario;
        } else {
            this.items.push({
                ...item,
                subtotal: item.cantidad * item.precioUnitario
            });
        }
        
        this.calculateTotals();
    }

    /**
     * Remover item del pedido
     * @param {number} productId
     */
    removeItem(productId) {
        this.items = this.items.filter(i => i.productId !== productId);
        this.calculateTotals();
    }

    /**
     * Calcular totales del pedido
     */
    calculateTotals() {
        // Calcular subtotal
        this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
        
        // Calcular descuento (porcentaje del subtotal)
        const descuentoMonto = (this.subtotal * this.descuento) / 100;
        
        // Base imponible (subtotal - descuento)
        const baseImponible = this.subtotal - descuentoMonto;
        
        // Calcular IVA (19% de la base imponible)
        this.iva = baseImponible * 0.19;
        
        // Calcular total
        this.total = baseImponible + this.iva;
    }

    /**
     * Aplicar descuento (en porcentaje)
     * @param {number} porcentaje
     */
    applyDiscount(porcentaje) {
        this.descuento = Math.max(0, Math.min(100, porcentaje));
        this.calculateTotals();
    }

    /**
     * Validar pedido
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.userId) {
            errors.push('El pedido debe estar asociado a un usuario');
        }

        if (this.items.length === 0) {
            errors.push('El pedido debe tener al menos un producto');
        }

        if (!this.metodoPago) {
            errors.push('Debe seleccionar un método de pago');
        }

        if (this.total < 0) {
            errors.push('El total del pedido no puede ser negativo');
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
            userId: this.userId,
            items: this.items,
            subtotal: this.subtotal,
            descuento: this.descuento,
            iva: this.iva,
            total: this.total,
            estado: this.estado,
            metodoPago: this.metodoPago,
            direccionEnvio: this.direccionEnvio,
            fecha: this.fecha
        };
    }
}
