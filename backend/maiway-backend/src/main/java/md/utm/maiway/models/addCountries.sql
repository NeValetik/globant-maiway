-- Insert countries
INSERT INTO country (id, code, name) VALUES
                                         (1, 'UK', 'United Kingdom'),
                                         (2, 'US', 'United States'),
                                         (3, 'CA', 'Canada'),
                                         (4, 'MD', 'Moldova');

-- Insert regions for the United Kingdom
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('ENG', 1, 'England'),
                                                       ('SCT', 1, 'Scotland'),
                                                       ('WLS', 1, 'Wales'),
                                                       ('NIR', 1, 'Northern Ireland');

-- Insert regions for the United States
INSERT INTO region (code, country_id, region_name) VALUES
                                                       ('ALB', 2, 'Alabama'),
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
