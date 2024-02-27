-- PROCEDURE: public.crud_historia_clinica_complete(bigint, character varying, bigint, character varying, character varying, character varying, character varying, character varying, integer, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)

-- DROP PROCEDURE IF EXISTS public.crud_historia_clinica_complete(bigint, character varying, bigint, character varying, character varying, character varying, character varying, character varying, integer, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying);

CREATE OR REPLACE PROCEDURE public.crud_historia_clinica_complete(
	INOUT p_nro_hc bigint,
	IN p_operacion character varying,
	IN p_paciente_id bigint,
	IN p_foto character varying,
	IN p_nombre character varying,
	IN p_apellido_paterno character varying,
	IN p_apellido_materno character varying,
	IN p_ci character varying,
	IN p_edad integer,
	IN p_sexo character varying,
	IN p_lugar_nacimiento character varying,
	IN p_fecha_nacimiento date,
	IN p_ocupacion character varying,
	IN p_grado_educativo character varying,
	IN p_estado_civil character varying,
	IN p_nacion_originaria character varying,
	IN p_idioma character varying,
	IN p_celular character varying,
	IN p_telefono character varying,
	IN p_direccion character varying,
	IN p_municipio character varying,
	IN p_establecimiento character varying,
	IN p_red_salud character varying,
	IN p_tutor_id bigint,
	IN p_antecedentes_familiares character varying,
	IN p_anemia boolean,
	IN p_asma boolean,
	IN p_cardiopatias boolean,
	IN p_diabetes_mel boolean,
	IN p_enf_gastricas boolean,
	IN p_epilepsia boolean,
	IN p_hepatitis boolean,
	IN p_hipertension boolean,
	IN p_tuberculosis boolean,
	IN p_vih boolean,
	IN p_otros_atecedentes_personales character varying,
	IN p_alergias character varying,
	IN p_alergia_descripcion character varying,
	IN p_embarazo character varying,
	IN p_semanas_embarazo character varying,
	IN p_hemorragia_extraccion character varying,
	IN p_situacion_hemorragia character varying,
	IN p_atm character varying,
	IN p_ganglios character varying,
	IN p_respirador character varying,
	IN p_otros_examenes_extraorales character varying,
	IN p_labios character varying,
	IN p_lengua character varying,
	IN p_paladar character varying,
	IN p_piso_boca character varying,
	IN p_mucosa character varying,
	IN p_encias character varying,
	IN p_protesis character varying,
	IN p_fecha date,
	IN p_habitos character varying,
	IN p_otros_habitos character varying,
	IN p_cepillo character varying,
	IN p_sangrado_encias character varying,
	IN p_hilo_dental character varying,
	IN p_enjuague_bucal character varying,
	IN p_frecuencia_cepillado character varying,
	IN p_higiene_bucal character varying,
	IN p_observaciones character varying,
	IN p_interconsulta character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
p_persona_id INTEGER
BEGIN
    IF p_operacion = 'INSERT' THEN

		INSERT INTO historia_clinica(municipio, establecimiento, red_salud, paciente_id, observaciones, interconsulta)
        VALUES (p_municipio, p_establecimiento, p_red_salud, p_paciente_id, p_observaciones, p_interconsulta)

        RETURNING nro_hc INTO p_nro_hc;

        INSERT INTO antecedentes_bucodentales(fecha, habitos, hc_id, otros_habitos)
        VALUES (p_fecha, p_habitos, p_nro_hc, p_otros_habitos);

        INSERT INTO antecedentes_higiene_oral(cepillo, hilo_dental, enjuague_bucal, frecuencia_cepillado, sangrado_encias, higiene_bucal, hc_id)
	      VALUES(p_cepillo, p_hilo_dental, p_enjuague_bucal, p_frecuencia_cepillado, p_sangrado_encias, p_higiene_bucal, p_nro_hc);

        INSERT INTO antecedentes_patologicos_familiares(hc_id, descripcion)
	      VALUES (p_nro_hc, p_antecedentes_familiares);

        INSERT INTO antecedentes_patologicos_personales(anemia, asma, cardiopatias, diabetes_mel, enf_gastricas, epilepsia, hepatitis, hipertension, tuberculosis, vih, alergias, embarazo, otros, hc_id,hemorragia_extraccion, alergia_descripcion, semanas_embarazo, situacion_hemorragia)
	      VALUES (p_anemia, p_asma, p_cardiopatias, p_diabetes_mel, p_enf_gastricas, p_epilepsia, p_hepatitis, p_hipertension, p_tuberculosis, p_vih, p_alergias, p_embarazo, p_otros_atecedentes_personales, p_nro_hc, p_hemorragia_extraccion, p_alergia_descripcion, p_semanas_embarazo, p_situacion_hemorragia);

        INSERT INTO examen_extra_oral(atm, ganglios, respirador, otros, hc_id)
	      VALUES (p_atm, p_ganglios, p_respirador, p_otros_examenes_extraorales, p_nro_hc);

        INSERT INTO examen_intra_oral(labios, lengua, paladar, piso_boca, mucosa, encias, protesis, hc_id)
	      VALUES (p_labios, p_lengua, p_paladar, p_piso_boca, p_mucosa, p_encias, p_protesis, p_nro_hc);

    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un examen existente
        UPDATE historia_clinica
        SET municipio = p_municipio,
            establecimiento = p_establecimiento,
            red_salud = p_red_salud,
            observaciones = p_observaciones,
            interconsulta = p_interconsulta
        WHERE nro_hc = p_nro_hc;

        UPDATE paciente
        SET estado_civil=p_estado_civil,
            nacion_originaria=p_nacion_originaria,
            grado_educativo=p_grado_educativo,
            idioma=p_idioma,
            lugar_nacimiento=p_lugar_nacimiento,
            fecha_nacimiento=p_fecha_nacimiento,
            ocupacion=p_ocupacion,
            tutor_id=p_tutor_id,
            sexo=p_sexo,
            edad=p_edad
        WHERE id_paciente = p_paciente_id RETURNING persona_id into p_persona_id;

        UPDATE persona
        SET ci=p_ci,
            direccion=p_direccion,
            nombre=p_nombre,
            apellido_paterno=p_apellido_paterno,
            celular=p_celular,
            telefono=p_telefono,
            foto=p_foto,
            apellido_materno=p_apellido_materno
        WHERE id_persona = p_persona_id;

        UPDATE antecedentes_bucodentales
        SET fecha=p_fecha,
            habitos=p_habitos,
            otros_habitos=p_otros_habitos
        WHERE hc_id = p_nro_hc;

        UPDATE antecedentes_higiene_oral
        SET cepillo=p_cepillo,
            hilo_dental=p_hilo_dental,
            enjuague_bucal=p_enjuague_bucal,
            frecuencia_cepillado=p_frecuencia_cepillado,
            sangrado_encias=p_sangrado_encias,
            higiene_bucal=p_higiene_bucal
        WHERE hc_id = p_nro_hc;

        UPDATE antecedentes_patologicos_familiares
        SET descripcion=p_antecedentes_familiares
        WHERE hc_id = p_nro_hc;

        UPDATE antecedentes_patologicos_personales
        SET anemia=p_anemia,
            asma=p_asma,
            cardiopatias=p_cardiopatias,
            diabetes_mel=p_diabetes_mel,
            enf_gastricas=p_enf_gastricas,
            epilepsia=p_epilepsia,
            hepatitis=p_hepatitis,
            hipertension=p_hipertension,
            tuberculosis=p_tuberculosis,
            vih=p_vih,
            alergias=p_alergias,
            embarazo=p_embarazo,
            otros=p_otros_atecedentes_personales,
            hemorragia_extraccion=p_hemorragia_extraccion,
            alergia_descripcion=p_alergia_descripcion,
            semanas_embarazo=p_semanas_embarazo,
            situacion_hemorragia=p_situacion_hemorragia
        WHERE hc_id = p_nro_hc;

        UPDATE examen_extra_oral
        SET atm=p_atm,
            ganglios=p_ganglios,
            respirador=p_respirador,
            otros=p_otros_examenes_extraorales
        WHERE hc_id = p_nro_hc;

        UPDATE examen_intra_oral
        SET labios=p_labios,
            lengua=p_lengua,
            paladar=p_paladar,
            piso_boca=p_piso_boca,
            mucosa=p_mucosa,
            encias=p_encias,
            protesis=p_protesis
        WHERE hc_id = p_nro_hc;

    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un examen por su ID
        DELETE FROM historia_clinica
        WHERE nro_hc = p_nro_hc;

        DELETE FROM antecedentes_bucodentales
        WHERE hc_id = p_nro_hc;

        DELETE FROM antecedentes_higiene_oral
        WHERE hc_id = p_nro_hc;

        DELETE FROM antecedentes_patologicos_familiares
        WHERE hc_id = p_nro_hc;

        DELETE FROM antecedentes_patologicos_personales
        WHERE hc_id = p_nro_hc;

        DELETE FROM examen_intra_oral
        WHERE hc_id = p_nro_hc;

        DELETE FROM examen_intra_oral
        WHERE hc_id = p_nro_hc;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un examen por su ID
        SELECT * FROM historia_clinica WHERE nro_hc = p_nro_hc INTO p_nro_hc, p_municipio, p_establecimiento, p_red_salud, p_paciente_id, p_observaciones, p_interconsulta;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$BODY$;
ALTER PROCEDURE public.crud_historia_clinica_complete(bigint, character varying, bigint, character varying, character varying, character varying, character varying, character varying, integer, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)
    OWNER TO postgres;
