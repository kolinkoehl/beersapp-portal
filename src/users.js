import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, json)
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/api/');
    });


    this.newBeer = {};
    this.http = http;
  }

  activate() {
  this.getBeers();
  }

  getBeers(){
    return this.http.fetch('beer')
      .then(response => response.json())
      .then(beers => this.beers = beers);
  }


  addBeer(){
    return this.http.fetch('beer',
      {
        method : 'post',
        body: json(this.newBeer)
      }).then(() => {this.getBeers()})
  }

}
