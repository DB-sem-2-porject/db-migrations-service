drop table if exists users cascade;
drop table if exists providers cascade;
drop table if exists product_directory cascade;
drop table if exists providers_product_list cascade;
drop table if exists trading_points cascade;
drop table if exists department_store_sections cascade;
drop table if exists trading_point_halls cascade;
drop table if exists employees cascade;
drop table if exists trade_requests cascade;
drop table if exists trade_request_items cascade;
drop table if exists orders cascade;
drop table if exists order_items cascade;
drop table if exists deliveries cascade;
drop table if exists inventory cascade;
drop table if exists inventory_transfers cascade;
drop table if exists customers cascade;
drop table if exists sales cascade;
drop table if exists sale_items cascade;
drop table if exists salaries cascade;
drop table if exists users cascade;

drop type if exists trading_point_type;
drop type if exists request_status;
drop type if exists order_status;
drop type if exists delivery_status;
drop type if exists transfer_status;
drop type if exists payment_method;
drop type if exists employee_role;

create type trading_point_type as enum ('Универмаг', 'Магазин', 'Киоск', 'Лоток');
create type request_status as enum ('новый', 'обработан', 'отклонён');
create type order_status as enum ('новый', 'отправлен', 'выполнен', 'отменен');
create type delivery_status as enum ('принята', 'частично принята', 'отклонена');
create type transfer_status as enum ('запланирован', 'выполнен', 'отменен');
create type payment_method as enum ('наличные', 'карта', 'сбп', 'крипта', 'другое');
create type employee_role as enum ('role-1', 'role-2', 'role-3', 'role-4');

create table users (
    id                      serial primary key,
    email                   varchar(100) not null unique,
    password                varchar(255) not null,
    reset_token             text,
    registration_date       timestamp default now(),
    last_login              timestamp
);)

create table trading_points (
    id                      serial primary key,
    name                    varchar(100) not null,
    type                    trading_point_type not null,
    address                 text not null,
    size_square_meters      numeric(10, 2),
    rent_cost               numeric(12, 2),
    utility_cost            numeric(12, 2),
    counter_count           integer,
    floors_count            integer default 1,
    opening_date            date not null default current_date,
    active                  boolean default true
);

create table employees (
    id                      serial primary key,
    full_name               varchar(100) not null,
    role                    employee_role not null,
    trading_point_id        integer not null references trading_points(id),
    hire_date               date not null default current_date,
    base_salary             numeric(10, 2) not null,
    phone                   varchar(20),
    email                   varchar(100),
    active                  boolean default true
);

-- секции универмагов
create table department_store_sections (
    id                      serial primary key,
    trading_point_id        integer not null references trading_points(id),
    name                    varchar(100) not null,
    floor_number            integer not null,
    manager_id              integer references employees(id)
);

-- торговые залы для универмагов и магазинов
create table trading_point_halls (
    id                      serial primary key,
    trading_point_id        integer not null references trading_points(id),
    section_id              integer references department_store_sections(id), -- NULL для магазинов
    name                    varchar(100) not null,
    floor_number            integer not null default 1,
    size_sqm                numeric(10, 2)
);


-- связь сотрудников с залами и секциями
-- alter table employees add column hall_id integer references trading_point_halls(id);
-- alter table employees add column section_id integer references department_store_sections(id);

create table providers (
    id                      serial primary key,
    name                    varchar(100) not null,
    phone                   varchar(20),
    email                   varchar(100),
    address                 text,
    active                  boolean default true,
    registration_date       date default current_date
);

-- справочник номенклатуры товаров
create table product_directory (
    id                      serial primary key,
    name                    varchar(100) not null,
    description             text,
    category                varchar(50),
    measurement             varchar(20) not null default 'шт', -- единица измерения
    created_at              timestamp default now()
);

-- список поставляемых поставщиками товаров
create table providers_product_list (
    id                      serial primary key,
    provider_id             integer not null references providers(id),
    product_id              integer not null references product_directory(id),
    price                   numeric(12, 2) not null,
    min_order_quantity      integer default 1,
    active                  boolean default true,
    last_update             timestamp default now(),
    unique (provider_id, product_id)
);

