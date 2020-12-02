CREATE TABLE "users" (
  "id" int PRIMARY KEY NOT NULL,
  "username" string(50) NOT NULL,
  "email" string(100) UNIQUE NOT NULL,
  "hashed_password" string(255) NOT NULL
);

CREATE TABLE "exercises" (
  "id" int PRIMARY KEY NOT NULL,
  "user_id" string(100) NOT NULL,
  "title" string(100) NOT NULL,
  "description" string(2000) NOT NULL,
  "body_part" string(75) NOT NULL,
  "difficulty" string(30) NOT NULL,
  "type" string(50) NOT NULL,
  "equipment" string(50) NOT NULL
);

CREATE TABLE "workout" (
  "id" int PRIMARY KEY NOT NULL,
  "title" string(100) NOT NULL,
  "description" string(2000) NOT NULL,
  "user_id" int NOT NULL,
  "type" string(100) NOT NULL
);

CREATE TABLE "workout_exercises" (
  "id" int PRIMARY KEY NOT NULL,
  "workout_id" int NOT NULL,
  "exercise_id" int NOT NULL
);

CREATE TABLE "ratings" (
  "id" int PRIMARY KEY NOT NULL,
  "exercise_id" int,
  "workout_id" int,
  "user_id" int NOT NULL,
  "rating" int NOT NULL
);

CREATE TABLE "comments" (
  "id" int PRIMARY KEY NOT NULL,
  "exercise_id" int,
  "workout_id" int,
  "user_id" int NOT NULL,
  "comment" string(2000) NOT NULL
);

ALTER TABLE "ratings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "exercises" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout_exercises" ADD FOREIGN KEY ("workout_id") REFERENCES "workout" ("id");

ALTER TABLE "workout_exercises" ADD FOREIGN KEY ("exercise_id") REFERENCES "exercises" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("exercise_id") REFERENCES "exercises" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("workout_id") REFERENCES "workout" ("id");

ALTER TABLE "ratings" ADD FOREIGN KEY ("workout_id") REFERENCES "workout" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("exercise_id") REFERENCES "exercises" ("id");
