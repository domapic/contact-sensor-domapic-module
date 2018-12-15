#!/usr/bin/env bash

npm run domapic-contact-sensor start -- --path=${domapic_path} ${service_extra_options}
npm run domapic-contact-sensor logs
