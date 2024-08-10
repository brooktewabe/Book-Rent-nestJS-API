--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Earning; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Earning" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public."Earning" OWNER TO postgres;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "bookId" integer NOT NULL,
    category text NOT NULL,
    "bookName" text NOT NULL,
    author text NOT NULL,
    "NoOfCopies" text NOT NULL,
    status text DEFAULT 'Active'::text NOT NULL,
    "uploadedAt" text NOT NULL,
    book text NOT NULL,
    "rentPrice" text NOT NULL,
    cover text NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_bookId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."books_bookId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."books_bookId_seq" OWNER TO postgres;

--
-- Name: books_bookId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."books_bookId_seq" OWNED BY public.books."bookId";


--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    location text NOT NULL,
    "phoneNo" character varying NOT NULL,
    role text NOT NULL,
    uploads text DEFAULT '0'::text NOT NULL,
    status text DEFAULT 'Active'::text NOT NULL,
    "isApproved" text DEFAULT false NOT NULL
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_id_seq OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- Name: books bookId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN "bookId" SET DEFAULT nextval('public."books_bookId_seq"'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- Data for Name: Earning; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Earning" (id) FROM stdin;
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, "bookId", category, "bookName", author, "NoOfCopies", status, "uploadedAt", book, "rentPrice", cover) FROM stdin;
078cab0c-e752-4577-904b-fef2afdcc17c	1	Fiction	Dertogada	Yismake	4	Active	2024-08-10T06:43:09.344Z	icon.png	5	NetBeans-LabM-4 Java FileIO.pdf
bc13569a-00c0-444b-94ae-d9da740e2ebf	2	Self Help	The power of Now	Michael	4	Active	2024-08-10T06:43:40.568Z	icon.png	5	NetBeans-LabM-4 Java FileIO.pdf
821a99db-7f22-4f91-b7c6-6e93d4b4fdf4	3	Business	Business 101	Michael	10	Active	2024-08-10T06:44:10.239Z	icon.png	10	NetBeans-LabM-4 Java FileIO.pdf
0a3ae9a7-6295-45c6-8e8e-93c9b7f38905	4	Business	Algorithm basics	Russ	1	Active	2024-08-10T06:45:08.031Z	icon.png	9	NetBeans-LabM-3 Swing Components.pdf
feed5020-5e7c-45e3-94c8-171c96cf0621	6	Fiction	Flying cars	AD	10	Rented	01/01/01	9mLROyNReuC1oYrKsU8vVy4GtIJiQaK3ztdTfCz0Nk4alwEsDRQgZwDajtf5P7c6kEGv3H-Q6A66uBO3PZpEFHf8I7VJFQZ8U04yghLTRG9d.pdf	100	4c8ed09b11cd334ec7a9766b71188b62.pdf
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, email, password, location, "phoneNo", role, uploads, status, "isApproved") FROM stdin;
1	owner1@example.com	$2b$12$O0l/4b8hD5AOrVyvFEnPTesaFHQUau3gYPRurPD4xpGBHAGYV84XW	Addis Ababa	924785928	book_owner	0	Active	false
2	owner2@example.com	$2b$12$mTQWnXphCACHrf6LRDNdDerOnabYl1jbI5zC85sZaevwD5zqg1oou	Addis Ababa	924785928	book_owner	0	Active	false
3	admin@example.com	$2b$12$IQ7I6WLZP7C7xBAv5SnvEON8jmNSj567lpzjxi4DWKByp/.nq/W4G	Addis Ababa	924785928	admin	0	Active	false
4	admin2@example.com	$2b$12$03FSIm.lycBRtgXXNoOuQe9vHRwxXUjOqHAmGJr5fov92MNfuUk7u	Addis Ababa	0919191919	admin	0	Active	false
\.


--
-- Name: books_bookId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."books_bookId_seq"', 6, true);


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 4, true);


--
-- Name: books PK_18909ccb2593c2a6f5f7a042862; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "PK_18909ccb2593c2a6f5f7a042862" PRIMARY KEY (id, "bookId");


--
-- Name: profile PK_3dd8bfc97e4a77c70971591bdcb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY (id);


--
-- Name: Earning PK_97a5fb543d40c77e7635d334fcf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Earning"
    ADD CONSTRAINT "PK_97a5fb543d40c77e7635d334fcf" PRIMARY KEY (id);


--
-- Name: profile UQ_3825121222d5c17741373d8ad13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "UQ_3825121222d5c17741373d8ad13" UNIQUE (email);


--
-- PostgreSQL database dump complete
--

