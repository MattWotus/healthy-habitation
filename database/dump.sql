--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
4	2020-09-29 00:21:00.810209+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Face Mask - 4 Pack	1199	/images/face-mask.png	Dynamic Stay protected with surgical face masks.	Keep you and your family protected from airborne germs and diseases with this four-pack of surgical face masks. Comfy and made to fit all face shapes and sizes, these masks will cover your both your nose and mouth if worn properly. Don't take any chances during the ongoing global pandemic, so stay safe and wear a mask.
2	Gloves - 20 Pack	1799	/images/gloves.png	Keep your hands away from germs with surgical gloves.	Keep you and your family protected from germ-filled surfaces with this 20-pack of surgical gloves. Comfy and made to fit all hand sizes, these gloves are the perfect protection for your hands when you're out running errands.
3	Hand Sanitzer - 5 Pack	2499	/images/hand-sanitizer.png	The perfect way to keep your hands clean.	Stay protected against germs with this five-pack of hand sanitizer bottles. Perfect for your home, the sanitizer kills 99.99% of germs and keeps your hands feeling soft. Each bottle contains eight fluid ounces of sanitizer.
4	On-The-Go Hand Sanitizer - 8 Pack	2100	/images/mini-hand-sanitizier.png	Keep your hands clean while out running errands.	Stay protected against germs while out running errands with this eight-pack of on-the-go hand sanitizer bottles. Perfect for your home, the sanitizer kills 99.99% of germs and contains moisturizers and vitamin E to keep your hands feeling soft. Each bottle contains 0.5 fluid ounces of sanitizer.
5	UV Cell Phone Sanitizier	7699	/images/phone-sanitizer.png	Sanitize your phone safely and thoroughly in under five minutes.	A better option than chemical wipes, this UV Cell Phone Sanitizer uses two UV-C builbs to clean your phone in impressive speed. It kills 99.99% of bacteria in just five minutes, all while charging your phone. UV-C light destroys germs by breaking apart their DNA, resulting in the germs inability to function or reproduce.
6	UV Sanitizier	18000	/images/sanitizing-box.png	Sanitize anything from face masks to a tablet with this spacious UV Sanitizer.  	Using two large UV-C lights and a reflective inner surface, this UV Sanitizer kills 99.9% of germs in as little as 15 minutes. With a spacious interior, it can sanitize items such as face masks, toys, bottles, tablets, remote controls, and more. No family should be without such a powerful sanitizer during the ongoing global pandemic.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 105, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 7, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 3, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

