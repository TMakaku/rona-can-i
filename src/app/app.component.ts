import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { S1LottieConfig } from '@sentinel-one/s1-lottie';
import { AnimationItem } from 'lottie-web';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  canIText: string;
  loading = false;
  myAnimation: AnimationItem;
  private prevIndex = 0;

  titles: string[] = [
    "Im hungry.. can i leave the house?",
    "I want icecream.. can i leave the house?",
    "My roommate farted.. can i leave the house?",
    "I see a doggo outside.. can i leave the house?"
  ];

  lottieParams: S1LottieConfig = {
    path: 'assets/Refresh.json',
    renderer: 'canvas',
    loop: false,
    autoplay: false
  };

  constructor(private elementRef: ElementRef){

  }
  ngOnInit() {
    this.determineText();
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'green';
  }

  onAnimationCreated(animation: AnimationItem) {
    this.myAnimation = animation;
    this.myAnimation.setSpeed(3);
  }

  refreshed() {
    this.canIText = '';
    this.myAnimation.stop();
    this.myAnimation.play();
    window.setTimeout(() => this.determineText(), 350);
  }

  private determineText() {
    const randomIndex = this.getRandomIndex();
    this.prevIndex = randomIndex
    this.canIText = this.titles[randomIndex];
  }

  private getRandomIndex() {
    const index = Math.floor(Math.random() * this.titles.length);
    return index !== this.prevIndex ? index : this.getRandomIndex();
  }
}
