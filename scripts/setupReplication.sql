CREATE PUBLICATION my_publication FOR TABLE your_table;
SELECT pg_create_logical_replication_slot('my_replication_slot', 'pgoutput');
