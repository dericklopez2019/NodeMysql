import express from "express";
import cors from "cors";
import {pool} from './db.js';
import {PORT} from './config.js';

const app = express();
app.use(cors());
app.get('/',(req, res) => {
    res.send('Bienvenido al Server')
})

// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
    try {
      const [result] = await pool.promise().query('SELECT * FROM Clientes');
      res.send(result[0]);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  });

// Crear un nuevo cliente
app.post('/clientes', async (req, res) => {
    try {
        const { body } = req;
        const query = `
            INSERT INTO Clientes (Apellidos, Nombres, Direccion, Nit, TieneCredito, LimiteCredito, Telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const result = await pool.promise().query(query, [
            body.Apellidos,
            body.Nombres,
            body.Direccion,
            body.Nit,
            body.TieneCredito,
            body.LimiteCredito,
            body.Telefono
        ]);
        res.json({ message: 'Cliente creado exitosamente', insertedId: result[0].insertId });
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

// Actualizar un cliente por código
app.put('/clientes/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const { body } = req;
        const query = `
            UPDATE Clientes
            SET
                Apellidos = ?,
                Nombres = ?,
                Direccion = ?,
                Nit = ?,
                TieneCredito = ?,
                LimiteCredito = ?,
                Telefono = ?
            WHERE Codigo = ?;
        `;
        const result = await pool.promise().query(query, [
            body.Apellidos,
            body.Nombres,
            body.Direccion,
            body.Nit,
            body.TieneCredito,
            body.LimiteCredito,
            body.Telefono,
            codigo
        ]);
        res.json({ message: 'Cliente actualizado exitosamente', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
});

// Eliminar un cliente por código
app.delete('/clientes/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const query = 'DELETE FROM Clientes WHERE Codigo = ?';
        const result = await pool.promise().query(query, [codigo]);
        res.json({ message: 'Cliente eliminado exitosamente', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
});


// Obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT * FROM Productos');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto
app.post('/productos', async (req, res) => {
    try {
        const { body } = req;
        const query = `
            INSERT INTO Productos (Nombre, PrecioCosto, Fletes, Categoria, Iva, PrecioVenta, Existencias)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const result = await pool.promise().query(query, [
            body.Nombre,
            body.PrecioCosto,
            body.Fletes,
            body.Categoria,
            body.Iva,
            body.PrecioVenta,
            body.Existencias
        ]);
        res.json({ message: 'Producto creado exitosamente', insertedId: result[0].insertId });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Actualizar un producto por código
app.put('/productos/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const { body } = req;
        const query = `
            UPDATE Productos
            SET
                Nombre = ?,
                PrecioCosto = ?,
                Fletes = ?,
                Categoria = ?,
                Iva = ?,
                PrecioVenta = ?,
                Existencias = ?
            WHERE Codigo = ?;
        `;
        const result = await pool.promise().query(query, [
            body.Nombre,
            body.PrecioCosto,
            body.Fletes,
            body.Categoria,
            body.Iva,
            body.PrecioVenta,
            body.Existencias,
            codigo
        ]);
        res.json({ message: 'Producto actualizado exitosamente', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar un producto por código
app.delete('/productos/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const query = 'DELETE FROM Productos WHERE Codigo = ?';
        const result = await pool.promise().query(query, [codigo]);
        res.json({ message: 'Producto eliminado exitosamente', affectedRows: result[0].affectedRows });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

