CREATE SEQUENCE public.dentista_horario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY dentista_horario.id_dentista_horario;

ALTER SEQUENCE public.dentista_horario_id_seq
    OWNER TO postgres;

nextval('dentista_horario_id_seq'::regclass)
