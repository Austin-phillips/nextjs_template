#!/bin/bash

prisma migrate dev --create-only
echo "Check /prisma/migrations for a new migration.sql, and make any manual edits if needed. Then run db:migrate:apply."