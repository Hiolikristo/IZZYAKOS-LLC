create extension if not exists postgis;

create type resource_kind as enum (
  'food_pantry','shelter','meal','transportation','senior_support',
  'clothing','hygiene','employment','benefits','community_hub','other'
);

create type verification_state as enum ('unverified','pending','verified','suspended');
create type operational_state as enum ('unknown','available','limited','low_stock','full','closed','call_first');

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization_type text,
  website text,
  phone text,
  verification verification_state not null default 'unverified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  name text not null,
  kind resource_kind not null,
  description text,
  address_line1 text,
  city text not null default 'Columbus',
  region text not null default 'OH',
  postal_code text,
  phone text,
  website text,
  location geography(point,4326),
  service_radius_miles numeric,
  transit_accessible boolean not null default false,
  delivery_available boolean not null default false,
  eligibility_notes text,
  hours_text text,
  operational_status operational_state not null default 'unknown',
  verification verification_state not null default 'unverified',
  last_verified_at timestamptz,
  last_status_update_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_location_gix on resources using gist(location);
create index if not exists resources_kind_idx on resources(kind);
create index if not exists resources_verification_idx on resources(verification);

create table if not exists assistance_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  need_category text not null,
  notes text,
  location geography(point,4326),
  postal_code text,
  transportation_barrier boolean not null default false,
  senior_or_mobility_support boolean not null default false,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists volunteer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  service_radius_miles numeric,
  can_deliver boolean not null default false,
  has_vehicle boolean not null default false,
  verification verification_state not null default 'unverified',
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table resources enable row level security;
alter table assistance_requests enable row level security;
alter table volunteer_profiles enable row level security;

create policy "public can read verified resources"
on resources for select
using (verification = 'verified');

create policy "public can read verified organizations"
on organizations for select
using (verification = 'verified');

create policy "users can create assistance requests"
on assistance_requests for insert
with check (auth.uid() is not null and (user_id is null or user_id = auth.uid()));

create policy "users can read own assistance requests"
on assistance_requests for select
using (auth.uid() = user_id);

create policy "volunteers can manage own profile"
on volunteer_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function nearby_verified_resources(
  lng double precision,
  lat double precision,
  radius_miles double precision default 2
)
returns setof resources
language sql
stable
as $$
  select *
  from resources
  where verification = 'verified'
    and location is not null
    and st_dwithin(
      location,
      st_setsrid(st_makepoint(lng,lat),4326)::geography,
      radius_miles * 1609.344
    )
  order by st_distance(
    location,
    st_setsrid(st_makepoint(lng,lat),4326)::geography
  );
$$;
