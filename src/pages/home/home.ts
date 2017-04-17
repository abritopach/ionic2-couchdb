import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PostsService } from '../../providers/posts-service';

import { ViewPostPage } from '../view-post/view-post';

import { AddPostPage } from '../add-post/add-post';

import { Environment } from '../../environments/environment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: [PostsService]
})
export class HomePage {

  posts: any;
  postsImages: any;
  environment: Environment;

  constructor(public navCtrl: NavController, public postsService: PostsService) {
    this.postsImages = [];
    this.environment = new Environment("DEVELOPMENT");
  }

  ionViewDidLoad(){

    console.log("ionViewDidLoad home.ts");

    this.postsService.getPosts().subscribe((posts) => {

      this.posts = posts;
      //console.log(this.posts);

    });

  }

  viewPost(post){
    this.navCtrl.push(ViewPostPage, {
      post: post
    });
  }

  pushAddPostPage(){
    this.navCtrl.push(AddPostPage);
  }

  getPostImage(index) {

    //let imgURL = "http://placehold.it/600x300";
    let imgURL = "assets/img/postImage.png";

    if (typeof this.posts[index]._attachments != "undefined") {

      if (typeof this.posts[index]._attachments["postImage.jpg"].data != "undefined") {

        let dataURIPrefix = 'data:image/jpeg;base64,';
        //console.log(this.posts[index]._attachments["postImage.jpg"].data);
        let attachment = this.posts[index]._attachments["postImage.jpg"].data;
        imgURL = dataURIPrefix + attachment;
      }

      /*
      else {
        //imgURL = "http://127.0.0.1:5984/couchblog/" + this.posts[index]._id + "/postImage.jpg";
        //imgURL = this.environment.getURL() + this.posts[index]._id + "/postImage.jpg";
      }
      */
    }

    return  imgURL;
  }

}
