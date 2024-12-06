--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Ip5EZPQZJP3ZkxRURrbmZQ==$iNAdlXdu9gdIPMho3LI3/odqbdLPE6gAKAGKcNTBkOM=:SvPbqaZfv+thkrNXl8BkFdxUF6EaxnhQkVyZU7jAS+I=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "o_plano" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: o_plano; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE o_plano WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE o_plano OWNER TO postgres;

\connect o_plano

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	NEW.updated_at = 	CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: noticias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.noticias (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid DEFAULT 'd9888ac3-db10-401f-b5e7-57cd81aa1fab'::uuid NOT NULL,
    titulo character varying(255) NOT NULL,
    conteudo text NOT NULL,
    image_url character varying(255),
    data_publicacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.noticias OWNER TO postgres;

--
-- Name: pre_cadastro_admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pre_cadastro_admin (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(100) NOT NULL,
    status boolean DEFAULT true,
    data_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_superadmin_criador uuid NOT NULL,
    id_superadmin_modificador uuid
);


ALTER TABLE public.pre_cadastro_admin OWNER TO postgres;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(70) NOT NULL,
    data_criacao timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    role character varying(10) DEFAULT 'admin'::character varying,
    CONSTRAINT usuarios_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'superAdmin'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.noticias (id, usuario_id, titulo, conteudo, image_url, data_publicacao, updated_at) FROM stdin;
\.


--
-- Data for Name: pre_cadastro_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pre_cadastro_admin (id, email, status, data_criacao, updated_at, id_superadmin_criador, id_superadmin_modificador) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, senha, data_criacao, role) FROM stdin;
727fefef-5b37-453f-b15c-25bc1a9328ab	kal	kal@gmail.com	$2b$12$cwRsUU3GfbAWbCFBE7SLQO5qKwHJp3izRBNct0t8xogE5ZxaehqAO	2024-12-04 21:09:53.508422+00	superAdmin
d9888ac3-db10-401f-b5e7-57cd81aa1fab	Super Admin	superadmin@gmail.com	$2b$12$JG1Vu8qvV/yR74I4iMBkWex1g914vtwDXErIgERUgIzSbd7oq3zAO	2024-12-04 22:11:37.621434+00	superAdmin
32c4a326-5f75-4d15-8df1-cba58034b6d2	Z├® Man├®	ze@gmail.com	$2b$12$W3FL1kF88pKvBwodvmNJFu1ncQWDrGKCQsIX0IdNWQiRgaT4cuAci	2024-12-04 23:38:17.974972+00	admin
\.


--
-- Name: noticias noticias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_pkey PRIMARY KEY (id);


--
-- Name: pre_cadastro_admin pre_cadastro_admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_cadastro_admin
    ADD CONSTRAINT pre_cadastro_admin_email_key UNIQUE (email);


--
-- Name: pre_cadastro_admin pre_cadastro_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_cadastro_admin
    ADD CONSTRAINT pre_cadastro_admin_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: noticias set_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.noticias FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: pre_cadastro_admin set_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.pre_cadastro_admin FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: noticias fk_autor_publicacao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT fk_autor_publicacao FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET DEFAULT;


--
-- Name: pre_cadastro_admin pre_cadastro_admin_id_superadmin_criador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_cadastro_admin
    ADD CONSTRAINT pre_cadastro_admin_id_superadmin_criador_fkey FOREIGN KEY (id_superadmin_criador) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: pre_cadastro_admin pre_cadastro_admin_id_superadmin_modificador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_cadastro_admin
    ADD CONSTRAINT pre_cadastro_admin_id_superadmin_modificador_fkey FOREIGN KEY (id_superadmin_modificador) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

