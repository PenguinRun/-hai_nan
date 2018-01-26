--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events (
    id uuid NOT NULL,
    target_id uuid,
    title character varying(255),
    description text,
    contact character varying(255),
    date_time timestamp with time zone,
    place character varying(255),
    ref_url character varying(255),
    created_by uuid,
    created timestamp with time zone,
    modified_by uuid,
    modified timestamp with time zone
);


ALTER TABLE events OWNER TO postgres;

--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE members (
    id uuid NOT NULL,
    fb_id bigint,
    email character varying(128),
    password character(64),
    created timestamp with time zone,
    modified timestamp with time zone
);


ALTER TABLE members OWNER TO postgres;

--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reports (
    id uuid NOT NULL,
    target_id uuid,
    description character varying(255),
    image_url character varying(255),
    is_open boolean,
    created_by uuid,
    created timestamp with time zone,
    modified_by uuid,
    modified timestamp with time zone
);


ALTER TABLE reports OWNER TO postgres;

--
-- Name: targets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE targets (
    id uuid NOT NULL,
    title character varying(128),
    description character varying(255),
    geojson text,
    ref_url character varying(255),
    is_open boolean,
    created_by uuid,
    created timestamp with time zone,
    modified_by uuid,
    modified timestamp with time zone,
    point point
);


ALTER TABLE targets OWNER TO postgres;

--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (id, target_id, title, description, contact, date_time, place, ref_url, created_by, created, modified_by, modified) FROM stdin;
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY members (id, fb_id, email, password, created, modified) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY reports (id, target_id, description, image_url, is_open, created_by, created, modified_by, modified) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY spatial_ref_sys  FROM stdin;
\.


--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY targets (id, title, description, geojson, ref_url, is_open, created_by, created, modified_by, modified, point) FROM stdin;
\.


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: targets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY targets
    ADD CONSTRAINT targets_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

