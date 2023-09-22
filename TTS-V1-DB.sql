PGDMP     *                    {            tts    14.7    14.7 e    m           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            n           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            o           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            p           1262    58865    tts    DATABASE     _   CREATE DATABASE tts WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE tts;
                postgres    false            �            1255    58866 �   employeepassword(integer, integer, character varying, character varying, date, character varying, character varying, character varying) 	   PROCEDURE     �  CREATE PROCEDURE public.employeepassword(IN p_countryid integer, IN p_companyid integer, IN p_firstname character varying, IN p_lastname character varying, IN p_dob date, IN p_email character varying, IN p_username character varying, IN p_password character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_empid integer;
BEGIN
  -- Insert into employee table and get the empid
  INSERT INTO employee (countryid, companyid, firstname, lastname, dob, email)
  VALUES (p_countryid, p_companyid, p_firstname, p_lastname, p_dob, p_email)
  RETURNING id INTO v_empid;

  -- Insert into password table with the retrieved empid
  INSERT INTO password (empid, username, password)
  VALUES (v_empid, p_username, p_password);
END;
$$;
 
  DROP PROCEDURE public.employeepassword(IN p_countryid integer, IN p_companyid integer, IN p_firstname character varying, IN p_lastname character varying, IN p_dob date, IN p_email character varying, IN p_username character varying, IN p_password character varying);
       public          postgres    false            �            1259    58867    company    TABLE     b  CREATE TABLE public.company (
    id integer NOT NULL,
    code character varying(25) NOT NULL,
    name character varying(50) NOT NULL,
    contactemail character varying(50) NOT NULL,
    contactphone character varying(50) NOT NULL,
    address character varying(255) NOT NULL,
    zip character varying(10) NOT NULL,
    countryid integer NOT NULL
);
    DROP TABLE public.company;
       public         heap    postgres    false            �            1259    58870    company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.company_id_seq;
       public          postgres    false    209            q           0    0    company_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;
          public          postgres    false    210            �            1259    58871    companyphotos    TABLE     �   CREATE TABLE public.companyphotos (
    id integer NOT NULL,
    companyid integer NOT NULL,
    filename character varying(50) NOT NULL
);
 !   DROP TABLE public.companyphotos;
       public         heap    postgres    false            �            1259    58874    companyphotos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.companyphotos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.companyphotos_id_seq;
       public          postgres    false    211            r           0    0    companyphotos_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.companyphotos_id_seq OWNED BY public.companyphotos.id;
          public          postgres    false    212            �            1259    58875    country    TABLE     }   CREATE TABLE public.country (
    id integer NOT NULL,
    code integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false            �            1259    58878    country_id_seq    SEQUENCE     �   CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.country_id_seq;
       public          postgres    false    213            s           0    0    country_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;
          public          postgres    false    214            �            1259    58879    employee    TABLE     B  CREATE TABLE public.employee (
    id integer NOT NULL,
    countryid integer NOT NULL,
    companyid integer NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    dob timestamp without time zone NOT NULL,
    email character varying(50) NOT NULL,
    isadmin boolean
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    58882    employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.employee_id_seq;
       public          postgres    false    215            t           0    0    employee_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;
          public          postgres    false    216            �            1259    58883    employeephotos    TABLE     �   CREATE TABLE public.employeephotos (
    id integer NOT NULL,
    employeeid integer NOT NULL,
    filename character varying(50) NOT NULL
);
 "   DROP TABLE public.employeephotos;
       public         heap    postgres    false            �            1259    58886    employeephotos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employeephotos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.employeephotos_id_seq;
       public          postgres    false    217            u           0    0    employeephotos_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.employeephotos_id_seq OWNED BY public.employeephotos.id;
          public          postgres    false    218            �            1259    58887    password    TABLE     �   CREATE TABLE public.password (
    id integer NOT NULL,
    empid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public.password;
       public         heap    postgres    false            �            1259    58890    password_id_seq    SEQUENCE     �   CREATE SEQUENCE public.password_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.password_id_seq;
       public          postgres    false    219            v           0    0    password_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.password_id_seq OWNED BY public.password.id;
          public          postgres    false    220            �            1259    58891    reason    TABLE       CREATE TABLE public.reason (
    id integer NOT NULL,
    taskid integer NOT NULL,
    employeeid integer NOT NULL,
    chgdatetime timestamp with time zone NOT NULL,
    reason character varying(250) NOT NULL,
    statusid integer NOT NULL,
    assignedto integer NOT NULL
);
    DROP TABLE public.reason;
       public         heap    postgres    false            �            1259    58894    reason_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reason_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reason_id_seq;
       public          postgres    false    221            w           0    0    reason_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reason_id_seq OWNED BY public.reason.id;
          public          postgres    false    222            �            1259    58895    status    TABLE     �   CREATE TABLE public.status (
    id integer NOT NULL,
    code character varying(25) NOT NULL,
    description character varying(255) NOT NULL,
    statusorder integer NOT NULL
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    58898    status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.status_id_seq;
       public          postgres    false    223            x           0    0    status_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;
          public          postgres    false    224            �            1259    58899    task    TABLE     �  CREATE TABLE public.task (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255) NOT NULL,
    createdby integer NOT NULL,
    assignedto integer NOT NULL,
    status integer NOT NULL,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone NOT NULL,
    actualstartdate timestamp with time zone,
    actualenddate timestamp with time zone,
    parent integer,
    companyid integer NOT NULL,
    havingchild boolean
);
    DROP TABLE public.task;
       public         heap    postgres    false            �            1259    58902    task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.task_id_seq;
       public          postgres    false    225            y           0    0    task_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;
          public          postgres    false    226            �            1259    58903    taskattachment    TABLE     �   CREATE TABLE public.taskattachment (
    id integer NOT NULL,
    taskid integer NOT NULL,
    attachedby integer NOT NULL,
    filename character varying(250) NOT NULL
);
 "   DROP TABLE public.taskattachment;
       public         heap    postgres    false            �            1259    58906    taskattachment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.taskattachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.taskattachment_id_seq;
       public          postgres    false    227            z           0    0    taskattachment_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.taskattachment_id_seq OWNED BY public.taskattachment.id;
          public          postgres    false    228            �           2604    58907 
   company id    DEFAULT     h   ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
 9   ALTER TABLE public.company ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �           2604    58908    companyphotos id    DEFAULT     t   ALTER TABLE ONLY public.companyphotos ALTER COLUMN id SET DEFAULT nextval('public.companyphotos_id_seq'::regclass);
 ?   ALTER TABLE public.companyphotos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211            �           2604    58909 
   country id    DEFAULT     h   ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);
 9   ALTER TABLE public.country ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213            �           2604    58910    employee id    DEFAULT     j   ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);
 :   ALTER TABLE public.employee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    58911    employeephotos id    DEFAULT     v   ALTER TABLE ONLY public.employeephotos ALTER COLUMN id SET DEFAULT nextval('public.employeephotos_id_seq'::regclass);
 @   ALTER TABLE public.employeephotos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    58912    password id    DEFAULT     j   ALTER TABLE ONLY public.password ALTER COLUMN id SET DEFAULT nextval('public.password_id_seq'::regclass);
 :   ALTER TABLE public.password ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    58913 	   reason id    DEFAULT     f   ALTER TABLE ONLY public.reason ALTER COLUMN id SET DEFAULT nextval('public.reason_id_seq'::regclass);
 8   ALTER TABLE public.reason ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    58914 	   status id    DEFAULT     f   ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);
 8   ALTER TABLE public.status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    58915    task id    DEFAULT     b   ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);
 6   ALTER TABLE public.task ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    58916    taskattachment id    DEFAULT     v   ALTER TABLE ONLY public.taskattachment ALTER COLUMN id SET DEFAULT nextval('public.taskattachment_id_seq'::regclass);
 @   ALTER TABLE public.taskattachment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            W          0    58867    company 
   TABLE DATA           f   COPY public.company (id, code, name, contactemail, contactphone, address, zip, countryid) FROM stdin;
    public          postgres    false    209   �}       Y          0    58871    companyphotos 
   TABLE DATA           @   COPY public.companyphotos (id, companyid, filename) FROM stdin;
    public          postgres    false    211   z~       [          0    58875    country 
   TABLE DATA           1   COPY public.country (id, code, name) FROM stdin;
    public          postgres    false    213   �~       ]          0    58879    employee 
   TABLE DATA           f   COPY public.employee (id, countryid, companyid, firstname, lastname, dob, email, isadmin) FROM stdin;
    public          postgres    false    215   0       _          0    58883    employeephotos 
   TABLE DATA           B   COPY public.employeephotos (id, employeeid, filename) FROM stdin;
    public          postgres    false    217   
