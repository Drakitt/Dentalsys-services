--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cita (
    razon character varying(100) NOT NULL,
    detalles character varying(500),
    fecha date NOT NULL,
    hora time with time zone NOT NULL,
    paciente_id bigint NOT NULL,
    dentista_id bigint NOT NULL,
    id_cita bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.cita OWNER TO postgres;

--
-- Name: cita_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cita_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cita_id_seq OWNER TO postgres;

--
-- Name: cita_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cita_id_seq OWNED BY public.cita.id_cita;


--
-- Name: dentista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentista (
    persona_id bigint NOT NULL,
    id_dentista bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.dentista OWNER TO postgres;

--
-- Name: paciente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paciente (
    id_paciente bigint NOT NULL,
    persona_id bigint NOT NULL,
    estado_civil character varying(100),
    nacion_originaria character varying(100),
    grado_educativo character varying(100),
    idioma character varying(100),
    lugar_nacimiento character varying(100),
    fecha_nacimiento date NOT NULL,
    ocupacion character varying(100) NOT NULL,
    tutor_id bigint,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    sexo character varying(100)
);


ALTER TABLE public.paciente OWNER TO postgres;

--
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    id_persona bigint NOT NULL,
    ci character varying(100) NOT NULL,
    direccion character varying(100),
    nombre character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    celular character varying(100),
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    email character varying(100) NOT NULL,
    telefono character varying(100)
);


ALTER TABLE public.persona OWNER TO postgres;
--
-- Name: dentista_horario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentista_horario (
    id_dentista_horario bigint NOT NULL,
    dentista_id bigint NOT NULL,
    horario_id bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.dentista_horario OWNER TO postgres;

--
-- Name: dentista_horario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentista_horario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.dentista_horario_id_seq OWNER TO postgres;

--
-- Name: dentista_horario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentista_horario_id_seq OWNED BY public.dentista_horario.id_dentista_horario;


--
-- Name: dentista_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dentista_id_seq OWNER TO postgres;

--
-- Name: dentista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentista_id_seq OWNED BY public.dentista.id_dentista;


--
-- Name: dentista_servicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentista_servicio (
    id_dentista_servicio bigint NOT NULL,
    dentista_id bigint NOT NULL,
    servicio_id bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.dentista_servicio OWNER TO postgres;

--
-- Name: dentista_servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentista_servicio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.dentista_servicio_id_seq OWNER TO postgres;

--
-- Name: dentista_servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentista_servicio_id_seq OWNED BY public.dentista_servicio.id_dentista_servicio;

--
-- Name: evaluacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion (
    nombre character varying(100) NOT NULL,
    examen_id bigint NOT NULL,
    id_evaluacion bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    tipo character varying NOT NULL
);


ALTER TABLE public.evaluacion OWNER TO postgres;

--
-- Name: evaluacion_examen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion_examen (
    resultado character varying(100) NOT NULL,
    examen_id bigint NOT NULL,
    evaluacion_id bigint NOT NULL,
    id_evaluacion_examen bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    hc_id bigint NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.evaluacion_examen OWNER TO postgres;

--
-- Name: evaluacion_examen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacion_examen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evaluacion_examen_id_seq OWNER TO postgres;

--
-- Name: evaluacion_examen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacion_examen_id_seq OWNED BY public.evaluacion_examen.id_evaluacion_examen;


--
-- Name: evaluacion_hc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion_hc (
    evaluacion_id bigint NOT NULL,
    fecha date NOT NULL,
    id_evaluacion_hc bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    nro_hc bigint NOT NULL,
    resultado character varying(300) NOT NULL
);


ALTER TABLE public.evaluacion_hc OWNER TO postgres;

--
-- Name: evaluacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evaluacion_id_seq OWNER TO postgres;

--
-- Name: evaluacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacion_id_seq OWNED BY public.evaluacion.id_evaluacion;


--
-- Name: evalucion_hc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evalucion_hc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.evalucion_hc_id_seq OWNER TO postgres;

--
-- Name: evalucion_hc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evalucion_hc_id_seq OWNED BY public.evaluacion_hc.id_evaluacion_hc;


--
-- Name: examen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.examen (
    nombre character varying(100) NOT NULL,
    descripcion character varying(500) NOT NULL,
    categoria character varying(100) NOT NULL,
    id_examen bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.examen OWNER TO postgres;

--
-- Name: examen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.examen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.examen_id_seq OWNER TO postgres;

--
-- Name: examen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.examen_id_seq OWNED BY public.examen.id_examen;


--
-- Name: historia_clinica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historia_clinica (
    nro_hc bigint NOT NULL,
    municipio character varying(100) NOT NULL,
    establecimiento character varying(100) NOT NULL,
    sedes character varying(100) NOT NULL,
    paciente_id bigint NOT NULL
);


ALTER TABLE public.historia_clinica OWNER TO postgres;

--
-- Name: historia_clinica_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historia_clinica_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.historia_clinica_id_seq OWNER TO postgres;

--
-- Name: historia_clinica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historia_clinica_id_seq OWNED BY public.historia_clinica.nro_hc;


--
-- Name: horario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horario (
    id_horario bigint NOT NULL,
    hora time with time zone NOT NULL,
    fecha date NOT NULL,
    turno character varying(100) NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.horario OWNER TO postgres;

--
-- Name: horario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.horario_id_seq OWNER TO postgres;

--
-- Name: horario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horario_id_seq OWNED BY public.horario.id_horario;


--
-- Name: log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.log (
);


ALTER TABLE public.log OWNER TO postgres;

--
-- Name: odontograma; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.odontograma (
    id_odontograma bigint NOT NULL,
    fecha date NOT NULL,
    nro_hc bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.odontograma OWNER TO postgres;

--
-- Name: odontograma_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.odontograma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.odontograma_id_seq OWNER TO postgres;

--
-- Name: odontograma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.odontograma_id_seq OWNED BY public.odontograma.id_odontograma;


--
-- Name: paciente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paciente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.paciente_id_seq OWNER TO postgres;

--
-- Name: paciente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paciente_id_seq OWNED BY public.paciente.id_paciente;
--
-- Name: persona_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.persona_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.persona_id_seq OWNER TO postgres;

--
-- Name: persona_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.persona_id_seq OWNED BY public.persona.id_persona;


--
-- Name: pieza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pieza (
    numero bigint NOT NULL,
    tipo character varying(100) NOT NULL,
    id_pieza bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    nombre character varying NOT NULL
);


ALTER TABLE public.pieza OWNER TO postgres;

--
-- Name: pieza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pieza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pieza_id_seq OWNER TO postgres;

--
-- Name: pieza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pieza_id_seq OWNED BY public.pieza.id_pieza;


--
-- Name: pieza_odontograma; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pieza_odontograma (
    id_pieza_odontograma bigint NOT NULL,
    pieza_id bigint NOT NULL,
    odontograma_id bigint NOT NULL,
    cara character varying(100) NOT NULL,
    estado character varying(100) NOT NULL,
    observacion character varying(500),
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.pieza_odontograma OWNER TO postgres;

--
-- Name: pieza_odontograma_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pieza_odontograma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.pieza_odontograma_id_seq OWNER TO postgres;

--
-- Name: pieza_odontograma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pieza_odontograma_id_seq OWNED BY public.pieza_odontograma.id_pieza_odontograma;


--
-- Name: referencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.referencia (
    id_referencia bigint NOT NULL,
    fecha date NOT NULL,
    motivo character varying(100) NOT NULL,
    tipo character varying(100) NOT NULL,
    nro_hc bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.referencia OWNER TO postgres;

--
-- Name: referencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.referencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.referencia_id_seq OWNER TO postgres;

--
-- Name: referencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.referencia_id_seq OWNED BY public.referencia.id_referencia;


--
-- Name: reporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reporte (
    id_reporte bigint NOT NULL,
    tipo character varying(100) NOT NULL,
    descripcion character varying(500),
    archivo character varying(100) NOT NULL,
    fecha date NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.reporte OWNER TO postgres;

--
-- Name: reporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reporte_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.reporte_id_seq OWNER TO postgres;

--
-- Name: reporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reporte_id_seq OWNED BY public.reporte.id_reporte;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id_rol bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(100) NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_seq OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id_rol;


--
-- Name: servicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicio (
    tipo character varying(100) NOT NULL,
    detalles character varying(500),
    costo double precision NOT NULL,
    id_servicio bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.servicio OWNER TO postgres;

--
-- Name: servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicio_id_seq OWNER TO postgres;

--
-- Name: servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicio_id_seq OWNED BY public.servicio.id_servicio;


--
-- Name: tratamiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tratamiento (
    fecha date NOT NULL,
    observacion character varying(100),
    prescripcion character varying(100) NOT NULL,
    cuenta double precision,
    saldo double precision,
    diagnostico character varying(500) NOT NULL,
    nro_hc bigint NOT NULL,
    id_tratamiento bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.tratamiento OWNER TO postgres;

--
-- Name: tratamiento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tratamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tratamiento_id_seq OWNER TO postgres;

--
-- Name: tratamiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tratamiento_id_seq OWNED BY public.tratamiento.id_tratamiento;


--
-- Name: tratamiento_pieza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tratamiento_pieza (
    id_tratamiento_pieza bigint DEFAULT nextval('public.dentista_id_seq'::regclass) NOT NULL,
    pieza_id bigint NOT NULL,
    tratamiento_id bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.tratamiento_pieza OWNER TO postgres;

--
-- Name: tutor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tutor (
    persona_id bigint NOT NULL,
    id_tutor bigint NOT NULL,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date
);


ALTER TABLE public.tutor OWNER TO postgres;

--
-- Name: tutor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tutor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tutor_id_seq OWNER TO postgres;

--
-- Name: tutor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tutor_id_seq OWNED BY public.tutor.id_tutor;
--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    persona_id bigint,
    id_usuario_reg bigint,
    id_usuario_mod bigint,
    fecha_reg date,
    fecha_mod date,
    id_usuario bigint NOT NULL,
    clave character varying(100) NOT NULL,
    nombre_usuario character varying(100) NOT NULL,
    rol_id bigint NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id_usuario;


--
-- Name: cita id_cita; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_id_seq'::regclass);


--
-- Name: dentista id_dentista; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista ALTER COLUMN id_dentista SET DEFAULT nextval('public.dentista_id_seq'::regclass);


--
-- Name: dentista_horario id_dentista_horario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_horario ALTER COLUMN id_dentista_horario SET DEFAULT nextval('public.dentista_horario_id_seq'::regclass);


--
-- Name: dentista_servicio id_dentista_servicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_servicio ALTER COLUMN id_dentista_servicio SET DEFAULT nextval('public.dentista_servicio_id_seq'::regclass);


--
-- Name: evaluacion id_evaluacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion ALTER COLUMN id_evaluacion SET DEFAULT nextval('public.evaluacion_id_seq'::regclass);


--
-- Name: evaluacion_examen id_evaluacion_examen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_examen ALTER COLUMN id_evaluacion_examen SET DEFAULT nextval('public.evaluacion_examen_id_seq'::regclass);


--
-- Name: evaluacion_hc id_evaluacion_hc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_hc ALTER COLUMN id_evaluacion_hc SET DEFAULT nextval('public.evalucion_hc_id_seq'::regclass);


--
-- Name: examen id_examen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.examen ALTER COLUMN id_examen SET DEFAULT nextval('public.examen_id_seq'::regclass);


--
-- Name: historia_clinica nro_hc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_clinica ALTER COLUMN nro_hc SET DEFAULT nextval('public.historia_clinica_id_seq'::regclass);


--
-- Name: horario id_horario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario ALTER COLUMN id_horario SET DEFAULT nextval('public.horario_id_seq'::regclass);


--
-- Name: odontograma id_odontograma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.odontograma ALTER COLUMN id_odontograma SET DEFAULT nextval('public.odontograma_id_seq'::regclass);


--
-- Name: paciente id_paciente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente ALTER COLUMN id_paciente SET DEFAULT nextval('public.paciente_id_seq'::regclass);


--
-- Name: persona id_persona; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona ALTER COLUMN id_persona SET DEFAULT nextval('public.persona_id_seq'::regclass);


--
-- Name: pieza id_pieza; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pieza ALTER COLUMN id_pieza SET DEFAULT nextval('public.pieza_id_seq'::regclass);


--
-- Name: pieza_odontograma id_pieza_odontograma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pieza_odontograma ALTER COLUMN id_pieza_odontograma SET DEFAULT nextval('public.pieza_odontograma_id_seq'::regclass);


--
-- Name: referencia id_referencia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referencia ALTER COLUMN id_referencia SET DEFAULT nextval('public.referencia_id_seq'::regclass);


--
-- Name: reporte id_reporte; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reporte ALTER COLUMN id_reporte SET DEFAULT nextval('public.reporte_id_seq'::regclass);


--
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Name: servicio id_servicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicio_id_seq'::regclass);


--
-- Name: tratamiento id_tratamiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento ALTER COLUMN id_tratamiento SET DEFAULT nextval('public.tratamiento_id_seq'::regclass);


--
-- Name: tutor id_tutor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tutor ALTER COLUMN id_tutor SET DEFAULT nextval('public.tutor_id_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Name: persona Personas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT "Personas_pkey" PRIMARY KEY (id_persona);


--
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id_cita);


--
-- Name: dentista_horario dentista_horario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_horario
    ADD CONSTRAINT dentista_horario_pkey PRIMARY KEY (id_dentista_horario);


--
-- Name: dentista dentista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista
    ADD CONSTRAINT dentista_pkey PRIMARY KEY (id_dentista);


--
-- Name: dentista_servicio dentista_servicio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_servicio
    ADD CONSTRAINT dentista_servicio_pkey PRIMARY KEY (id_dentista_servicio);


--
-- Name: evaluacion_hc evaluacion_hc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_hc
    ADD CONSTRAINT evaluacion_hc_pkey PRIMARY KEY (id_evaluacion_hc);


--
-- Name: evaluacion evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_pkey PRIMARY KEY (id_evaluacion);


--
-- Name: examen examen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.examen
    ADD CONSTRAINT examen_pkey PRIMARY KEY (id_examen);


--
-- Name: historia_clinica historia_clinica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_clinica
    ADD CONSTRAINT historia_clinica_pkey PRIMARY KEY (nro_hc);


--
-- Name: horario horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id_horario);


--
-- Name: evaluacion_examen id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_examen
    ADD CONSTRAINT id PRIMARY KEY (id_evaluacion_examen);


--
-- Name: odontograma odontograma_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.odontograma
    ADD CONSTRAINT odontograma_pkey PRIMARY KEY (id_odontograma);


--
-- Name: paciente paciente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY (id_paciente);


--
-- Name: pieza_odontograma pieza_odontograma_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pieza_odontograma
    ADD CONSTRAINT pieza_odontograma_pkey PRIMARY KEY (id_pieza_odontograma);


--
-- Name: pieza pieza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pieza
    ADD CONSTRAINT pieza_pkey PRIMARY KEY (id_pieza);


--
-- Name: referencia referencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referencia
    ADD CONSTRAINT referencia_pkey PRIMARY KEY (id_referencia);


--
-- Name: reporte reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT reporte_pkey PRIMARY KEY (id_reporte);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- Name: servicio servicio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT servicio_pkey PRIMARY KEY (id_servicio);


--
-- Name: tratamiento_pieza tratamiento_pieza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento_pieza
    ADD CONSTRAINT tratamiento_pieza_pkey PRIMARY KEY (id_tratamiento_pieza);


--
-- Name: tratamiento tratamiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento
    ADD CONSTRAINT tratamiento_pkey PRIMARY KEY (id_tratamiento);


--
-- Name: tutor tutor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tutor
    ADD CONSTRAINT tutor_pkey PRIMARY KEY (id_tutor);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: cita dentista; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT dentista FOREIGN KEY (dentista_id) REFERENCES public.dentista(id_dentista) NOT VALID;


--
-- Name: dentista_horario dentista; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_horario
    ADD CONSTRAINT dentista FOREIGN KEY (dentista_id) REFERENCES public.dentista(id_dentista) NOT VALID;


--
-- Name: evaluacion_hc hc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion_hc
    ADD CONSTRAINT hc FOREIGN KEY (nro_hc) REFERENCES public.historia_clinica(nro_hc) NOT VALID;


--
-- Name: dentista_horario horario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentista_horario
    ADD CONSTRAINT horario FOREIGN KEY (horario_id) REFERENCES public.horario(id_horario) NOT VALID;


--
-- Name: pieza_odontograma odontograma; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pieza_odontograma
    ADD CONSTRAINT odontograma FOREIGN KEY (odontograma_id) REFERENCES public.odontograma(id_odontograma) NOT VALID;


--
-- Name: cita paciente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT paciente FOREIGN KEY (paciente_id) REFERENCES public.paciente(id_paciente) NOT VALID;


--
-- Name: usuario persona; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT persona FOREIGN KEY (persona_id) REFERENCES public.persona(id_persona);


--
-- Name: tratamiento_pieza pieza; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento_pieza
    ADD CONSTRAINT pieza FOREIGN KEY (pieza_id) REFERENCES public.pieza(id_pieza) NOT VALID;


--
-- Name: usuario rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT rol FOREIGN KEY (rol_id) REFERENCES public.rol(id_rol) NOT VALID;


--
-- Name: tratamiento_pieza tratamiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento_pieza
    ADD CONSTRAINT tratamiento FOREIGN KEY (tratamiento_id) REFERENCES public.tratamiento(id_tratamiento) NOT VALID;

--
-- Name: cita_v; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.cita_v AS
 SELECT c.id_cita,
    c.razon,
    c.detalles,
    c.fecha,
    c.hora,
    p.id_paciente AS paciente_id,
    pp.nombre AS nombre_paciente,
    pp.apellidos AS apellidos_paciente,
    p.fecha_nacimiento AS fecha_nacimiento_paciente,
    pp.celular AS celular_paciente,
    pp.email AS email_paciente,
    pp.ci AS ci_paciente,
    d.id_dentista AS dentista_id,
    dp.nombre AS nombre_dentista,
    dp.apellidos AS apellidos_dentista
   FROM ((((public.cita c
     JOIN public.paciente p ON ((c.paciente_id = p.id_paciente)))
     JOIN public.persona pp ON ((p.persona_id = pp.id_persona)))
     JOIN public.dentista d ON ((c.dentista_id = d.id_dentista)))
     JOIN public.persona dp ON ((d.persona_id = dp.id_persona)));


ALTER TABLE public.cita_v OWNER TO postgres;
--
-- Name: dentista_v; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.dentista_v AS
 SELECT d.id_dentista,
    p.nombre,
    p.apellidos,
    p.celular,
    p.email,
    p.ci
   FROM (public.dentista d
     JOIN public.persona p ON ((d.persona_id = p.id_persona)));


ALTER TABLE public.dentista_v OWNER TO postgres;
--
-- Name: paciente_v; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.paciente_v AS
 SELECT p.id_paciente,
    p.estado_civil,
    p.nacion_originaria,
    p.grado_educativo,
    p.idioma,
    p.lugar_nacimiento,
    p.fecha_nacimiento,
    p.ocupacion,
    p.sexo,
    pp.nombre,
    pp.apellidos,
    pp.celular,
    pp.email,
    pp.ci
   FROM (public.paciente p
     JOIN public.persona pp ON ((p.persona_id = pp.id_persona)));


ALTER TABLE public.paciente_v OWNER TO postgres;
--
-- Name: tutor_v; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.tutor_v AS
 SELECT t.id_tutor,
    pt.nombre,
    pt.apellidos,
    pt.celular,
    pt.email,
    pt.ci
   FROM (public.tutor t
     JOIN public.persona pt ON ((t.persona_id = pt.id_persona)));


ALTER TABLE public.tutor_v OWNER TO postgres;

--
-- Name: crud_cita(bigint, character varying, character varying, character varying, date, time with time zone, bigint, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_cita(INOUT p_id_cita bigint, IN p_operacion character varying, IN p_razon character varying, IN p_detalles character varying, IN p_fecha date, IN p_hora time with time zone, IN p_paciente_id bigint, IN p_dentista_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva cita
        INSERT INTO cita(razon, detalles, fecha, hora, paciente_id, dentista_id)
        VALUES (p_razon, p_detalles, p_fecha, p_hora, p_paciente_id, p_dentista_id)
        RETURNING id_cita INTO p_id_cita;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una cita existente
        UPDATE cita
        SET razon = p_razon,
            detalles = p_detalles,
            fecha = p_fecha,
            hora = p_hora,
            paciente_id = p_paciente_id,
            dentista_id = p_dentista_id
        WHERE id_cita = p_id_cita;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una cita por su ID
        DELETE FROM cita
        WHERE id_cita = p_id_cita;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una cita por su ID
        SELECT * FROM cita WHERE id_cita = p_id_cita INTO p_id_cita, p_razon, p_detalles, p_fecha, p_hora, p_paciente_id, p_dentista_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_cita(INOUT p_id_cita bigint, IN p_operacion character varying, IN p_razon character varying, IN p_detalles character varying, IN p_fecha date, IN p_hora time with time zone, IN p_paciente_id bigint, IN p_dentista_id bigint) OWNER TO postgres;

--
-- Name: crud_dentista(bigint, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_dentista(INOUT p_id_dentista bigint, IN p_operacion character varying, IN p_persona_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo dentista
        INSERT INTO dentista(persona_id)
        VALUES (p_persona_id)
        RETURNING id_dentista INTO p_id_dentista;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un dentista existente
        UPDATE dentista
        SET persona_id = p_persona_id
        WHERE id_dentista = p_id_dentista;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un dentista por su ID
        DELETE FROM dentista
        WHERE id_dentista = p_id_dentista;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un dentista por su ID
        SELECT * FROM dentista WHERE id_dentista = p_id_dentista INTO p_persona_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_dentista(INOUT p_id_dentista bigint, IN p_operacion character varying, IN p_persona_id bigint) OWNER TO postgres;

--
-- Name: crud_dentista_horario(bigint, character varying, bigint, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_dentista_horario(INOUT p_id_dentista_horario bigint, IN p_operacion character varying, IN p_dentista_id bigint, IN p_horario_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva dentista_horario
        INSERT INTO dentista_horario(dentista_id, horario_id)
        VALUES (p_dentista_id, p_horario_id)
        RETURNING id_dentista_horario INTO p_id_dentista_horario;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una dentista_horario existente
        UPDATE dentista_horario
        SET dentista_id = p_dentista_id,
            horario_id = p_horario_id
        WHERE id_dentista_horario = p_id_dentista_horario;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una dentista_horario por su ID
        DELETE FROM dentista_horario
        WHERE id_dentista_horario = p_id_dentista_horario;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una dentista_horario por su ID
        SELECT * FROM dentista_horario WHERE id_dentista_horario = p_id_dentista_horario INTO p_id_dentista_horario, p_dentista_id, p_horario_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_dentista_horario(INOUT p_id_dentista_horario bigint, IN p_operacion character varying, IN p_dentista_id bigint, IN p_horario_id bigint) OWNER TO postgres;

--
-- Name: crud_dentista_servicio(bigint, character varying, bigint, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_dentista_servicio(INOUT p_id_dentista_servicio bigint, IN p_operacion character varying, IN p_dentista_id bigint, IN p_servicio_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva dentista_servicio
        INSERT INTO dentista_servicio(dentista_id, servicio_id)
        VALUES (p_dentista_id, p_servicio_id)
        RETURNING id_dentista_servicio INTO p_id_dentista_servicio;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una dentista_servicio existente
        UPDATE dentista_servicio
        SET dentista_id = p_dentista_id,
            servicio_id = p_servicio_id
        WHERE id_dentista_servicio = p_id_dentista_servicio;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una dentista_servicio por su ID
        DELETE FROM dentista_servicio
        WHERE id_dentista_servicio = p_id_dentista_servicio;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una dentista_servicio por su ID
        SELECT * FROM dentista_servicio WHERE id_dentista_servicio = p_id_dentista_servicio INTO p_id_dentista_servicio, p_dentista_id, p_servicio_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_dentista_servicio(INOUT p_id_dentista_servicio bigint, IN p_operacion character varying, IN p_dentista_id bigint, IN p_servicio_id bigint) OWNER TO postgres;

--
-- Name: crud_evaluacion(integer, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_evaluacion(INOUT p_id_evaluacion integer, IN p_operacion character varying, IN p_nombre character varying, IN p_examen_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva evaluación
        INSERT INTO evaluacion(nombre, examen_id)
        VALUES (p_nombre, p_examen_id)
        RETURNING id_evaluacion INTO p_id_evaluacion;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una evaluación existente
        UPDATE evaluacion
        SET nombre = p_nombre,
            examen_id = p_examen_id
        WHERE id_evaluacion = p_id_evaluacion;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una evaluación por su ID
        DELETE FROM evaluacion
        WHERE id_evaluacion = p_id_evaluacion;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una evaluación por su ID
        SELECT * FROM evaluacion WHERE id_evaluacion = p_id_evaluacion INTO p_id_evaluacion, p_nombre, p_examen_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_evaluacion(INOUT p_id_evaluacion integer, IN p_operacion character varying, IN p_nombre character varying, IN p_examen_id bigint) OWNER TO postgres;

--
-- Name: crud_evaluacion(bigint, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_evaluacion(INOUT p_id_evaluacion bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_examen_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva evaluación
        INSERT INTO evaluacion(nombre, examen_id)
        VALUES (p_nombre, p_examen_id)
        RETURNING id_evaluacion INTO p_id_evaluacion;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una evaluación existente
        UPDATE evaluacion
        SET nombre = p_nombre,
            examen_id = p_examen_id
        WHERE id_evaluacion = p_id_evaluacion;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una evaluación por su ID
        DELETE FROM evaluacion
        WHERE id_evaluacion = p_id_evaluacion;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una evaluación por su ID
        SELECT * FROM evaluacion WHERE id_evaluacion = p_id_evaluacion INTO p_id_evaluacion, p_nombre, p_examen_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_evaluacion(INOUT p_id_evaluacion bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_examen_id bigint) OWNER TO postgres;

--
-- Name: crud_evaluacion_hc(bigint, character varying, bigint, date, bigint, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_evaluacion_hc(INOUT p_id_evaluacion_hc bigint, IN p_operacion character varying, IN p_evaluacion_id bigint, IN p_fecha date, IN p_nro_hc bigint, IN p_resultado character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo examen
        INSERT INTO evaluacion_hc(evaluacion_id, fecha, nro_hc, resultado)
        VALUES (p_evaluacion_id, p_fecha, p_nro_hc, p_resultado)
        RETURNING id_evaluacion_hc INTO p_id_evaluacion_hc;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un examen existente
        UPDATE evaluacion_hc
        SET evaluacion_id = p_evaluacion_id,
			fecha = p_fecha,
			nro_hc = p_nro_hc,
			resultado = p_resultado
        WHERE id_evaluacion_hc = p_id_evaluacion_hc;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un examen por su ID
        DELETE FROM evaluacion_hc
        WHERE id_evaluacion_hc = p_id_evaluacion_hc;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un examen por su ID
        SELECT * FROM evaluacion_hc WHERE id_evaluacion_hc = p_id_evaluacion_examen INTO p_evaluacion_id, p_fecha, p_nro_hc, p_resultado;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_evaluacion_hc(INOUT p_id_evaluacion_hc bigint, IN p_operacion character varying, IN p_evaluacion_id bigint, IN p_fecha date, IN p_nro_hc bigint, IN p_resultado character varying) OWNER TO postgres;

--
-- Name: crud_examen(bigint, character varying, character varying, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_examen(INOUT p_id_examen bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_descripcion character varying, IN p_categoria character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo examen
        INSERT INTO examen(nombre, descripcion, categoria)
        VALUES (p_nombre, p_descripcion, p_categoria)
        RETURNING id_examen INTO p_id_examen;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un examen existente
        UPDATE examen
        SET nombre = p_nombre,
            descripcion = p_descripcion,
            categoria = p_categoria
        WHERE id_examen = p_id_examen;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un examen por su ID
        DELETE FROM examen
        WHERE id_examen = p_id_examen;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un examen por su ID
        SELECT * FROM examen WHERE id_examen = p_id_examen INTO p_id_examen, p_nombre, p_descripcion, p_categoria;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_examen(INOUT p_id_examen bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_descripcion character varying, IN p_categoria character varying) OWNER TO postgres;

--
-- Name: crud_historia_clinica(bigint, character varying, character varying, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_historia_clinica(INOUT p_nro_hc bigint, IN p_operacion character varying, IN p_municipio character varying, IN p_establecimiento character varying, IN p_sedes character varying, IN p_paciente_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo examen
        INSERT INTO historia_clinica(municipio, establecimiento, sedes, paciente_id)
        VALUES (p_municipio, p_establecimiento, p_sedes, p_paciente_id)
        RETURNING nro_hc INTO p_nro_hc;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un examen existente
        UPDATE historia_clinica
        SET municipio = p_municipio,
            establecimiento = p_establecimiento,
            sedes = p_sedes,
            paciente_id = p_paciente_id
        WHERE nro_hc = p_nro_hc;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un examen por su ID
        DELETE FROM historia_clinica
        WHERE id_examen = p_id_examen;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un examen por su ID
        SELECT * FROM historia_clinica WHERE nro_hc = p_nro_hc INTO p_nro_hc, p_municipio, p_establecimiento, p_sedes, p_paciente_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_historia_clinica(INOUT p_nro_hc bigint, IN p_operacion character varying, IN p_municipio character varying, IN p_establecimiento character varying, IN p_sedes character varying, IN p_paciente_id bigint) OWNER TO postgres;

--
-- Name: crud_horario(bigint, character varying, time with time zone, date, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_horario(INOUT p_id_horario bigint, IN p_operacion character varying, IN p_hora time with time zone, IN p_fecha date, IN p_turno character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo horario
        INSERT INTO horario(hora, fecha, turno)
        VALUES (p_hora, p_fecha, p_turno)
        RETURNING id_horario INTO p_id_horario;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un horario existente
        UPDATE horario
        SET hora = p_hora,
            fecha = p_fecha,
            turno = p_turno
        WHERE id_horario = p_id_horario;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un horario por su ID
        DELETE FROM horario
        WHERE id_horario = p_id_horario;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un horario por su ID
        SELECT * FROM horario WHERE id_horario = p_id_horario INTO p_id_horario, p_hora, p_fecha, p_turno;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_horario(INOUT p_id_horario bigint, IN p_operacion character varying, IN p_hora time with time zone, IN p_fecha date, IN p_turno character varying) OWNER TO postgres;

--
-- Name: crud_odontograma(bigint, character varying, date, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_odontograma(INOUT p_id_odontograma bigint, IN p_operacion character varying, IN p_fecha date, IN p_nro_hc bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo odontograma
        INSERT INTO odontograma(fecha, nro_hc)
        VALUES (p_fecha, p_nro_hc)
        RETURNING id_odontograma INTO p_id_odontograma;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un odontograma existente
        UPDATE odontograma
        SET fecha = p_fecha,
            nro_hc = p_nro_hc
        WHERE id_odontograma = p_id_odontograma;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un odontograma por su ID
        DELETE FROM odontograma
        WHERE id_odontograma = p_id_odontograma;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un odontograma por su ID
        SELECT * FROM odontograma WHERE id_odontograma = p_id_odontograma INTO p_id_odontograma, p_fecha, p_nro_hc;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_odontograma(INOUT p_id_odontograma bigint, IN p_operacion character varying, IN p_fecha date, IN p_nro_hc bigint) OWNER TO postgres;

--
-- Name: crud_paciente(bigint, character varying, bigint, character varying, character varying, character varying, character varying, character varying, date, character varying, bigint, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_paciente(INOUT p_id_paciente bigint, IN p_operacion character varying, IN p_persona_id bigint, IN p_estado_civil character varying, IN p_nacion_originaria character varying, IN p_grado_educativo character varying, IN p_idioma character varying, IN p_lugar_nacimiento character varying, IN p_fecha_nacimiento date, IN p_ocupacion character varying, IN p_tutor_id bigint, IN p_sexo character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo paciente
        INSERT INTO paciente(persona_id, estado_civil, nacion_originaria, grado_educativo, idioma, lugar_nacimiento, fecha_nacimiento, ocupacion, tutor_id, sexo)
        VALUES (p_persona_id, p_estado_civil, p_nacion_originaria, p_grado_educativo, p_idioma, p_lugar_nacimiento, p_fecha_nacimiento, p_ocupacion, p_tutor_id, p_sexo)
        RETURNING id_paciente INTO p_id_paciente;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un paciente existente
        UPDATE paciente
        SET persona_id = p_persona_id,
			estado_civil = p_estado_civil,
			nacion_originaria = p_nacion_originaria,
			grado_educativo = p_grado_educativo,
			idioma = p_idioma,
			lugar_nacimiento = p_lugar_nacimiento,
			fecha_nacimiento = p_fecha_nacimiento,
			ocupacion = p_ocupacion,
			tutor_id = p_tutor_id,
			sexo = p_se
        WHERE id_paciente = p_id_paciente;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un paciente por su ID
        DELETE FROM paciente
        WHERE id_paciente = p_id_paciente;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un paciente por su ID
        SELECT * FROM paciente WHERE id_paciente = p_id_paciente INTO p_persona_id, p_estado_civil, p_nacion_originaria, p_grado_educativo, p_idioma, p_lugar_nacimiento, p_fecha_nacimiento, p_ocupacion, p_tutor_id, p_sexo;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_paciente(INOUT p_id_paciente bigint, IN p_operacion character varying, IN p_persona_id bigint, IN p_estado_civil character varying, IN p_nacion_originaria character varying, IN p_grado_educativo character varying, IN p_idioma character varying, IN p_lugar_nacimiento character varying, IN p_fecha_nacimiento date, IN p_ocupacion character varying, IN p_tutor_id bigint, IN p_sexo character varying) OWNER TO postgres;

--
-- Name: crud_persona(character varying, bigint, character varying, character varying, character varying, character varying, bigint, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_persona(IN p_operacion character varying, INOUT p_id_persona bigint DEFAULT NULL::bigint, IN p_ci character varying DEFAULT NULL::character varying, IN p_direccion character varying DEFAULT NULL::character varying, IN p_nombre character varying DEFAULT NULL::character varying, IN p_apellidos character varying DEFAULT NULL::character varying, IN p_telefono bigint DEFAULT NULL::bigint, IN p_celular character varying DEFAULT NULL::character varying, IN p_email character varying DEFAULT NULL::character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        INSERT INTO persona(ci, direccion, nombre, apellidos, telefono, celular, email)
        VALUES (p_ci, p_direccion, p_nombre, p_apellidos, p_telefono, p_celular, p_email)
		RETURNING id_persona INTO p_id_persona;
    ELSIF p_operacion = 'READ' THEN
        SELECT * FROM persona WHERE id_persona = p_id_persona;
    ELSIF p_operacion = 'UPDATE' THEN
        UPDATE persona
        SET
            ci = p_ci,
            direccion = p_direccion,
            nombre = p_nombre,
            apellidos = p_apellidos,
            telefono = p_telefono,
            celular = p_celular,
            email = p_email
        WHERE id_persona = p_id_persona;
    ELSIF p_operacion = 'DELETE' THEN
        DELETE FROM persona WHERE id_persona = p_id_persona INTO p_ci, p_direccion, p_nombre, p_apellidos, p_telefono, p_celular, p_email;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Utilice "INSERT", "READ", "UPDATE" o "DELETE".';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_persona(IN p_operacion character varying, INOUT p_id_persona bigint, IN p_ci character varying, IN p_direccion character varying, IN p_nombre character varying, IN p_apellidos character varying, IN p_telefono bigint, IN p_celular character varying, IN p_email character varying) OWNER TO postgres;

--
-- Name: crud_pieza(bigint, character varying, integer, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_pieza(INOUT p_id_pieza bigint, IN p_operacion character varying, IN p_numero integer, IN p_tipo character varying, IN p_nombre character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva pieza dental
        INSERT INTO pieza(numero, tipo, nombre)
        VALUES (p_numero, p_tipo, p_nombre)
        RETURNING id_pieza INTO p_id_pieza;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una pieza dental existente
        UPDATE pieza
        SET numero = p_numero,
            tipo = p_tipo,
            nombre = p_nombre
        WHERE id_pieza = p_id_pieza;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una pieza dental por su ID
        DELETE FROM pieza
        WHERE id_pieza = p_id_pieza;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una pieza dental por su ID
        SELECT * FROM pieza WHERE id_pieza = p_id_pieza INTO p_id_pieza, p_numero, p_tipo, p_nombre;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_pieza(INOUT p_id_pieza bigint, IN p_operacion character varying, IN p_numero integer, IN p_tipo character varying, IN p_nombre character varying) OWNER TO postgres;

--
-- Name: crud_pieza_odontograma(bigint, character varying, bigint, bigint, character varying, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_pieza_odontograma(INOUT p_id_pieza_odontograma bigint, IN p_operacion character varying, IN p_pieza_id bigint, IN p_odontograma_id bigint, IN p_cara character varying, IN p_estado character varying, IN p_observacion character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva pieza dental
        INSERT INTO pieza_odontograma(pieza_id, odontograma_id, cara, estado, observacion)
        VALUES (p_pieza_id, p_odontograma_id, p_cara, p_estado, p_observacion)
        RETURNING id_pieza_odontograma INTO p_id_pieza_odontograma;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una pieza dental existente
        UPDATE pieza_odontograma
        SET pieza_id = p_pieza_id,
			odontograma_id = p_odontograma_id,
			cara = p_cara,
			estado = p_estado,
			observacion = p_observacion
        WHERE id_pieza_odontograma = p_id_pieza_odontograma;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una pieza dental por su ID
        DELETE FROM pieza_odontograma
        WHERE id_pieza_odontograma = p_id_pieza_odontograma;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una pieza dental por su ID
        SELECT * FROM pieza_odontograma WHERE id_pieza = p_id_pieza INTO p_id_pieza_odontograma, p_pieza_id, p_odontograma_id, p_cara, p_estado, p_observacion;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_pieza_odontograma(INOUT p_id_pieza_odontograma bigint, IN p_operacion character varying, IN p_pieza_id bigint, IN p_odontograma_id bigint, IN p_cara character varying, IN p_estado character varying, IN p_observacion character varying) OWNER TO postgres;

--
-- Name: crud_referencia(bigint, character varying, date, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_referencia(INOUT p_id_referencia bigint, IN p_operacion character varying, IN p_fecha date, IN p_motivo character varying, IN p_tipo character varying, IN p_nro_hc bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva referencia
        INSERT INTO referencia(fecha, motivo, tipo, nro_hc)
        VALUES (p_fecha, p_motivo, p_tipo, p_nro_hc)
        RETURNING id_referencia INTO p_id_referencia;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una referencia existente
        UPDATE referencia
        SET fecha = p_fecha,
            motivo = p_motivo,
            tipo = p_tipo,
            nro_hc = p_nro_hc
        WHERE id_referencia = p_id_referencia;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una referencia por su ID
        DELETE FROM referencia
        WHERE id_referencia = p_id_referencia;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una referencia por su ID
        SELECT * FROM referencia WHERE id_referencia = p_id_referencia INTO p_id_referencia, p_fecha, p_motivo, p_tipo, p_nro_hc;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_referencia(INOUT p_id_referencia bigint, IN p_operacion character varying, IN p_fecha date, IN p_motivo character varying, IN p_tipo character varying, IN p_nro_hc bigint) OWNER TO postgres;

--
-- Name: crud_reporte(bigint, character varying, character varying, character varying, character varying, date); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_reporte(INOUT p_id_reporte bigint, IN p_operacion character varying, IN p_tipo character varying, IN p_descripcion character varying, IN p_archivo character varying, IN p_fecha date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo reporte
        INSERT INTO reporte(tipo, descripcion, archivo, fecha)
        VALUES (p_tipo, p_descripcion, p_archivo, p_fecha)
        RETURNING id_reporte INTO p_id_reporte;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un reporte existente
        UPDATE reporte
        SET tipo = p_tipo,
			descripcion = p_descripcion,
			archivo = p_archivo,
			fecha = p_fecha
        WHERE id_reporte = p_id_reporte;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un reporte por su ID
        DELETE FROM reporte
        WHERE id_reporte = p_id_reporte;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un reporte por su ID
        SELECT * FROM reporte WHERE id_reporte = p_id_reporte INTO p_id_reporte, p_tipo, p_descripcion, p_archivo, p_fecha;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_reporte(INOUT p_id_reporte bigint, IN p_operacion character varying, IN p_tipo character varying, IN p_descripcion character varying, IN p_archivo character varying, IN p_fecha date) OWNER TO postgres;

--
-- Name: crud_rol(bigint, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_rol(INOUT p_id_rol bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_descripcion bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar una nueva evaluación
        INSERT INTO rol(nombre, descripcion)
        VALUES (p_nombre, p_descripcion)
        RETURNING id_rol INTO p_id_rol;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar una evaluación existente
        UPDATE rol
        SET nombre = p_nombre,
            descripcion = p_descripcion
        WHERE id_rol = p_id_rol;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar una evaluación por su ID
        DELETE FROM rol
        WHERE id_rol = p_id_rol;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar una evaluación por su ID
        SELECT * FROM rol WHERE id_rol = p_id_rol INTO p_id_rol, p_nombre, p_descripcion;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_rol(INOUT p_id_rol bigint, IN p_operacion character varying, IN p_nombre character varying, IN p_descripcion bigint) OWNER TO postgres;

--
-- Name: crud_servicio(bigint, character varying, character varying, character varying, double precision); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_servicio(INOUT p_id_servicio bigint, IN p_operacion character varying, IN p_tipo character varying, IN p_detalles character varying, IN p_costo double precision)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo servicio
        INSERT INTO servicio(tipo, detalles, costo)
        VALUES (p_tipo, p_detalles, p_costo)
        RETURNING id_servicio INTO p_id_servicio;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un servicio existente
        UPDATE servicio
        SET tipo = p_tipo,
            detalles = p_detalles,
            costo = p_costo
        WHERE id_servicio = p_id_servicio;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un servicio por su ID
        DELETE FROM servicio
        WHERE id_servicio = p_id_servicio;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un servicio por su ID
        SELECT * FROM servicio WHERE id_servicio = p_id_servicio INTO p_id_servicio, p_tipo, p_detalles, p_costo;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_servicio(INOUT p_id_servicio bigint, IN p_operacion character varying, IN p_tipo character varying, IN p_detalles character varying, IN p_costo double precision) OWNER TO postgres;

--
-- Name: crud_tratamiento(bigint, character varying, date, character varying, character varying, double precision, double precision, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_tratamiento(INOUT p_id_tratamiento bigint, IN p_operacion character varying, IN p_fecha date, IN p_observacion character varying, IN p_prescripcion character varying, IN p_cuenta double precision, IN p_saldo double precision, IN p_diagnostico character varying, IN p_nro_hc bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo tratamiento
        INSERT INTO tratamiento(fecha, observacion, prescripcion, cuenta, saldo, diagnostico, nro_hc)
        VALUES (p_fecha, p_observacion, p_prescripcion, p_cuenta, p_saldo, p_diagnostico, p_nro_hc)
        RETURNING id_tratamiento INTO p_id_tratamiento;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un tratamiento existente
        UPDATE tratamiento
        SET fecha = p_fecha,
            observacion = p_observacion,
            prescripcion = p_prescripcion,
            cuenta = p_cuenta,
            saldo = p_saldo,
            diagnostico = p_diagnostico,
            nro_hc = p_nro_hc
        WHERE id_tratamiento = p_id_tratamiento;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un tratamiento por su ID
        DELETE FROM tratamiento
        WHERE id_tratamiento = p_id_tratamiento;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un tratamiento por su ID
        SELECT * FROM tratamiento WHERE id_tratamiento = p_id_tratamiento INTO p_fecha, p_observacion, p_prescripcion, p_cuenta, p_saldo, p_diagnostico, p_nro_hc;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_tratamiento(INOUT p_id_tratamiento bigint, IN p_operacion character varying, IN p_fecha date, IN p_observacion character varying, IN p_prescripcion character varying, IN p_cuenta double precision, IN p_saldo double precision, IN p_diagnostico character varying, IN p_nro_hc bigint) OWNER TO postgres;

--
-- Name: crud_tratamiento_pieza(bigint, character varying, bigint, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_tratamiento_pieza(INOUT p_id_tratamiento_pieza bigint, IN p_operacion character varying, IN p_pieza_id bigint, IN p_tratamiento_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo tratamiento_pieza
        INSERT INTO tratamiento_pieza(pieza_id, tratamiento_id)
        VALUES (p_pieza_id, p_tratamiento_id)
        RETURNING id_tratamiento_pieza INTO p_id_tratamiento_pieza;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un tratamiento_pieza existente
        UPDATE tratamiento_pieza
        SET pieza_id = p_pieza_id,
            tratamiento_id = p_tratamiento_id
        WHERE id_tratamiento_pieza = p_id_tratamiento_pieza;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un tratamiento_pieza por su ID
        DELETE FROM tratamiento_pieza
        WHERE id_tratamiento_pieza = p_id_tratamiento_pieza;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un tratamiento_pieza por su ID
        SELECT * FROM tratamiento_pieza WHERE id_tratamiento_pieza = p_id_tratamiento_pieza INTO p_id_tratamiento_pieza, p_pieza_id, p_tratamiento_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_tratamiento_pieza(INOUT p_id_tratamiento_pieza bigint, IN p_operacion character varying, IN p_pieza_id bigint, IN p_tratamiento_id bigint) OWNER TO postgres;

--
-- Name: crud_tutor(bigint, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_tutor(INOUT p_id_tutor bigint, IN p_operacion character varying, IN p_persona_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_operacion = 'INSERT' THEN
        -- Insertar un nuevo tutor
        INSERT INTO tutor(persona_id)
        VALUES (p_persona_id)
        RETURNING id_tutor INTO p_id_tutor;
    ELSIF p_operacion = 'UPDATE' THEN
        -- Actualizar un tutor existente
        UPDATE tutor
        SET persona_id = p_persona_id
        WHERE id_tutor = p_id_tutor;
    ELSIF p_operacion = 'DELETE' THEN
        -- Eliminar un tutor por su ID
        DELETE FROM tutor
        WHERE id_tutor = p_id_tutor;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un tutor por su ID
        SELECT * FROM tutor WHERE id_tutor = p_id_tutor INTO p_id_tutor, p_persona_id;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_tutor(INOUT p_id_tutor bigint, IN p_operacion character varying, IN p_persona_id bigint) OWNER TO postgres;

--
-- Name: crud_usuario(bigint, character varying, bigint, character varying, character varying, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.crud_usuario(INOUT p_id_usuario bigint, IN p_operation character varying, IN p_persona_id bigint, IN p_nombre_usuario character varying, IN p_clave character varying, IN p_rol_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF operation = 'INSERT' THEN
        INSERT INTO usuario (persona_id, nombre_usuario, clave, rol_id)
		VALUES (p_persona_id, p_nombre_usuario, p_clave, p_rol_id)
		RETURNING id_usuario INTO p_id_usuario;
    ELSIF operation = 'UPDATE' THEN
        UPDATE usuario SET nombre_usuario = p_nombre_usuario, clave = p_clave, rol_i=p_rol_id WHERE id_usuario = p_id_usuario;
    ELSIF operation = 'DELETE' THEN
        DELETE FROM usuario WHERE id_usuario = p_id_usuario;
    ELSIF p_operacion = 'READ' THEN
        -- Consultar un tutor por su ID
        SELECT * FROM usuario WHERE id_usuario = p_id_usuario;
    ELSE
        RAISE EXCEPTION 'Operación no válida. Las operaciones válidas son: INSERT, UPDATE, DELETE, READ';
    END IF;
END;
$$;


ALTER PROCEDURE public.crud_usuario(INOUT p_id_usuario bigint, IN p_operation character varying, IN p_persona_id bigint, IN p_nombre_usuario character varying, IN p_clave character varying, IN p_rol_id bigint) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;


--
-- PostgreSQL database dump complete
--

