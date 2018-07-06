import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const Pusher: any;
@Injectable()
export class PusherServiceProvider {
  channel;

  constructor(public http: HttpClient) {
    var pusher = new Pusher("18df2d3ec4a2f340b8a3", {
      cluster: 'ap2',
      encrypted: true,
    })

    this.channel = pusher.subscribe('comments');
  }

  init() {
    return this.channel;
  }
}
