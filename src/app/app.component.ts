import { Component, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private myAnimation: AnimationItem;
  private prevIndex = 0;

  private titles: TitleObject[] = [
    // { question: "Im hungry, <br><i>can I leave <br>the house now?<i>" },
    { question: "My roommate farted, <br><i>can I leave <br>the house now?</i>" },
    { question: "I see a doggo outside, <br><i>can I leave <br>the house now?</i>" },
    { question: "In need of ramen, <br><i>can I leave <br>the house now?</i>" },
    { question: "I feel like I won't <br>catch the virus, <br><i>can I leave <br>the house now?</i>" },
    { question: "I'm craving <br>ice cream, <br><i>can I leave <br>the house now?</i>" },
    { question: "I watched <br>everything <br>on Netflix, <br><i>can I leave <br>the house now?</i>" },
    { question: "It's nice <br>weather, <br><i>can I leave <br>the house now?</i>" },
    { question: "Simon says: <br>“go outside”, <br><i>can I leave <br>the house now?</i>" },
    { question: "I did every <br>instagram <br>#challenge, <br><i>can I leave <br>the house now?</i>" },
    { question: "I need a new <br>puzzle, <br><i>can I leave <br>the house now?</i>" },
    { question: "I need to get <br>away from my <br>husband, it's for <br>his own safety, <br><i>can I leave <br>the house now?</i>" },
    { question: "I washed my <br>hands, twice, <br><i>can I leave <br>the house now?</i>" },
    { question: "My family is <br>driving me <br>crazy, <br><i>can I leave <br>the house now?</i>" },
    { question: "I need extra <br>toilet paper, <br><i>can I leave <br>the house now?</i>" },
    { question: "I named all the <br>spiders in my <br>house, <br><i>can I leave <br>the house now?</i>" },
    { question: "My hair looks <br>amazing today, <br><i>can I leave <br>the house now?</i>" },
    { question: "All my friends <br>are at the beach, <br><i>can I leave <br>the house now?</i>" },
    { question: "There's SALE, <br><i>can I leave <br>the house now?</i>" },
    { question: "I see 23 puppies <br>outside, <br><i>can I leave <br>the house now?</i>" },
    { question: "My house is <br>infested with <br>giant iguanas, <br><i>can I leave <br>the house now?</i>" },
    { question: "I don't like my <br>kids anymore, <br><i>can I leave <br>the house now?</i>" },
    { question: "My cat is <br>possessed, <br><i>can I leave <br>the house now?</i>" },
    { question: "I'm all caught up <br>on Instagram, <br><i>can I leave <br>the house now?</i>" },
    { question: "It's complicated, <br><i>can I leave <br>the house now?</i>" },
    { question: "Trump said it's <br>okay to leave <br>the house, <br><i>can I leave <br>the house now?</i>" },
    { question: "I ran out of <br>weed and booze, <br><i>can I leave <br>the house now?</i>" },
    { question: "I need to go to <br>the barbershop, <br>desperately, <br><i>can I leave <br>the house now?</i>" },
    { question: "I'm a match <br>on tinder, <br><i>can I leave <br>the house now?</i>" },
    { question: "I smell smoke, <br>I think there <br>is a fire, <br><i>can I leave <br>the house now?</i>" },
    { question: "My nail broke, <br><i>can I leave <br>the house now?</i>" },
    { question: "I literally need <br>a flat white, <br><i>can I leave <br>the house now?</i>" },
    { question: "I need to get <br>the F#$% out <br>of my house, <br><i>can I leave <br>the house now?</i>" },
    { question: "I haven't had <br>KFC for days, <br><i>can I leave <br>the house now?</i>" },
    { question: "My mom said <br>to get out of <br>her sight this <br>instance, <br><i>can I leave <br>the house now?</i>" },
    { question: "I've never spent <br>this much time <br>with the Mrs, <br><i>can I leave <br>the house now?</i>" },
    { question: "My prins <br>charming is <br>outside, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra: "he should be inside" },
    { question: "I'm out of wine, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra: "...just hurry back" },
    { question: "I'm horny and <br>my partners <br>parents aren't <br>home, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra: "your partners parents <br>should be home" },
    { question: "It's my birthday, <br><i>can I leave <br>the house now?</i>", answer: "NO!", answerExtra: "happy birthday" },
    { question: "Yo quiero tacos, <br><i>can I leave <br>the house now?</i>", answer: "¡NO!" },
  ];

  private colorSchemes = [
    { textcolor: "#818061", bgcolor: "#F1CB92" },
    { textcolor: "#FD715D", bgcolor: "#323E48" },
    { textcolor: "#EAC629", bgcolor: "#685E5F" },
    { textcolor: "#EAC629", bgcolor: "#F23465" },
    { textcolor: "#EC4A26", bgcolor: "#F1CB92" },
    { textcolor: "#F4971A", bgcolor: "#085F83" },
    { textcolor: "#7A2129", bgcolor: "#C0D5DB" },
    { textcolor: "#20263D", bgcolor: "#F4971A" },
    { textcolor: "#20263D", bgcolor: "#EC4A26" },
    { textcolor: "#AAC7AF", bgcolor: "#F23465" },
    { textcolor: "#66429C", bgcolor: "#CBE684" },
    { textcolor: "#B1C3B4", bgcolor: "#3834F2" },
    { textcolor: "#F4BEBA", bgcolor: "#085F83" },
    { textcolor: "#085F83", bgcolor: "#CBE684" },
    { textcolor: "#7A2129", bgcolor: "#D7C1C1" },
    { textcolor: "#66429C", bgcolor: "#EAC629" },
    { textcolor: "#F23465", bgcolor: "#20263D" },
    { textcolor: "#20263D", bgcolor: "#CFD3D6" },
    { textcolor: "#EAC629", bgcolor: "#3834F2" },
    { textcolor: "#83A6F6", bgcolor: "#20263D" },
// -----------------------------------------------
    { textcolor: "#F1CB92", bgcolor: "#818061" },
    { textcolor: "#323E48", bgcolor: "#FD715D" },
    { textcolor: "#685E5F", bgcolor: "#EAC629" },
    { textcolor: "#F23465", bgcolor: "#EAC629" },
    { textcolor: "#F1CB92", bgcolor: "#EC4A26" },
    { textcolor: "#085F83", bgcolor: "#F4971A" },
    { textcolor: "#C0D5DB", bgcolor: "#7A2129" },
    { textcolor: "#F4971A", bgcolor: "#20263D" },
    { textcolor: "#EC4A26", bgcolor: "#20263D" },
    { textcolor: "#F23465", bgcolor: "#AAC7AF" },
    { textcolor: "#CBE684", bgcolor: "#66429C" },
    { textcolor: "#3834F2", bgcolor: "#B1C3B4" },
    { textcolor: "#085F83", bgcolor: "#F4BEBA" },
    { textcolor: "#CBE684", bgcolor: "#085F83" },
    { textcolor: "#D7C1C1", bgcolor: "#7A2129" },
    { textcolor: "#EAC629", bgcolor: "#66429C" },
    { textcolor: "#20263D", bgcolor: "#F23465" },
    { textcolor: "#CFD3D6", bgcolor: "#20263D" },
    { textcolor: "#3834F2", bgcolor: "#EAC629" },
    { textcolor: "#20263D", bgcolor: "#83A6F6" },
  ]

  canIText: TitleObject;
  lottieParams: S1LottieConfig = {
    path: 'assets/Refresh.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
  };
  lottieSize = 250;
  firstUrlIndex: number;

  constructor(private elementRef: ElementRef) {
    fromEvent(document.defaultView, EVENT_RESIZE)
      .pipe(debounceTime(100))
      .subscribe(() => {
        const { innerHeight, innerWidth } = document.defaultView;
        console.log(innerHeight, innerWidth);
      })
  }
  @ViewChild('maintextDiv') maintext: ElementRef;

  ngOnInit() {
    this.firstUrlIndex = Number(window.location.pathname.substring(1));
    this.determineText(this.firstUrlIndex);
    this.lottieSize = this.isMobileDevice() ? 150 : 250;
  }

  ngAfterViewInit() {
    this.setColorScheme(this.firstUrlIndex);
  }


  onAnimationCreated(animation: AnimationItem) {
    this.myAnimation = animation;
    this.myAnimation.setSpeed(3);
  }

  refreshed() {
    this.canIText = { question: '' };
    this.myAnimation.stop();
    this.myAnimation.play();
    window.setTimeout(() => this.determineText(), 350);
  }

  private determineText(urlIndex?) {
    const randomIndex = isNaN(urlIndex) || !urlIndex ? this.getRandomIndex() : urlIndex;
    this.prevIndex = randomIndex
    window.history.pushState('', "Rona can I?", `/${randomIndex}`);
    if (!urlIndex){
      this.setColorScheme(randomIndex);
    }
    this.canIText = this.createTitleObject(this.titles[randomIndex]);
  }

  private setColorScheme(index: number) {
    const { textcolor, bgcolor } = this.colorSchemes[index];
    this.maintext.nativeElement.style.color = textcolor;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = bgcolor;
  }

  private getRandomIndex() {
    const index = Math.floor(Math.random() * this.titles.length);
    return index !== NaN && index !== this.prevIndex ? index : this.getRandomIndex();
  }

  private createTitleObject({ question, answer, answerExtra }: TitleObject): TitleObject {
    return { question: question, answer: answer ? answer : "NO!", answerExtra: answerExtra }
  }

  isMobileDevice() {
    // todo replace with this.windowSize..
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
}
