import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TitleObject } from '../app.component';

@Component({
  selector: 'rona-can-i',
  templateUrl: './can-i.component.html',
  styleUrls: ['./can-i.component.scss']
})
export class CanIComponent implements OnInit, OnChanges {
  @Input()
  title: TitleObject;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.title)
  }

  ngOnInit(): void {
  }

}
