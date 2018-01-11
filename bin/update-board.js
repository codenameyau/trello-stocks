#!/usr/bin/env node
require('dotenv').config();

const script = require('../server/scripts/update-board');
script.updateCardTickers(true);
