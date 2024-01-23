-- View: public.historia_clinica_v
-- DROP VIEW public.historia_clinica_v;
CREATE
OR REPLACE VIEW public.historia_clinica_v AS
SELECT
  hc.nro_hc,
  hc.municipio,
  hc.establecimiento,
  hc.sedes,
  p.id_paciente,
  p.estado_civil,
  p.nacion_originaria,
  p.grado_educativo,
  p.idioma,
  p.lugar_nacimiento,
  p.fecha_nacimiento,
  p.ocupacion,
  p.sexo,
  p.tutor_id,
  pp.nombre,
  pp.apellidos,
  pp.celular,
  pp.telefono,
  pp.email,
  pp.ci,
  p.persona_id
FROM
  historia_clinica hc
  JOIN paciente p ON hc.paciente_id = p.id_paciente
  JOIN persona pp ON p.persona_id = pp.id_persona;

ALTER TABLE public.historia_clinica_v OWNER TO postgres;
