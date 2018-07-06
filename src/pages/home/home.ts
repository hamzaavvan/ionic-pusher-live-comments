import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments = [];
  message: string;
  url: string = 'http://localhost:4000/message';
  rating = {
    good: 0,
    bad: 0
  };

  constructor(public navCtrl: NavController, public http: HttpClient, private pusher: PusherServiceProvider) { }

  ionViewDidLoad() {
    const channel = this.pusher.init();

    channel.bind('message', data => {
      console.log(data);
      if (data.score >= 1) {
        this.rating.good += 1;
      } else {
        this.rating.bad += 1;
      }

      this.comments.push(data);
    })
  }

  sendComment() {
    console.log(this.message)
    if (this.message != "") {
      this.http.post(this.url, {message: this.message}).subscribe((res: any) => {
        this.message = '';
      });
    }
  }
}
