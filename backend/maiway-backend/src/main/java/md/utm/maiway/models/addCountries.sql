-- RUN ONCE pls


delete from region cascade;
delete from country;

-- Insert countries
INSERT INTO country (id, code, name) VALUES
                                         (1, 'UK', 'United Kingdom'),
                                         (2, 'US', 'United States'),
                                         (3, 'CA', 'Canada'),
                                         (4, 'MD', 'Moldova'),
                                         (5, 'AU', 'Australia'),
                                         (6, 'IN', 'India'),
                                         (7, 'DE', 'Germany'),
                                         (8, 'FR', 'France'),
                                         (9, 'JP', 'Japan');

-- Insert regions for the United Kingdom
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('ENG', 1, 'England'),
                                                       ('SCT', 1, 'Scotland'),
                                                       ('WLS', 1, 'Wales'),
                                                       ('NIR', 1, 'Northern Ireland');

-- Insert regions for the United States
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('AL', 2, 'Alabama'),
                                                       ('AK', 2, 'Alaska'),
                                                       ('AZ', 2, 'Arizona'),
                                                       ('AR', 2, 'Arkansas'),
                                                       ('CA', 2, 'California'),
                                                       ('CO', 2, 'Colorado'),
                                                       ('CT', 2, 'Connecticut'),
                                                       ('DE', 2, 'Delaware'),
                                                       ('FL', 2, 'Florida'),
                                                       ('GA', 2, 'Georgia'),
                                                       ('HI', 2, 'Hawaii'),
                                                       ('ID', 2, 'Idaho'),
                                                       ('IL', 2, 'Illinois'),
                                                       ('IN', 2, 'Indiana'),
                                                       ('IA', 2, 'Iowa'),
                                                       ('KS', 2, 'Kansas'),
                                                       ('KY', 2, 'Kentucky'),
                                                       ('LA', 2, 'Louisiana'),
                                                       ('ME', 2, 'Maine'),
                                                       ('MD', 2, 'Maryland'),
                                                       ('MA', 2, 'Massachusetts'),
                                                       ('MI', 2, 'Michigan'),
                                                       ('MN', 2, 'Minnesota'),
                                                       ('MS', 2, 'Mississippi'),
                                                       ('MO', 2, 'Missouri'),
                                                       ('MT', 2, 'Montana'),
                                                       ('NE', 2, 'Nebraska'),
                                                       ('NV', 2, 'Nevada'),
                                                       ('NH', 2, 'New Hampshire'),
                                                       ('NJ', 2, 'New Jersey'),
                                                       ('NM', 2, 'New Mexico'),
                                                       ('NY', 2, 'New York'),
                                                       ('NC', 2, 'North Carolina'),
                                                       ('ND', 2, 'North Dakota'),
                                                       ('OH', 2, 'Ohio'),
                                                       ('OK', 2, 'Oklahoma'),
                                                       ('OR', 2, 'Oregon'),
                                                       ('PA', 2, 'Pennsylvania'),
                                                       ('RI', 2, 'Rhode Island'),
                                                       ('SC', 2, 'South Carolina'),
                                                       ('SD', 2, 'South Dakota'),
                                                       ('TN', 2, 'Tennessee'),
                                                       ('TX', 2, 'Texas'),
                                                       ('UT', 2, 'Utah'),
                                                       ('VT', 2, 'Vermont'),
                                                       ('VA', 2, 'Virginia'),
                                                       ('WA', 2, 'Washington'),
                                                       ('WV', 2, 'West Virginia'),
                                                       ('WI', 2, 'Wisconsin'),
                                                       ('WY', 2, 'Wyoming');

