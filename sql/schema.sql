create table if not exists partidos (
  id serial primary key,
  nombre text not null,
  acronimo text,
  logo_url text,
  sitio_web text
);

create table if not exists candidatos (
  id serial primary key,
  nombre_completo text not null,
  foto_url text,
  partido_id integer not null references partidos(id)
);

create table if not exists planchas_presidenciales (
  id serial primary key,
  partido_id integer not null references partidos(id),
  presidente_id integer not null references candidatos(id),
  vicepresidente1_id integer references candidatos(id),
  vicepresidente2_id integer references candidatos(id)
);

create table if not exists perfiles_candidato (
  candidato_id integer primary key references candidatos(id),
  hoja_vida jsonb
);

create table if not exists propuestas (
  id serial primary key,
  candidato_id integer not null references candidatos(id),
  titulo text not null,
  descripcion text,
  categoria text,
  sector text,
  url text
);

create table if not exists regiones (
  id serial primary key,
  nombre text not null,
  tipo text not null
);

create table if not exists candidaturas (
  id serial primary key,
  candidato_id integer not null references candidatos(id),
  cargo text not null,
  ambito text not null,
  numero_lista integer,
  region_id integer references regiones(id)
);

create table if not exists planes_gobierno (
  id serial primary key,
  partido_id integer not null references partidos(id),
  sector text not null,
  documento_url text,
  resumen text,
  version text
);

create table if not exists noticias (
  id serial primary key,
  candidato_id integer references candidatos(id),
  partido_id integer references partidos(id),
  titulo text not null,
  url text not null unique,
  imagen_url text,
  fuente text,
  publicada_en timestamp,
  resumen text
);

create index if not exists idx_propuestas_candidato on propuestas(candidato_id);
create index if not exists idx_candidaturas_candidato on candidaturas(candidato_id);
create index if not exists idx_candidaturas_region on candidaturas(region_id);
create index if not exists idx_noticias_candidato on noticias(candidato_id);
create index if not exists idx_noticias_partido on noticias(partido_id);