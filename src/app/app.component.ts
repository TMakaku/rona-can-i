import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { S1LottieConfig } from '@sentinel-one/s1-lottie';
import { AnimationItem } from 'lottie-web';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const EVENT_RESIZE = 'resize';
export interface TitleObject {
  question: string,
  answer?: string,
  theme?: number
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private myAnimation: AnimationItem;
  private windowsize;
  private prevIndex = 0;

  private titles: TitleObject[] = [
    {question: "Im hungry, <br>can I leave <br>the house now?"},
    {question: "I want icecream, <br>can I leave <br>the house now?"},
    {question: "My roommate farted, <br>can I leave <br>the house now?"},
    {question: "I see a doggo outside, <br>can I leave <br>the house now"},

    {question: "In need of ramen, <br>can I leave <br>the house now?"},
    {question: "I feel like I won't <br>catch the virus, <br>can I leave <br>the house now"},
    {question: "I'm craving <br>ice cream, <br>can I leave <br>the house now"},
    {question: "I watched <br>everything <br>on Netflix, <br>can I leave <br>the house now"},
    {question: "It's nice <br>weather, <br>can I leave <br>the house now"},
    {question: "Simon says: <br>“go outside”, <br>can I leave <br>the house now"},
    {question: "I did every <br>instagram <br>#challenge, <br>can I leave <br>the house now"},
    {question: "I need a new <br>puzzle, <br>can I leave <br>the house now"},
    {question: "I need to get <br>away from my <br>husband, it's for <br>his own safety, <br>can I leave <br>the house now"},
    {question: "I washed my <br>hands, twice, <br>can I leave <br>the house now"},
    {question: "My family is <br>driving me <br>crazy, <br>can I leave <br>the house now"},
    {question: "I need extra <br>toilet paper, <br>can I leave <br>the house now"},
    {question: "I named all the <br>spiders in my <br>house, <br>can I leave <br>the house now"},
    {question: "My hair looks <br>amazing today, <br>can I leave <br>the house now"},
    {question: "All my friends <br>are at the beach, <br>can I leave <br>the house now"},
    {question: "There's SALE, <br>can I leave <br>the house now"},
    {question: "I see 23 puppies <br>outside, <br>can I leave <br>the house now"},
    {question: "My house is <br>infested with <br>giant iguanas, <br>can I leave <br>the house now"},
    {question: "I don't like my <br>kids anymore, <br>can I leave <br>the house now"},
    {question: "My cat is <br>possessed, <br>can I leave <br>the house now"},
    {question: "I'm all caught up <br>on Instagram, <br>can I leave <br>the house now"},
    {question: "It's complicated, <br>can I leave <br>the house now"},
    {question: "Trump said it's <br>okay to leave <br>the house, <br>can I leave <br>the house now"},
    {question: "I ran out of <br>weed and booze, <br>can I leave <br>the house now"},
    {question: "I need to go to <br>the barbershop, <br>desperately, <br>can I leave <br>the house now"},
    {question: "I'm a match <br>on tinder, <br>can I leave <br>the house now"},
    {question: "I smell smoke, <br>I think there <br>is a fire, <br>can I leave <br>the house now"},
    {question: "My nail broke, <br>can I leave <br>the house now"},
    {question: "I literally need <br>a flat white, <br>can I leave <br>the house now"},
    {question: "I need to get <br>the F#$% out <br>of my house, <br>can I leave <br>the house now"},
    {question: "I haven't had <br>KFC for days, <br>can I leave <br>the house now"},
    {question: "My mom said <br>to get out of <br>her sight this <br>instance, <br>can I leave <br>the house now"},
    {question: "I've never spent <br>this much time <br>with the Mrs, <br>can I leave <br>the house now"},

    {question: "My prins <br>charming is <br>outside, <br>can I leave <br>the house now", answer: "NO! <br>he should be inside"},
    {question: "I'm out of wine, <br>can I leave <br>the house now", answer: "NO! <br>...just hurry back"},
    {question: "I'm horny and <br>my partners <br>parents aren't <br>home, <br>can I leave <br>the house now", answer: "NO! <br>your partners parents <br>should be home"},
    {question: "It's my birthday, <br>can I leave <br>the house now", answer: "NO! <br>happy birthday"},
    {question: "Yo quiero tacos, <br>can I leave <br>the house now", answer: "¡NO!"},
  ];


  canIText: TitleObject;
  lottieParams: S1LottieConfig = {
    path: 'assets/Refresh.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
  };
  lottieSize = 250;

  constructor(private elementRef: ElementRef) {
    this.windowsize = fromEvent(document.defaultView, EVENT_RESIZE)
      .pipe(debounceTime(100));
  }

  ngOnInit() {
    this.lottieSize = this.isMobileDevice() ? 150 : 250;
    this.windowsize.subscribe(() => {
      const { innerHeight, innerWidth } = document.defaultView;
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
    this.canIText = {question: ''};
    this.myAnimation.stop();
    this.myAnimation.play();
    window.setTimeout(() => this.determineText(), 350);
  }

  private determineText(urlIndex?) {
    const randomIndex = isNaN(urlIndex) || !urlIndex ? this.getRandomIndex() : urlIndex;
    this.prevIndex = randomIndex
    window.history.pushState('', "Rona can I?", `/rona-can-i/${randomIndex}`);
    this.canIText = this.createTitleObject(this.titles[randomIndex]);
  }

  private getRandomIndex() {
    const index = Math.floor(Math.random() * this.titles.length);
    return index !== NaN && index !== this.prevIndex ? index : this.getRandomIndex();
  }

  private  createTitleObject (obj: TitleObject): TitleObject {
    return { question: obj.question, answer: obj.answer ? obj.answer : "NO" } 
  }

  isMobileDevice() {
    // todo replace with this.windowSize..
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
}
