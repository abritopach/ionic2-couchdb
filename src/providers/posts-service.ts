import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostsService {

  posts: any;
  postSubject: any = new Subject();

  constructor(public dataService: DataService, public zone: NgZone) {

    this.dataService.db.changes({live: true, since: 'now', include_docs: true, attachments: true}).on('change', (change) => {
      if(change.doc.type === 'post') {
        // Recuperamos todos los posts.
        //this.emitPosts();
        // Sólo modificamos el post que se ha actualizado, añadido o eliminado.
        this.changePost(change);
      }
    });

  }

  getPosts(){

    this.emitPosts();

    return this.postSubject;

  }

  addPost(post): void {
    this.dataService.db.put(post);
  }

  emitPosts(): void {

    this.zone.run(() => {

      this.dataService.db.query('posts/by_date_published').then((data) => {

        let posts = data.rows.map(row => {
          return row.value;
        });

        //console.log("emitPosts");
        //console.log(posts);

        this.posts = posts;
        this.postSubject.next(posts);

      });

    });

  }

  changePost(change): void {

    //console.log(change);

    let changedDoc = null;
    let changedIndex = null;

    //console.log("changePost this.posts");
    //console.log(this.posts);

    // Find the affected document (if any)
    this.posts.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted - remove it
    if(change.deleted) {
      console.log("Post was deleted");
      this.posts.splice(changedIndex, 1);
    } else {

      //A document was updated - change it
      if(changedDoc){
        console.log("Post was updated");
        this.posts[changedIndex] = change.doc;
      }

      //A document was added - add it
      else {
        console.log("Post was added");
        //console.log(change.doc);
        //console.log(change.doc._attachments["postImage.jpg"].data);
        this.posts.push(change.doc);
      }

    }

    // Once we have made the appropriate changes, we trigger the next method on the Subject so that anything
    // that is subscribed to it will be notified of the change.
    this.postSubject.next(this.posts);

  }


}
