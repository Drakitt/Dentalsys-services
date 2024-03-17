-- View: public.cita_dashboard_v

-- DROP VIEW public.cita_dashboard_v;

CREATE OR REPLACE VIEW public.cita_dashboard_v
 AS
 SELECT c.id_cita,
    c.razon,
    c.detalles,
    c.fecha,
    c.hora,
    p.id_paciente AS paciente_id,
    pp.nombre AS nombre_paciente,
    pp.apellido_paterno AS apellidos_paciente,
    p.fecha_nacimiento AS fecha_nacimiento_paciente,
    pp.celular AS celular_paciente,
    pp.email AS email_paciente,
    pp.ci AS ci_paciente,
    d.id_dentista AS dentista_id,
    dp.nombre AS nombre_dentista,
    dp.apellido_paterno AS apellidos_dentista
   FROM cita c
     JOIN paciente p ON c.paciente_id = p.id_paciente
     JOIN persona pp ON p.persona_id = pp.id_persona
     JOIN dentista d ON c.dentista_id = d.id_dentista
     JOIN persona dp ON d.persona_id = dp.id_persona
  WHERE c.activo = false;

ALTER TABLE public.cita_dashboard_v
    OWNER TO raquel;

