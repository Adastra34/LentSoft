/**
 * CONTROLADOR: OrderController
 * Maneja la lógica de gestión de pedidos/ventas
 */

const OrderController = {
    /**
     * Obtener todos los pedidos
     * @param {number} userId - Opcional, filtrar por usuario
     * @returns {Promise<Array>}
     */
    async getAll(userId = null) {
        try {
            const ordersData = localStorage.getItem('lentsoft_orders');
            let orders = ordersData ? JSON.parse(ordersData) : this.getMockOrders();
            
            if (userId) {
                orders = orders.filter(o => o.userId === userId);
            }
            
            return orders;
        } catch (error) {
            console.error('Error obteniendo pedidos:', error);
            return [];
        }
    },

    /**
     * Obtener un pedido por ID
     * @param {string} id
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        try {
            const orders = await this.getAll();
            return orders.find(o => o.id === id) || null;
        } catch (error) {
            console.error('Error obteniendo pedido:', error);
            return null;
        }
    },

    /**
     * Crear nuevo pedido
     * @param {Object} orderData
     * @returns {Promise<Object|null>}
     */
    async create(orderData) {
        try {
            const order = new Order(orderData);
            const validation = order.validate();
            
            if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
            }

            const orders = await this.getAll();
            order.id = 'V-' + Date.now();
            orders.push(order.toJSON());
            
            localStorage.setItem('lentsoft_orders', JSON.stringify(orders));
            return order.toJSON();
        } catch (error) {
            console.error('Error creando pedido:', error);
            return null;
        }
    },

    /**
     * Actualizar pedido existente
     * @param {string} id
     * @param {Object} orderData
     * @returns {Promise<Object|null>}
     */
    async update(id, orderData) {
        try {
            const orders = await this.getAll();
            const index = orders.findIndex(o => o.id === id);
            
            if (index === -1) {
                throw new Error('Pedido no encontrado');
            }

            orders[index] = { ...orders[index], ...orderData };
            localStorage.setItem('lentsoft_orders', JSON.stringify(orders));
            
            return orders[index];
        } catch (error) {
            console.error('Error actualizando pedido:', error);
            return null;
        }
    },

    /**
     * Eliminar pedido
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        try {
            const orders = await this.getAll();
            const filtered = orders.filter(o => o.id !== id);
            
            localStorage.setItem('lentsoft_orders', JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error eliminando pedido:', error);
            return false;
        }
    },

    /**
     * Obtener pedidos mock (datos de ejemplo)
     * @returns {Array}
     */
    getMockOrders() {
        return [
            {
                id: 'V-001',
                userId: 2,
                items: [
                    { productId: 1, nombre: 'Ray-Ban Aviator', cantidad: 1, precioUnitario: 2500, subtotal: 2500 }
                ],
                subtotal: 2500,
                descuento: 0,
                iva: 475,
                total: 2975,
                estado: 'completado',
                metodoPago: 'Tarjeta',
                direccionEnvio: 'Calle 123 #45-67',
                fecha: '2026-05-20T10:00:00.000Z'
            },
            {
                id: 'V-002',
                userId: 2,
                items: [
                    { productId: 2, nombre: 'Oakley Sport', cantidad: 1, precioUnitario: 1800, subtotal: 1800 }
                ],
                subtotal: 1800,
                descuento: 0,
                iva: 342,
                total: 2142,
                estado: 'pendiente',
                metodoPago: 'Efectivo',
                direccionEnvio: 'Calle 123 #45-67',
                fecha: '2026-05-21T14:30:00.000Z'
            }
        ];
    }
};
