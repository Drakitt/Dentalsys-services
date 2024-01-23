const faker = require('faker');
const connection = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dbConfig = require('../keys');
class PersonasServices {

  constructor() {
    this.personas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM usuario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  findByUsername = (name, result) => {
    const query = 'SELECT * FROM usuario WHERE nombre_usuario LIKE ?';
    const searchTerm = `%${name}%`;

    connection.query(query, [searchTerm], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  generateRefreshToken = (usuario) => {

    return jwt.sign({ id: usuario.id_usuario || usuario.id, nombre: usuario.nombre_usuario || usuario.nombre, id_rol: usuario.rol_id || usuario.id_rol }, dbConfig.KEY, { expiresIn: '7d' });
  };
  login = (username, password, result) => {
    const query = 'SELECT * FROM usuario WHERE nombre_usuario =$1';
    connection.query(query, [username], async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.rows.length === 0) {
        result(null, { mensaje: 'Credenciales inválidas' });
        return;
      }
      const usuario = res.rows[0];
      const passwordMatch = await bcrypt.compareSync(password, usuario.clave);
      if (!passwordMatch) {
        result(null, { mensaje: 'Credenciales inválidas' });
        return;
      }


      const token = jwt.sign({ id: usuario.id_usuario, nombre: usuario.nombre_usuario, id_rol: usuario.rol_id }, dbConfig.KEY, { expiresIn: '1h' });
      const refreshToken = this.generateRefreshToken(usuario);
      result(null, { token, refreshToken, usuario_id: usuario.id_usuario });

    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM usuario WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  findNameById = (id, result) => {
    connection.query(`SELECT nombre FROM dentista_v WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res.rows[0].nombre);
    });
  };
  GetInputs = (id, result) => {
    connection.query(`SELECT foto, nombre_usuario, clave, nombre, apellidos, celular, email, ci, direccion, telefono, horas, dias, turno, tipo, detalles, costo FROM dentista_v WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {

        const keys = Object.keys(res.rows[0])
        const obj = res.rows[0];
        let inputs = {};
        let objIn = [];
        for (let [index, value] of keys.entries()) {
          if (value == 'dias' || value == 'horas') {
            const opt = value == 'dias' ?
              [
                { key: 'lunes', value: 'Lunes' },
                { key: 'martes', value: 'Martes' },
                { key: 'miercoles', value: 'Miercoles' },
                { key: 'jueves', value: 'Jueves' },
                { key: 'viernes', value: 'Viernes' }
              ]
              :
              [
                { key: 'ocho', value: '8:00' },
                { key: 'nueve', value: '9:00' },
              ];
            objIn.push({
              key: value,
              label: value.replace(/_/g, ' ').toUpperCase(),
              value: obj[value],
              required: true,
              order: index,
              controlType: 'textbox'
            })
            objIn.push({
              key: 'add_' + value,
              label: 'AÑADIR ' + value.replace(/_/g, ' ').toUpperCase(),
              options: opt,
              order: index,
              controlType: 'dropdown'
            })
          } else {
            if (value != 'clave') {
              objIn.push({
                key: value,
                label: value.replace(/_/g, ' ').toUpperCase(),
                value: obj[value],
                required: true,
                order: index,
                controlType: value != 'foto' ? 'textbox' : 'image'
              })
            }
            if (value == 'clave') {
              objIn.push({
                key: value,
                label: value.replace(/_/g, ' ').toUpperCase(),
                value: '',
                required: false,
                order: index,
                type: 'password',
                controlType: 'textbox'
              }, {
                key: 'newpass',
                label: 'NUEVA CLAVE',
                value: '',
                required: false,
                order: index,
                type: 'password',
                controlType: 'textbox'
              }, {
                key: 'validateNew',
                label: 'VALIDAR NUEVA CLAVE',
                value: '',
                required: false,
                order: index,
                type: 'password',
                controlType: 'textbox'
              },
              )
            }
          }

          if (value.match(/foto|nombre_usuario|clave|telefono|turno|costo/)) {
            let nameList = value.replace(/_/g, ' ').toUpperCase();
            switch (value) {
              case "clave":
                nameList = 'CAMBIAR CLAVE'
                break;
              case "telefono":
                nameList = 'CONTACTO'
                break;
              case "turno":
                nameList = 'HORARIOS'
                break;
              case "costo":
                nameList = 'SERVICIOS'
                break;

              default:
                break;
            }
            inputs[nameList]=objIn
            objIn=[];
          }

        }
        // console.log(inputs)
        result(null, inputs);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM dentista_v WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {
        console.log("devolver: ", res.rows);
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };


  create = (newValues, result) => {
    connection.query("CALL public.crud_usuario($1,$2,$3,$4,$5,$6)",
      [
        newValues.p_id_usuario,
        newValues.p_operacion,
        newValues.p_persona_id,
        newValues.p_nombre_usuario,
        newValues.p_clave,
        newValues.p_rol_id
      ], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("valores ingresados: ", { id: res.insertId, ...newValues });
        result(null, { id: res.insertId, ...newValues });
      });
  };

  updateById = (id, newValues, result) => {
    connection.query("CALL public.crud_usuario($1,$2,$3,$4,$5,$6)",
      [
        id,
        newValues.p_operacion,
        newValues.p_persona_id,
        newValues.p_nombre_usuario,
        newValues.p_clave,
        newValues.p_rol_id
      ], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("valores ingresados: ", { id: res.insertId, ...newValues });
        result(null, { id: res.insertId, ...newValues });
      });
  };


  remove = (id, result) => {
    connection.query("CALL dentalsys.crud_usuario($1, 'DELETE', 0, '', '', 0)", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el anuncio: ", id);
      result(null, res);
    });
  };

}
module.exports = PersonasServices;