-- заявки от торговых точек
create table trade_requests (
    id                      serial primary key,
    trading_point_id        integer not null references trading_points(id),
    employee_id             integer not null references employees(id),
    request_date            timestamp not null default now(),
    status                  request_status not null default 'новый',
    notes                   text
);

-- позиции заявок
create table trade_request_items (
    id                      serial primary key,
    request_id              integer not null references trade_requests(id),
    product_id              integer not null references product_directory(id),
    quantity                integer not null,
    constraint positive_quantity check (amount > 0)
);

-- заказы поставщикам
create table orders (
    id                      serial primary key,
    provider_id             integer not null references providers(id),
    order_date              timestamp not null default now(),
    status                  order_status not null default 'новый',
    total_cost              numeric(14, 2),
    notes                   text
);

-- позиции заказов
create table order_items (
    id                      serial primary key,
    order_id                integer not null references orders(id),
    product_id              integer not null references product_directory(id),
    quantity                integer not null,
    price                   numeric(12, 2) not null, -- цена за единицу
    constraint positive_quantity check (quantity > 0),
    constraint positive_price check (price > 0)
);

create table deliveries (
    id                      serial primary key,
    order_id                integer not null references orders(id),
    delivery_date           timestamp not null default now(),
    accepted_by             integer not null references employees(id),
    status                  delivery_status not null default 'принята',
    notes                   text
);

-- товары в наличии в торговых точках
create table inventory (
    id                      serial primary key,
    trading_point_id        integer not null references trading_points(id),
    product_id              integer not null references product_directory(id),
    quantity                integer not null default 0,
    selling_price           numeric(12, 2) not null, -- цена продажи
    last_update             timestamp default now(),
    constraint positive_selling_price check (selling_price > 0)
);

-- передача товаров между торговыми точками
create table inventory_transfers (
    id                      serial primary key,
    source_point_id         integer not null references trading_points(id),
    destination_point_id    integer not null references trading_points(id),
    product_id              integer not null references product_directory(id),
    quantity                integer not null,
    transfer_date           timestamp not null default now(),
    initiated_by            integer not null references employees(id),
    approved_by             integer references employees(id),
    status                  transfer_status not null default 'запланирован',
    constraint different_points check (source_point_id != destination_point_id),
    constraint positive_quantity check (quantity > 0)
);

-- покупатели универмагов и магазинов
create table customers (
    id                      serial primary key,
    full_name               varchar(100) not null,
    data                    jsonb
);

create table sales (
    id                      serial primary key,
    trading_point_id        integer not null references trading_points(id),
    employee_id             integer not null references employees(id), -- продавец
    customer_id             integer references customers(id), -- для универмагов и магазинов
    sale_date               timestamp not null default now(),
    total_amount            numeric(14, 2) not null,
    payment_method          payment_method not null default 'наличные'
);

create table sale_items (
    id                      serial primary key,
    sale_id                 integer not null references sales(id),
    product_id              integer not null references product_directory(id),
    quantity                integer not null,
    price                   numeric(12, 2) not null, -- цена за единицу на момент продажи
    constraint positive_quantity check (quantity > 0),
    constraint positive_price check (price > 0)
);

create table salaries (
    id                      serial primary key,
    employee_id             integer not null references employees(id),
    period_start            date not null,
    period_end              date not null,
    base_amount             numeric(12, 2) not null,
    bonus                   numeric(12, 2) default 0,
    tax                     numeric(12, 2) not null,
    total_paid              numeric(12, 2) not null,
    payment_date            date not null,
    constraint valid_period check (period_end >= period_start)
);

-- Создание необходимых индексов для оптимизации запросов
create index idx_trading_points_type on trading_points(type);
create index idx_employees_trading_point on employees(trading_point_id);
create index idx_employees_role on employees(role);
create index idx_inventory_trading_point_product on inventory(trading_point_id, product_id);
create index idx_sales_date on sales(sale_date);
create index idx_sales_trading_point on sales(trading_point_id);
create index idx_sales_employee on sales(employee_id);
create index idx_sales_customer on sales(customer_id);
create index idx_sale_items_product on sale_items(product_id);
create index idx_order_items_product on order_items(product_id);
create index idx_trade_request_items_product on trade_request_items(product_id);