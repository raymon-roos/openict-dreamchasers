#!/bin/bash

if [ -f api/.env ]; then
  export $(grep -v '^#' api/.env | xargs)
fi

if [ -d "/var/lib/mysql/${DB_NAME}" ]; then
  exec /main --serve
else
  exec /main --migrate
    if [ $? -eq 0 ]; then
      exec /main --serve
    fi
fi
