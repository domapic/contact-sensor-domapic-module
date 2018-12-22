#!/usr/bin/env bash
echo ${service_extra_options}

node server.js --path=${domapic_path} ${service_extra_options}
