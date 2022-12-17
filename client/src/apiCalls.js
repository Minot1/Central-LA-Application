import axios from 'axios';
import CasClient, { constant } from 'react-cas-client';

let casEndpoint = "https://login.sabanciuniv.edu/"
let casOptions = { version: constant.CAS_VERSION_2_0 }

let casClient = new CasClient(casEndpoint, casOptions);

