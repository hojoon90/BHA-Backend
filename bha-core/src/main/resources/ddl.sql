create table t_calendar (
    deleted boolean not null DEFAULT FALSE,
    cal_id bigint AUTO_INCREMENT PRIMARY KEY,
    created_at timestamp not null,
    end_date bigint not null,
    last_modified_at TIMESTAMP,
    start_date bigint not null,
    event_name varchar(255) not null
);

create table t_file (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    file_id bigint AUTO_INCREMENT PRIMARY KEY,
    file_size bigint not null,
    last_modified_at timestamp,
    post_id bigint not null,
    board_type varchar(255) not null,
    origin_name varchar(255) not null,
    save_name varchar(255) not null,
    thumbnail_name varchar(255),
    thumbnail_path varchar(255)
);

create table t_free_board (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    created_by bigint,
    last_modified_at timestamp,
    last_modified_by bigint,
    post_id bigint AUTO_INCREMENT PRIMARY KEY,
    view_cnt bigint default 0,
    title varchar(255) not null,
    contents longtext not null
);

create table t_gallery_board (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    created_by bigint,
    last_modified_at timestamp,
    last_modified_by bigint,
    post_id bigint AUTO_INCREMENT PRIMARY KEY,
    view_cnt bigint default 0,
    title varchar(255) not null,
    contents longtext not null
);

create table t_news_board (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    created_by bigint,
    last_modified_at timestamp,
    last_modified_by bigint,
    post_id bigint AUTO_INCREMENT PRIMARY KEY,
    view_cnt bigint default 0,
    title varchar(255) not null,
    contents longtext not null
);

create table t_notice_board (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    created_by bigint,
    last_modified_at timestamp,
    last_modified_by bigint,
    post_id bigint AUTO_INCREMENT PRIMARY KEY,
    view_cnt bigint default 0,
    title varchar(255) not null,
    contents longtext not null
);

create table t_user (
    authority tinyint not null check (authority between 0 and 1),
    deleted boolean not null DEFAULT FALSE,
    sign_out_date date,
    created_at timestamp not null default current_timestamp,
    last_modified_at timestamp,
    user_id bigint AUTO_INCREMENT PRIMARY KEY,
    account_id varchar(255) not null,
    password varchar(255) not null,
    user_name varchar(255) not null
);

create table t_youngsan_board (
    deleted boolean not null DEFAULT FALSE,
    created_at timestamp not null default current_timestamp,
    created_by bigint,
    last_modified_at timestamp,
    last_modified_by bigint,
    post_id bigint AUTO_INCREMENT PRIMARY KEY,
    view_cnt bigint default 0,
    title varchar(255) not null,
    contents longtext not null
);

/*
    alter table if exists `t_free_board`
       add constraint FK_USER_FREEBOARD_1
       foreign key (created_by)
       references t_user;

    alter table if exists `t_free_board`
       add constraint FK_USER_FREEBOARD_2
       foreign key (last_modified_by)
       references t_user;

    alter table if exists t_gallery_board
       add constraint FK_USER_GALLERYBOARD_1
       foreign key (created_by)
       references t_user;

    alter table if exists t_gallery_board
       add constraint FK_USER_GALLERYBOARD_2
       foreign key (last_modified_by)
       references t_user;

    alter table if exists t_news_board
       add constraint FK_USER_NEWSBOARD_1
       foreign key (created_by)
       references t_user;

    alter table if exists t_news_board
       add constraint FK_USER_NEWSBOARD_2
       foreign key (last_modified_by)
       references t_user;

    alter table if exists t_notice_board
       add constraint FK_USER_NOTICEBOARD_1
       foreign key (created_by)
       references t_user;

    alter table if exists t_notice_board
       add constraint FK_USER_NOTICEBOARD_2
       foreign key (last_modified_by)
       references t_user;

    alter table if exists t_youngsan_board
       add constraint FK_USER_YOUNGSANBOARD_1
       foreign key (created_by)
       references t_user;

    alter table if exists t_youngsan_board
       add constraint FK_USER_YOUNGSANBOARD_2
       foreign key (last_modified_by)
       references t_user; */