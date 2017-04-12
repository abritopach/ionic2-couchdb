import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

import { Environment } from '../environments/environment'

@Injectable()
export class DataService {

  db: any;
  environment: Environment;
  remote: string = "http://127.0.0.1:5984/couchblog";

  constructor() {

    this.environment = new Environment("DEVELOPMENT");

    this.remote = this.environment.getURL().toString();

    this.db = new PouchDB('couchblog');

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

  }

}
