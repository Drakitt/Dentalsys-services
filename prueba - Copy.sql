
CREATE OR REPLACE PROCEDURE public.crud_consentimiento(
	INOUT p_id_consentimiento bigint,
	IN p_operacion character varying,
	IN p_archivo character varying,
	IN p_titulo character varying,
	IN p_descripcion double precision,
	IN p_paciente_id bigint,
	IN p_fecha double precision)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo consentimiento
        INSERT INTO consentimiento(archivo, titulo, descripcion, paciente_id, fecha, activo)
        VALUES (p_archivo, p_titulo, p_descripcion, p_paciente_id, p_fecha,'true')
        RETURNING id_consentimiento INTO p_id_consentimiento;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un consentimiento existente
        UPDATE consentimiento
        SET archivo = p_archivo,
            titulo = p_titulo,
            descripcion = p_descripcion,
            paciente_id = p_paciente_id,
            fecha = p_fecha,
        WHERE id_consentimiento = p_id_consentimiento;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un consentimiento por su ID
		UPDATE consentimiento
        SET activo = 'false'
        WHERE id_consentimiento = p_id_consentimiento;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un consentimiento por su ID
        SELECT * FROM consentimiento WHERE id_consentimiento = p_id_consentimiento INTO p_archivo, p_titulo, p_descripcion, p_paciente_id, p_fecha;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$BODY$;
