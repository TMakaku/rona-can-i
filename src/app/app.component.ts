import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { S1LottieConfig } from '@sentinel-one/s1-lottie';
import { AnimationItem } from 'lottie-web';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const EVENT_RESIZE = 'resize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private myAnimation: AnimationItem;
  private windowsize;
  private prevIndex = 0;

  private titles: string[] = [
    "Im hungry.. can i leave the house?",
    "I want icecream.. can i leave the house?",
    "My roommate farted.. can i leave the house?",
    "I see a doggo outside.. can i leave the house?"
  ];

  canIText: string;
  lottieParams: S1LottieConfig = {
    path: 'assets/Refresh.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
  };
  lottieSize = 250;

  constructor(private elementRef: ElementRef ) {
    this.windowsize = fromEvent(document.defaultView, EVENT_RESIZE)
    .pipe(debounceTime(100));
  }

  ngOnInit() {
    this.lottieSize = this.isMobileDevice() ? 150 : 250;
    this.windowsize.subscribe(() =>  {
      const {innerHeight, innerWidth} = document.defaultView;
      console.log(innerHeight, innerWidth);
    })
    const urlIndex = Number(window.location.pathname.substring(1));
    this.determineText(urlIndex);
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

  private determineText(urlIndex?) {
    const randomIndex = isNaN( urlIndex ) || !urlIndex ? this.getRandomIndex(): urlIndex;
    this.prevIndex = randomIndex
    window.history.pushState('', "Rona can I?", `/` + randomIndex);
    this.canIText = this.titles[randomIndex];
  }

  private getRandomIndex() {
    const index = Math.floor(Math.random() * this.titles.length);
    return index !== NaN && index !== this.prevIndex ? index : this.getRandomIndex();
  }

  isMobileDevice() {
    // todo replace with this.windowSize..
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
}
