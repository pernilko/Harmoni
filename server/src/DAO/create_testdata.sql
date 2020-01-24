INSERT INTO organization (org_name, phone, email) VALUES ("Samfundet", "90909590", "samfundet@ntnu.no");
INSERT INTO organization (org_name, email) VALUES ("TIHLDE", "tihlde@ntnu.no");
INSERT INTO organization (org_name, phone, email) VALUES ("Uka", "45999220", "uka@ntnu.no");


INSERT INTO user VALUES(DEFAULT, 1, "hei@gmail.com", 1, "Navn Navnesen", "123", "trondheim 1", "123456789", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 2, "ha_det@gmail.com", 1, "person Personesen", "321", "lura 1", "987654321", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 2, "wallah@gmail.com", 0, "Brusjan Jesus", "321", "steinkjer 420", "9999999999", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 3, "hola@gmail.com", 0, "Grethe Sandstrak", "1337", "NTNU 4.life", "11111", NULL, DEFAULT);


INSERT INTO event VALUES (DEFAULT, 2, 1, "Konsert med Karpe", "MONTEBELLO", "Kalveskinnet kantina", CURRENT_DATE, CURRENT_DATE, 123, 222, NULL, FALSE);
INSERT INTO event  VALUES (DEFAULT, 3, 2, "Fotball-turnering", "BARCELONA", "Sukkerhuset", CURRENT_DATE, CURRENT_DATE, 223, 232, NULL, TRUE);
INSERT INTO event VALUES (DEFAULT, 2, 3, "Spillkveld", "Gamers Rise Up", "Torget", CURRENT_DATE, CURRENT_DATE, 777, 666, NULL, FALSE);
INSERT INTO event VALUES (DEFAULT ,3, 4,"Konsert med Ruben", "Samfundet", "Samfundet", CURRENT_DATE+1, CURRENT_DATE+1, 777, 666, NULL, TRUE);

INSERT INTO user_event VALUES(1, 1, "lydtekniker", 1);
INSERT INTO user_event VALUES(1, 2, "bartender", 1);
INSERT INTO user_event VALUES(1, 3, "vakt", 1);
INSERT INTO user_event VALUES(2, 1, "lystekniker", DEFAULT);
INSERT INTO user_event VALUES(2, 2, "lydtekniker", 0);
INSERT INTO user_event VALUES(2, 3, "bartender", 0);


INSERT INTO artist VALUES(DEFAULT, 1, "TIX", NULL, NULL, NULL, "TIX@fuckoff.com", "6969", NULL);
INSERT INTO artist VALUES(DEFAULT, 1, "Dilawar", NULL, NULL, NULL, "jobbe@work.productive", "11111111", NULL);
INSERT INTO artist VALUES(DEFAULT, 2, "lil Pump", NULL, NULL, NULL, "skrrrrt@skya.bom", "420", NULL);


INSERT INTO ticket (event_id, ticket_type, amount, description, price, amount_sold) VALUES (2, "Standard", 50, "Konsertkveld med besøk fra Karpe! Kom!", 100, 10);
INSERT INTO ticket (event_id, ticket_type, amount, description, price, amount_sold) VALUES (2, "VIP", 20, "Konsertkveld med besøk fra Karpe! Kom!", 200, 2);
INSERT INTO ticket (event_id, ticket_type, amount, description, price, amount_sold) VALUES (3, "Standard", 50, "Fotball-turnering, kom og spill!", 0, 22);