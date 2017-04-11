import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddCommentPage } from '../add-comment/add-comment';
import { CommentsService } from '../../providers/comments-service';

@Component({
  selector: 'page-view-post',
  templateUrl: 'view-post.html',
  providers: [CommentsService]
})
export class ViewPostPage {

  post: any;
  comments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commentService: CommentsService) {}

  ionViewDidLoad() {

    this.post = this.navParams.get('post');

    this.commentService.getComments(this.post._id).subscribe((comments) => {
      this.comments = comments;
    });

  }

  pushAddCommentPage(){

    this.navCtrl.push(AddCommentPage, {
      post: this.post
    });

  }

}