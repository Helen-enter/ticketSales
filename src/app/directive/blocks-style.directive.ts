import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MessageService} from "primeng/api";

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': '(initKeyUp($event))',
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string
  @Input() initFirst: boolean = false

  @Output() renderComplete = new EventEmitter()

  private items: HTMLElement[]
  private index: number = 0
  $event: KeyboardEvent;

  public activeElementIndex: number

  constructor(private el: ElementRef,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.activeElementIndex = 0
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector)
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red')
        }
      }
    } else {
      console.log('не передан селектор')
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  initKeyUp(ev: KeyboardEvent): void {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style')
    }
    if (ev.key === 'ArrowRight') {
      this.index++;
      if (this.items[this.index]) {
        this.initStyle(this.index)
        // (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
      } else if (this.items.length - 1) {
        this.index = this.items.length - 1;
        this.initStyle(this.index)
        // (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
        this.messageService.add({severity: 'warn', summary: 'Это самый последний элемент'})
        console.log('stop')
      }
    } else if (ev.key === 'ArrowLeft') {
      this.index--;
      if (this.items[this.index]) {
        this.initStyle(this.index)
        //(this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
      } else if (-this.index) {
        this.index = 0;
        this.initStyle(this.index)
        //(this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red')
        this.messageService.add({severity: 'warn', summary: 'Вы дошли до первого элемента'})
        console.log('stop')

      }
    }
    this.activeElementIndex = this.index

  }

  initStyle(index: number) {
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
    }
  }

}
