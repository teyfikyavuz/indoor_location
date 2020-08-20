CREATE DATABASE indoor_location;

CREATE TABLE zones (
    zone_id SERIAL PRIMARY KEY NOT NULL,
	is_active BOOL DEFAULT false NOT NULL,
	is_deleted BOOL DEFAULT false NOT NULL,
	name VARCHAR(255) NOT NULL,
	data_collection_frequency INTEGER NOT NULL DEFAULT 500,
	data_transmission_period INTEGER NOT NULL DEFAULT 2500,
	external_parameter VARCHAR(32),
	create_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE zone_polygons (
    polygon_id SERIAL PRIMARY KEY NOT NULL,
	is_active BOOL DEFAULT false NOT NULL,
	is_deleted BOOL DEFAULT false NOT NULL,
	zone_id INTEGER NOT NULL,
	type SMALLINT NOT NULL,
	polygon_points polygon NOT NULL,
	create_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (zone_id) REFERENCES zones(zone_id)
);

CREATE TABLE beacons (
    beacon_id SERIAL PRIMARY KEY NOT NULL,
	is_active BOOL DEFAULT false NOT NULL,
	is_deleted BOOL DEFAULT false NOT NULL,
	uuid VARCHAR(64) NOT NULL,
	name VARCHAR(255) NOT NULL,
	zone_id INTEGER NOT NULL,
	points point NOT NULL,
	create_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (zone_id) REFERENCES zones(zone_id)
);