�       a          0    58887    password 
   TABLE DATA           A   COPY public.password (id, empid, username, password) FROM stdin;
    public          postgres    false    219   ��       c          0    58891    reason 
   TABLE DATA           c   COPY public.reason (id, taskid, employeeid, chgdatetime, reason, statusid, assignedto) FROM stdin;
    public          postgres    false    221   *�       e          0    58895    status 
   TABLE DATA           D   COPY public.status (id, code, description, statusorder) FROM stdin;
    public          postgres    false    223   ��       g          0    58899    task 
   TABLE DATA           �   COPY public.task (id, name, description, createdby, assignedto, status, startdate, enddate, actualstartdate, actualenddate, parent, companyid, havingchild) FROM stdin;
    public          postgres    false    225   y�       i          0    58903    taskattachment 
   TABLE DATA           J   COPY public.taskattachment (id, taskid, attachedby, filename) FROM stdin;
    public          postgres    false    227   g�       {           0    0    company_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.company_id_seq', 74, true);
          public          postgres    false    210            |           0    0    companyphotos_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.companyphotos_id_seq', 48, true);
          public          postgres    false    212            }           0    0    country_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.country_id_seq', 84, true);
          public          postgres    false    214            ~           0    0    employee_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.employee_id_seq', 287, true);
          public          postgres    false    216                       0    0    employeephotos_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.employeephotos_id_seq', 68, true);
          public          postgres    false    218            �           0    0    password_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.password_id_seq', 122, true);
          public          postgres    false    220            �           0    0    reason_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reason_id_seq', 320, true);
          public          postgres    false    222            �           0    0    status_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.status_id_seq', 9, true);
          public          postgres    false    224            �           0    0    task_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.task_id_seq', 161, true);
          public          postgres    false    226            �           0    0    taskattachment_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.taskattachment_id_seq', 28, true);
          public          postgres    false    228            �           2606    58918    company Company_code_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.company
    ADD CONSTRAINT "Company_code_key" UNIQUE (code);
 D   ALTER TABLE ONLY public.company DROP CONSTRAINT "Company_code_key";
       public            postgres    false    209            �           2606    58920     company Company_contactemail_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.company
    ADD CONSTRAINT "Company_contactemail_key" UNIQUE (contactemail);
 L   ALTER TABLE ONLY public.company DROP CONSTRAINT "Company_contactemail_key";
       public            postgres    false    209            �           2606    58922    company Company_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.company
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.company DROP CONSTRAINT "Company_pkey";
       public            postgres    false    209            �           2606    58924    country Country_code_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.country
    ADD CONSTRAINT "Country_code_key" UNIQUE (code);
 D   ALTER TABLE ONLY public.country DROP CONSTRAINT "Country_code_key";
       public            postgres    false    213            �           2606    58926    country Country_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.country
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.country DROP CONSTRAINT "Country_pkey";
       public            postgres    false    213            �           2606    58928    employee Employee_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "Employee_email_key" UNIQUE (email);
 G   ALTER TABLE ONLY public.employee DROP CONSTRAINT "Employee_email_key";
       public            postgres    false    215            �           2606    58930    employee Employee_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.employee DROP CONSTRAINT "Employee_pkey";
       public            postgres    false    215            �           2606    58932    password Password_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.password
    ADD CONSTRAINT "Password_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.password DROP CONSTRAINT "Password_pkey";
       public            postgres    false    219            �           2606    58934    password Password_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.password
    ADD CONSTRAINT "Password_username_key" UNIQUE (username);
 J   ALTER TABLE ONLY public.password DROP CONSTRAINT "Password_username_key";
       public            postgres    false    219            �           2606    58936    status Status_code_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.status
    ADD CONSTRAINT "Status_code_key" UNIQUE (code);
 B   ALTER TABLE ONLY public.status DROP CONSTRAINT "Status_code_key";
       public            postgres    false    223            �           2606    58938    status Status_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.status
    ADD CONSTRAINT "Status_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.status DROP CONSTRAINT "Status_pkey";
       public            postgres    false    223            �           2606    58940    task Task_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.task DROP CONSTRAINT "Task_pkey";
       public            postgres    false    225            �           2606    58942     company company_contactphone_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_contactphone_key UNIQUE (contactphone);
 J   ALTER TABLE ONLY public.company DROP CONSTRAINT company_contactphone_key;
       public            postgres    false    209            �           2606    58944    company company_name_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_name_key UNIQUE (name);
 B   ALTER TABLE ONLY public.company DROP CONSTRAINT company_name_key;
       public            postgres    false    209            �           2606    58946     companyphotos companyphotos_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.companyphotos
    ADD CONSTRAINT companyphotos_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.companyphotos DROP CONSTRAINT companyphotos_pkey;
       public            postgres    false    211            �           2606    58948    country country_name_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_name_key UNIQUE (name);
 B   ALTER TABLE ONLY public.country DROP CONSTRAINT country_name_key;
       public            postgres    false    213            �           2606    58950 ,   employeephotos employeephotos_employeeid_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.employeephotos
    ADD CONSTRAINT employeephotos_employeeid_key UNIQUE (employeeid);
 V   ALTER TABLE ONLY public.employeephotos DROP CONSTRAINT employeephotos_employeeid_key;
       public            postgres    false    217            �           2606    58952 "   employeephotos employeephotos_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.employeephotos
    ADD CONSTRAINT employeephotos_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.employeephotos DROP CONSTRAINT employeephotos_pkey;
       public            postgres    false    217            �           2606    58954    reason reason_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reason
    ADD CONSTRAINT reason_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reason DROP CONSTRAINT reason_pkey;
       public            postgres    false    221            �           2606    58956 "   taskattachment taskattachment_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.taskattachment
    ADD CONSTRAINT taskattachment_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.taskattachment DROP CONSTRAINT taskattachment_pkey;
       public            postgres    false    227            �           2606    58957    company Company_countryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.company
    ADD CONSTRAINT "Company_countryid_fkey" FOREIGN KEY (countryid) REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.company DROP CONSTRAINT "Company_countryid_fkey";
       public          postgres    false    3235    213    209            �           2606    58962     employee Employee_companyid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "Employee_companyid_fkey" FOREIGN KEY (companyid) REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.employee DROP CONSTRAINT "Employee_companyid_fkey";
       public          postgres    false    209    3225    215            �           2606    58967     employee Employee_countryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "Employee_countryid_fkey" FOREIGN KEY (countryid) REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.employee DROP CONSTRAINT "Employee_countryid_fkey";
       public          postgres    false    215    3235    213            �           2606    58972    password Password_empid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.password
    ADD CONSTRAINT "Password_empid_fkey" FOREIGN KEY (empid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.password DROP CONSTRAINT "Password_empid_fkey";
       public          postgres    false    215    3241    219            �           2606    58977    task Task_assignedto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "Task_assignedto_fkey" FOREIGN KEY (assignedto) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.task DROP CONSTRAINT "Task_assignedto_fkey";
       public          postgres    false    215    3241    225            �           2606    58982    task Task_companyid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "Task_companyid_fkey" FOREIGN KEY (companyid) REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.task DROP CONSTRAINT "Task_companyid_fkey";
       public          postgres    false    225    3225    209            �           2606    58987    task Task_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "Task_createdby_fkey" FOREIGN KEY (createdby) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.task DROP CONSTRAINT "Task_createdby_fkey";
       public          postgres    false    225    215    3241            �           2606    58992    task Task_status_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "Task_status_fkey" FOREIGN KEY (status) REFERENCES public.status(id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.task DROP CONSTRAINT "Task_status_fkey";
       public          postgres    false    225    223    3255            �           2606    58997 *   companyphotos companyphotos_companyid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.companyphotos
    ADD CONSTRAINT companyphotos_companyid_fkey FOREIGN KEY (companyid) REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.companyphotos DROP CONSTRAINT companyphotos_companyid_fkey;
       public          postgres    false    211    3225    209            �           2606    59002 -   employeephotos employeephotos_employeeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employeephotos
    ADD CONSTRAINT employeephotos_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.employeephotos DROP CONSTRAINT employeephotos_employeeid_fkey;
       public          postgres    false    3241    215    217            �           2606    59007    reason reason_assignedto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reason
    ADD CONSTRAINT reason_assignedto_fkey FOREIGN KEY (assignedto) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.reason DROP CONSTRAINT reason_assignedto_fkey;
       public          postgres    false    215    221    3241            �           2606    59012    reason reason_employeeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reason
    ADD CONSTRAINT reason_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.reason DROP CONSTRAINT reason_employeeid_fkey;
       public          postgres    false    3241    221    215            �           2606    59017    reason reason_statusid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reason
    ADD CONSTRAINT reason_statusid_fkey FOREIGN KEY (statusid) REFERENCES public.status(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reason DROP CONSTRAINT reason_statusid_fkey;
       public          postgres    false    223    221    3255            �           2606    59022    reason reason_taskid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reason
    ADD CONSTRAINT reason_taskid_fkey FOREIGN KEY (taskid) REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.reason DROP CONSTRAINT reason_taskid_fkey;
       public          postgres    false    225    3257    221            �           2606    59027 -   taskattachment taskattachment_attachedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.taskattachment
    ADD CONSTRAINT taskattachment_attachedby_fkey FOREIGN KEY (attachedby) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.taskattachment DROP CONSTRAINT taskattachment_attachedby_fkey;
       public          postgres    false    215    3241    227            �           2606    59032 )   taskattachment taskattachment_taskid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.taskattachment
    ADD CONSTRAINT taskattachment_taskid_fkey FOREIGN KEY (taskid) REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.taskattachment DROP CONSTRAINT taskattachment_taskid_fkey;
       public          postgres    false    227    3257    225            W   �   x�M���0�g�)�Q�.�n�ƌ�X�iT�x���e��'��y]&�ժw�O֐O�"��S G��)�6gA��Gd���ȫ���G��q�2dX�E����7���~��t|��
�x�d�q�Z��Q�����-�      Y   A   x�31�47�t,(�IU��K֋77��*H�2��47�L.�77���9͍9C���͍�
�ҹb���� �[?      [   U   x�ʱ
� �����N��Q�ڂhk9pH���?�>�`{"	�|US�a���W����մ8ȌM�ںZ�� 2V+#��DCN      ]   �   x�u�A�0E��)� ��`��$�@�+7A�hJ���Vӈ�����fZ�RHc�:�
[h��P�uH��d�d��|sUX��|S`�2��m����]��/�=��L�	غ�l#fy��L��RZ�um���xd��r��cU��6��nnm�#�|��*M�%�ш����S��>N`ŁS��{�!/T5����\p�� x�Rv�      _   �   x�%�A
�0���0R�D�BOЖ�
ÀҨ1�X�}��ß7�[*��S"w�2zF/��V���-i����"�3ՠ�v��so�{Z�M�j��۰Z�"�4[p�ـ5u�%����:K1�'9p�q��^�&;^mzXqd��UOJ�J�>>      a   i   x�=�A� ���0�3j�����M�І0���ˢ��m��B��e���iC���Р0敗�aw���נjj���t�s�Ȑ{��w�x�G��,l����9�7�)�      c   �   x�u�MjC1�}��K�~mKgɦ�����U�%�D/�1��F���4F����8h�,�O�l����(O�Q2��
P�W&�8�(c���L�͊Q���Q��d�b�L�f��+&!>oi��v7����h���������'f��@�6�vj�'���uB!�;��i�#�z���dR��f���p>v��z����t�      e   j   x�3���+(�O/J-.�I,�V���wr�4�2�t��K�H�Y�\���E��%�)Q�Ѐ˄�91/95'.�rrYr��e��s��'��� ������ ��%O      g   �   x���M�0�����qc8���u�}찣�Ɇ����V�t2q"4�6�'o���H_dI^�"(�n^$���pG�@\�#�	� N�����mJ�؂$�En]�:�������.h���wU]���1bVhȈD� �~�]�����g�$T��q��aANϰ���1�Ol���u�StBʴ��<�ya��Gf�=�1�l�	{�h��P�L)}���      i   ^   x�3��445�4�0�tLI��KW�K-Wp�L�IQx�0'��1%73�Q�\��<�@jnAN~ej*H�$1)'U!-�H!�H!'?=3O/%?��+F��� �!G     