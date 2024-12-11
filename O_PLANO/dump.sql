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
-- Name: listar_noticias; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.listar_noticias AS
 SELECT n.id,
    autor.nome AS autor,
    n.titulo,
    n.conteudo,
    n.image_url AS imagem,
    to_char(n.data_publicacao, 'DD-MM-YYYY HH24:MI:SS'::text) AS data_publicacao,
    to_char(n.updated_at, 'DD-MM-YYYY HH24:MI:SS'::text) AS atualizado_em
   FROM (public.noticias n
     JOIN public.usuarios autor ON ((autor.id = n.usuario_id)));


ALTER VIEW public.listar_noticias OWNER TO postgres;

--
-- Name: pre_cadastro_admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pre_cadastro_admin (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(100) NOT NULL,
    status boolean DEFAULT true,
    data_criacao timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_superadmin_criador uuid NOT NULL,
    id_superadmin_modificador uuid
);


ALTER TABLE public.pre_cadastro_admin OWNER TO postgres;

--
-- Name: verificar_email_autorizado; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.verificar_email_autorizado AS
 SELECT pca.id,
    pca.email,
    pca.status,
    to_char(pca.data_criacao, 'DD-MM-YYYY HH24:MI:SS'::text) AS data_criacao,
    to_char(pca.updated_at, 'DD-MM-YYYY HH24:MI:SS'::text) AS atualizado_em,
    criador.nome AS criador_por,
    modificador.nome AS atualizado_por
   FROM ((public.pre_cadastro_admin pca
     LEFT JOIN public.usuarios criador ON ((criador.id = pca.id_superadmin_criador)))
     LEFT JOIN public.usuarios modificador ON ((modificador.id = pca.id_superadmin_modificador)));


ALTER VIEW public.verificar_email_autorizado OWNER TO postgres;

--
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.noticias (id, usuario_id, titulo, conteudo, image_url, data_publicacao, updated_at) FROM stdin;
420caf32-4a1d-4467-a188-16493565e20f	727fefef-5b37-453f-b15c-25bc1a9328ab	Meu titulo	Lorem ipsum dolor isit vercum dolor..	http://thumb.png	2024-12-08 15:18:52.803401	2024-12-08 15:18:52.803401
1e23b769-b411-40ad-af1b-833ab6564593	727fefef-5b37-453f-b15c-25bc1a9328ab	Neque porro quisquam	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget placerat purus, pellentesque volutpat urna. Integer ullamcorper diam id felis ornare lacinia. In ut justo orci. Praesent viverra ante sit amet neque feugiat, vel fermentum nisi egestas. Sed lobortis, nibh sit amet molestie venenatis, odio nulla finibus massa, at cursus metus enim ut orci. Pellentesque luctus cursus leo non ultricies. Nullam nec ipsum eu augue elementum tincidunt. Integer sit amet vestibulum nisi. Praesent eget tortor dui. Donec sit amet nibh nisi. Pellentesque in ipsum placerat, rhoncus massa in, congue dui. Cras laoreet dui id arcu consectetur imperdiet. Sed dignissim luctus dui, et aliquet diam semper sit amet. Etiam vel leo ante. Nunc pharetra dignissim tellus, et malesuada orci fringilla eget. Maecenas feugiat tortor id ipsum bibendum feugiat.	https://waz.vtexassets.com/arquivos/ids/228967/127502-1-Placa_de_video_NVIDIA_GeForce_RTX4080_Super_16GB_PNY_XLR8_Gaming_VERTO_EPICX_RGB_OC_Triple_Fan_VCG4080S16TFXXPB1_O_127502.jpg?v=638472332031430000	2024-12-08 15:35:52.494548	2024-12-08 15:35:52.494548
\.


--
-- Data for Name: pre_cadastro_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pre_cadastro_admin (id, email, status, data_criacao, updated_at, id_superadmin_criador, id_superadmin_modificador) FROM stdin;
97cb3181-2de9-454c-9410-6d6cbe4007cb	auttor01@gmail.com	t	2024-12-05 20:36:11.980904-03	2024-12-05 20:56:46.995089-03	727fefef-5b37-453f-b15c-25bc1a9328ab	d9888ac3-db10-401f-b5e7-57cd81aa1fab
9ca1508e-0acd-45a0-9ca4-be2667c1050b	autor02@gmail.com	t	2024-12-05 21:42:50.028164-03	2024-12-05 21:42:50.028164-03	d9888ac3-db10-401f-b5e7-57cd81aa1fab	\N
39bc2bee-2b5b-4d71-849b-748edd0ec54a	zemane@gmail.com	f	2024-12-05 21:44:45.060353-03	2024-12-06 15:58:51.369892-03	727fefef-5b37-453f-b15c-25bc1a9328ab	d9888ac3-db10-401f-b5e7-57cd81aa1fab
ad9dbf2f-4ee8-4440-87cc-4ead29de6547	teste02@gmail.com	t	2024-12-06 16:06:04.843736-03	2024-12-06 17:02:14.723527-03	d9888ac3-db10-401f-b5e7-57cd81aa1fab	d9888ac3-db10-401f-b5e7-57cd81aa1fab
438188ef-bc2d-4404-923a-36338dba553c	autor007@gmail.com	t	2024-12-08 13:40:00.622734-03	2024-12-08 14:01:13.773181-03	727fefef-5b37-453f-b15c-25bc1a9328ab	727fefef-5b37-453f-b15c-25bc1a9328ab
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, senha, data_criacao, role) FROM stdin;
727fefef-5b37-453f-b15c-25bc1a9328ab	kal	kal@gmail.com	$2b$12$cwRsUU3GfbAWbCFBE7SLQO5qKwHJp3izRBNct0t8xogE5ZxaehqAO	2024-12-04 18:09:53.508422-03	superAdmin
d9888ac3-db10-401f-b5e7-57cd81aa1fab	Super Admin	superadmin@gmail.com	$2b$12$JG1Vu8qvV/yR74I4iMBkWex1g914vtwDXErIgERUgIzSbd7oq3zAO	2024-12-04 19:11:37.621434-03	superAdmin
32c4a326-5f75-4d15-8df1-cba58034b6d2	Zé Mané	ze@gmail.com	$2b$12$W3FL1kF88pKvBwodvmNJFu1ncQWDrGKCQsIX0IdNWQiRgaT4cuAci	2024-12-04 20:38:17.974972-03	admin
f981d418-5060-4d83-b0d6-cc7200ead7b1	teste02	teste02@gmail.com	$2b$12$D49T5/ZsA.GE3k5kTm1pNu79ztWfQeHrgNJtP5Y2US3BFYIp5umZ6	2024-12-06 16:13:33.792016-03	admin
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

