import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentsService {

  comments: any = [];
  commentSubject: any = new Subject();

  constructor(public dataService: DataService, public zone: NgZone) {

    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
      if(change.doc.type === 'comment' && this.comments.length > 0){
        if(change.doc.post === this.comments[0].post){
          this.changeComment(change);
        }
      }
    });

  }

  getComments(postId){

    this.emitComments(postId);

    return this.commentSubject;

  }

  addComment(comment): void {
    this.dataService.db.post(comment);
  }

  emitComments(postId): void {

    this.zone.run(() => {

      this.dataService.db.query('comments/by_post_id', {key: postId}).then((data) => {

        let comments = data.rows.map(row => {
          return row.value;
        });

        this.comments = comments;
        this.commentSubject.next(this.comments);

      });

    });

  }

  changeComment(change): void {

    let changedDoc = null;
    let changedIndex = null;

    // Find the affected document (if any)
    this.comments.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted - remove it
    if(change.deleted){
      this.comments.splice(changedIndex, 1);
    } else {

      //A document was updated - change it
      if(changedDoc){
        this.comments[changedIndex] = change.doc;
      }

      //A document was added - add it
      else {
        this.comments.push(change.doc);
      }

    }

  }

}
