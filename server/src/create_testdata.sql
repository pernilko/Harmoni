""" organizations """ 

""" users """
INSERT INTO user VALUES(DEFAULT, 1, "hei@gmail.com", 1, "Navn Navnesen", "123", "trondheim 1", "123456789", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 2, "ha_det@gmail.com", 1, "person Personesen", "321", "lura 1", "987654321", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 2, "wallah@gmail.com", 0, "Brusjan Jesus", "321", "steinkjer 420", "9999999999", NULL, DEFAULT);
INSERT INTO user VALUES(DEFAULT, 3, "hola@gmail.com", 0, "Grethe Sandstrak", "1337", "NTNU 4.life", "11111", NULL, DEFAULT);

"""  events """

""" user_events """
INSERT INTO user_event VALUES(1, 1, "lydtekniker");
INSERT INTO user_event VALUES(1, 2, "bartender");
INSERT INTO user_event VALUES(1, 3, "vakt");
INSERT INTO user_event VALUES(2, 1, "lystekniker");
INSERT INTO user_event VALUES(2, 2, "lydtekniker");
INSERT INTO user_event VALUES(2, 3, "bartender");

""" artists """
INSERT INTO artist VALUES(DEFAULT, 1, "TIX", NULL, NULL, NULL, "TIX@fuckoff.com", "6969", NULL);
INSERT INTO artist VALUES(DEFAULT, 1, "Dilawar", NULL, NULL, NULL, "jobbe@work.productive", "11111111", NULL);
INSERT INTO artist VALUES(DEFAULT, 2, "lil Pump", NULL, NULL, NULL, "skrrrrt@skya.bom", "420", NULL);

""" tickets """