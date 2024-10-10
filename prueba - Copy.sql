-- SEQUENCE: public.pltll_id_seq

-- DROP SEQUENCE IF EXISTS public.pltll_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.pltll_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY plantilla.id_plantilla;

ALTER SEQUENCE public.pltll_id_seq
    OWNER TO raquel;
