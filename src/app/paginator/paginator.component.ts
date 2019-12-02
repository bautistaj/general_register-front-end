import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  
  @Input() paginator: any;
  public pages: number[];

  public from: number;
  public to: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let newPaginator = changes['paginator'];
    
    if(newPaginator.previousValue){
      this.initPaginator();
    }
    
  }

  private initPaginator(): void{
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages -5 );
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if(this.paginator.totalPages > 5){

      this.pages = new Array(this.to - this.from + 1)
      .fill(0).map((_value, index) => index + this.from );

    } else {
      this.pages = new Array(this.paginator.totalPages)
      .fill(0).map((_value, index) => index + 1 );
    }
  }
}
