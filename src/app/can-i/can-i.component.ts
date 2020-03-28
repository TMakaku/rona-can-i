import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rona-can-i',
  templateUrl: './can-i.component.html',
  styleUrls: ['./can-i.component.scss']
})
export class CanIComponent implements OnInit, OnChanges{
@Input() 
title = "";

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.title)
  }

  ngOnInit(): void {
  }

}
