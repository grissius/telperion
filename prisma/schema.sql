CREATE TABLE "public"."user" (
  id SERIAL PRIMARY KEY NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE "public"."post" (
  id SERIAL PRIMARY KEY NOT NULL,
  title text NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT now(),
  content TEXT,
  "author_id" INTEGER NOT NULL,
  FOREIGN KEY ("author_id") REFERENCES "public"."user"(id)
);
