#!/usr/bin/env node
'use strict';
import { cli } from '../cli';

cli(process.argv)
  .catch((error) => {
    /* tslint:disable no-console */
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  });
