CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"short_id" varchar NOT NULL,
	"date" date,
	"start_time" time,
	"end_time" time,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "events_shortId_unique" UNIQUE("short_id")
);
--> statement-breakpoint
CREATE TABLE "timers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"duration" integer NOT NULL,
	"short_id" varchar NOT NULL,
	"events" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "timers_shortId_unique" UNIQUE("short_id")
);
--> statement-breakpoint
ALTER TABLE "timers" ADD CONSTRAINT "timers_events_events_id_fk" FOREIGN KEY ("events") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "shortId_idx" ON "events" USING btree ("short_id");