DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schools (name, subdomain, status) 
VALUES ('SMK Negeri 2 Sungailiat', 'smkn2sungailiat', 'active'),
       ('SMA Negeri 1', 'sman1', 'active');