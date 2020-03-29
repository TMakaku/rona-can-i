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
  answerExtra?: string,
  theme?: number
}

const ronaBaseHref = '/rona-can-i/'

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
    {question: "Im hungry, <br><i>can I leave <br>the house now?<i>"},
    {question: "I want icecream, <br><i>can I leave <br>the house now?</i>"},
    {question: "My roommate farted, <br><i>can I leave <br>the house now?</i>"},
    {question: "I see a doggo outside, <br><i>can I leave <br>the house now?</i>"},

    {question: "In need of ramen, <br><i>can I leave <br>the house now?</i>"},
    {question: "I feel like I won't <br>catch the virus, <br><i>can I leave <br>the house now?</i>"},
    {question: "I'm craving <br>ice cream, <br><i>can I leave <br>the house now?</i>"},
    {question: "I watched <br>everything <br>on Netflix, <br><i>can I leave <br>the house now?</i>"},
    {question: "It's nice <br>weather, <br><i>can I leave <br>the house now?</i>"},
    {question: "Simon says: <br>“go outside”, <br><i>can I leave <br>the house now?</i>"},
    {question: "I did every <br>instagram <br>#challenge, <br><i>can I leave <br>the house now?</i>"},
    {question: "I need a new <br>puzzle, <br><i>can I leave <br>the house now?</i>"},
    {question: "I need to get <br>away from my <br>husband, it's for <br>his own safety, <br><i>can I leave <br>the house now?</i>"},
    {question: "I washed my <br>hands, twice, <br><i>can I leave <br>the house now?</i>"},
    {question: "My family is <br>driving me <br>crazy, <br><i>can I leave <br>the house now?</i>"},
    {question: "I need extra <br>toilet paper, <br><i>can I leave <br>the house now?</i>"},
    {question: "I named all the <br>spiders in my <br>house, <br><i>can I leave <br>the house now?</i>"},
    {question: "My hair looks <br>amazing today, <br><i>can I leave <br>the house now?</i>"},
    {question: "All my friends <br>are at the beach, <br><i>can I leave <br>the house now?</i>"},
    {question: "There's SALE, <br><i>can I leave <br>the house now?</i>"},
    {question: "I see 23 puppies <br>outside, <br><i>can I leave <br>the house now?</i>"},
    {question: "My house is <br>infested with <br>giant iguanas, <br><i>can I leave <br>the house now?</i>"},
    {question: "I don't like my <br>kids anymore, <br><i>can I leave <br>the house now?</i>"},
    {question: "My cat is <br>possessed, <br><i>can I leave <br>the house now?</i>"},
    {question: "I'm all caught up <br>on Instagram, <br><i>can I leave <br>the house now?</i>"},
    {question: "It's complicated, <br><i>can I leave <br>the house now?</i>"},
    {question: "Trump said it's <br>okay to leave <br>the house, <br><i>can I leave <br>the house now?</i>"},
    {question: "I ran out of <br>weed and booze, <br><i>can I leave <br>the house now?</i>"},
    {question: "I need to go to <br>the barbershop, <br>desperately, <br><i>can I leave <br>the house now?</i>"},
    {question: "I'm a match <br>on tinder, <br><i>can I leave <br>the house now?</i>"},
    {question: "I smell smoke, <br>I think there <br>is a fire, <br><i>can I leave <br>the house now?</i>"},
    {question: "My nail broke, <br><i>can I leave <br>the house now?</i>"},
    {question: "I literally need <br>a flat white, <br><i>can I leave <br>the house now?</i>"},
    {question: "I need to get <br>the F#$% out <br>of my house, <br><i>can I leave <br>the house now?</i>"},
    {question: "I haven't had <br>KFC for days, <br><i>can I leave <br>the house now?</i>"},
    {question: "My mom said <br>to get out of <br>her sight this <br>instance, <br><i>can I leave <br>the house now?</i>"},
    {question: "I've never spent <br>this much time <br>with the Mrs, <br><i>can I leave <br>the house now?</i>"},

    {question: "My prins <br>charming is <br>outside, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra:"he should be inside"},
    {question: "I'm out of wine, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra:"...just hurry back"},
    {question: "I'm horny and <br>my partners <br>parents aren't <br>home, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra:"your partners parents <br>should be home"},
    {question: "It's my birthday, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra:"happy birthday"},
    {question: "Yo quiero tacos, <br><i>can I leave <br>the house now?</i>", answer: "¡NO!"},
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
    fromEvent(document.defaultView, EVENT_RESIZE)
      .pipe(debounceTime(100))
      .subscribe(() => {
        const { innerHeight, innerWidth } = document.defaultView;
        console.log(innerHeight, innerWidth);
      })
  }

  ngOnInit() {
    const urlIndex = Number(window.location.pathname.substring(ronaBaseHref.length));
    this.determineText(urlIndex);
    this.lottieSize = this.isMobileDevice() ? 150 : 250;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#085F83';
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
    window.history.pushState('', "Rona can I?</i>", `/rona-can-i/${randomIndex}`);
    this.canIText = this.createTitleObject(this.titles[randomIndex]);
  }

  private getRandomIndex() {
    const index = Math.floor(Math.random() * this.titles.length);
    return index !== NaN && index !== this.prevIndex ? index : this.getRandomIndex();
  }

  private  createTitleObject ({question, answer, answerExtra}: TitleObject): TitleObject {
    return { question: question, answer: answer ? answer : "NO!", answerExtra: answerExtra } 
  }

  isMobileDevice() {
    // todo replace with this.windowSize..
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
}
