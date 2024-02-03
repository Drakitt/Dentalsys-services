-- View: public.servicio_v

-- DROP VIEW public.servicio_v;

CREATE OR REPLACE VIEW public.servicio_v
 AS
 SELECT s.id_servicio,
    s.hora,
    s.dia,
    s.turno,
    ds.id_dentista_servicio,
    ds.dentista_id
   FROM servicio s
     JOIN dentista_servicio ds ON ds.servicio_id = s.id_servicio;

ALTER TABLE public.servicio_v
    OWNER TO postgres;