-- Insert regions for Canada
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('AB', 3, 'Alberta'),
                                                       ('BC', 3, 'British Columbia'),
                                                       ('MB', 3, 'Manitoba'),
                                                       ('NB', 3, 'New Brunswick'),
                                                       ('NL', 3, 'Newfoundland and Labrador'),
                                                       ('NT', 3, 'Northwest Territories'),
                                                       ('NS', 3, 'Nova Scotia'),
                                                       ('NU', 3, 'Nunavut'),
                                                       ('ON', 3, 'Ontario'),
                                                       ('PE', 3, 'Prince Edward Island'),
                                                       ('QC', 3, 'Quebec'),
                                                       ('SK', 3, 'Saskatchewan'),
                                                       ('YT', 3, 'Yukon');

-- Insert regions for Moldova
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('CH', 4, 'Chișinău'),
                                                       ('BL', 4, 'Bălți'),
                                                       ('CU', 4, 'Cahul'),
                                                       ('CO', 4, 'Comrat'),
                                                       ('OR', 4, 'Orhei'),
                                                       ('UH', 4, 'Ungheni'),
                                                       ('RI', 4, 'Rîbnița'),
                                                       ('TI', 4, 'Tiraspol');

-- Insert regions for Australia
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('NSW', 5, 'New South Wales'),
                                                       ('QLD', 5, 'Queensland'),
                                                       ('SA', 5, 'South Australia'),
                                                       ('TAS', 5, 'Tasmania'),
                                                       ('VIC', 5, 'Victoria'),
                                                       ('WA', 5, 'Western Australia'),
                                                       ('ACT', 5, 'Australian Capital Territory'),
                                                       ('NT', 5, 'Northern Territory');

-- Insert regions for India
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('AP', 6, 'Andhra Pradesh'),
                                                       ('DL', 6, 'Delhi'),
                                                       ('KA', 6, 'Karnataka'),
                                                       ('MH', 6, 'Maharashtra'),
                                                       ('TN', 6, 'Tamil Nadu'),
                                                       ('WB', 6, 'West Bengal'),
                                                       ('UP', 6, 'Uttar Pradesh'),
                                                       ('RJ', 6, 'Rajasthan');

-- Insert regions for Germany
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('BW', 7, 'Baden-Württemberg'),
                                                       ('BY', 7, 'Bavaria'),
                                                       ('BE', 7, 'Berlin'),
                                                       ('BB', 7, 'Brandenburg'),
                                                       ('HB', 7, 'Bremen'),
                                                       ('HH', 7, 'Hamburg'),
                                                       ('HE', 7, 'Hesse'),
                                                       ('MV', 7, 'Mecklenburg-Vorpommern'),
                                                       ('NI', 7, 'Lower Saxony'),
                                                       ('NW', 7, 'North Rhine-Westphalia'),
                                                       ('RP', 7, 'Rhineland-Palatinate'),
                                                       ('SL', 7, 'Saarland'),
                                                       ('SN', 7, 'Saxony'),
                                                       ('ST', 7, 'Saxony-Anhalt'),
                                                       ('SH', 7, 'Schleswig-Holstein'),
                                                       ('TH', 7, 'Thuringia');

-- Insert regions for France
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('IDF', 8, 'Île-de-France'),
                                                       ('NAQ', 8, 'Nouvelle-Aquitaine'),
                                                       ('PAC', 8, 'Provence-Alpes-Côte d`Azur'),
                                                       ('OCC', 8, 'Occitanie'),
                                                       ('ARA', 8, 'Auvergne-Rhône-Alpes'),
                                                       ('HDF', 8, 'Hauts-de-France'),
                                                       ('GE', 8, 'Grand Est'),
                                                       ('BRE', 8, 'Brittany');

-- Insert regions for Japan
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('HOK', 9, 'Hokkaido'),
                                                       ('TOH', 9, 'Tohoku'),
                                                       ('KNT', 9, 'Kanto'),
                                                       ('CHK', 9, 'Chubu'),
                                                       ('KNS', 9, 'Kansai'),
                                                       ('CHG', 9, 'Chugoku'),
                                                       ('SHK', 9, 'Shikoku'),
                                                       ('KYU', 9, 'Kyushu');
