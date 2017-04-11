import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class DataService {

  db: any;
  remote: string = "http://127.0.0.1:5984/couchblog";

  constructor() {

    this.db = new PouchDB('couchblog');

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

  }

}
