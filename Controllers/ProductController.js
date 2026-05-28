/**
 * CONTROLADOR: ProductController
 * Maneja la lógica de gestión de productos
 */

const ProductController = {
    /**
     * Obtener todos los productos
     * @returns {Promise<Array>}
     */
    async getAll() {
        try {
            // En producción, esto haría una llamada a la API
            // Por ahora, retornamos datos mock desde localStorage o hardcodeados
            const productsData = localStorage.getItem('lentsoft_products');
            
            if (productsData) {
                return JSON.parse(productsData);
            }
            
            // Datos por defecto
            return this.getMockProducts();
        } catch (error) {
            console.error('Error obteniendo productos:', error);
            return [];
        }
    },

    /**
     * Obtener un producto por ID
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        try {
            const products = await this.getAll();
            return products.find(p => p.id === id) || null;
        } catch (error) {
            console.error('Error obteniendo producto:', error);
            return null;
        }
    },

    /**
     * Crear nuevo producto
     * @param {Object} productData
     * @returns {Promise<Object|null>}
     */
    async create(productData) {
        try {
            const product = new Product(productData);
            const validation = product.validate();
            
            if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
            }

            const products = await this.getAll();
            product.id = Date.now();
            products.push(product.toJSON());
            
            localStorage.setItem('lentsoft_products', JSON.stringify(products));
            return product.toJSON();
        } catch (error) {
            console.error('Error creando producto:', error);
            return null;
        }
    },

    /**
     * Actualizar producto existente
     * @param {number} id
     * @param {Object} productData
     * @returns {Promise<Object|null>}
     */
    async update(id, productData) {
        try {
            const products = await this.getAll();
            const index = products.findIndex(p => p.id === id);
            
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }

            const updatedProduct = new Product({ ...products[index], ...productData });
            const validation = updatedProduct.validate();
            
            if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
            }

            products[index] = updatedProduct.toJSON();
            localStorage.setItem('lentsoft_products', JSON.stringify(products));
            
            return products[index];
        } catch (error) {
            console.error('Error actualizando producto:', error);
            return null;
        }
    },

    /**
     * Eliminar producto
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        try {
            const products = await this.getAll();
            const filtered = products.filter(p => p.id !== id);
            
            localStorage.setItem('lentsoft_products', JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error eliminando producto:', error);
            return false;
        }
    },

    /**
     * Obtener productos mock (datos de ejemplo)
     * @returns {Array}
     */
    getMockProducts() {
        return [
            {
                id: 1,
                nombre: 'Ray-Ban Aviator',
                descripcion: 'Lentes de sol clásicos estilo aviador',
                precio: 2500,
                precioDescuento: null,
                categoria: 'lentes-sol',
                marca: 'Ray-Ban',
                stock: 15,
                imagenUrl: '',
                activo: true
            },
            {
                id: 2,
                nombre: 'Oakley Sport',
                descripcion: 'Lentes deportivos de alta gama',
                precio: 1800,
                precioDescuento: null,
                categoria: 'lentes-sol',
                marca: 'Oakley',
                stock: 8,
                imagenUrl: '',
                activo: true
            },
            {
                id: 3,
                nombre: 'Lentes Graduados Classic',
                descripcion: 'Lentes graduados con diseño clásico',
                precio: 1200,
                precioDescuento: null,
                categoria: 'lentes-graduados',
                marca: 'LentSoft',
                stock: 20,
                imagenUrl: '',
                activo: true
            },
            {
                id: 4,
                nombre: 'Lentes de Contacto Acuvue',
                descripcion: 'Lentes de contacto mensuales',
                precio: 450,
                precioDescuento: 399,
                categoria: 'lentes-contacto',
                marca: 'Acuvue',
                stock: 50,
                imagenUrl: '',
                activo: true
            },
            {
                id: 5,
                nombre: 'Montura Deportiva',
                descripcion: 'Montura ultraligera para deportes',
                precio: 900,
                precioDescuento: null,
                categoria: 'monturas',
                marca: 'LentSoft',
                stock: 12,
                imagenUrl: '',
                activo: true
            },
            {
                id: 6,
                nombre: 'Estuche Premium',
                descripcion: 'Estuche rígido para protección',
                precio: 150,
                precioDescuento: 99,
                categoria: 'accesorios',
                marca: 'LentSoft',
                stock: 30,
                imagenUrl: '',
                activo: true
            }
        ];
    }
};
