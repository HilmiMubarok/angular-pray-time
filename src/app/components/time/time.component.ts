import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeComponent implements OnInit {
  time: Observable<any>;
  now: Date = new Date();

  imsak: any;
  fajr: any;
  dhuhr: any;
  asr: any;
  maghrib: any;
  isha: any;

  nearImsak: any;
  nearFajr: any;
  nearDhuhr: any;
  nearAsr: any;
  nearMaghrib: any;
  nearIsha: any;

  selected: string | undefined;

  constructor(private timeService: TimeService) {
    this.time = this.timeService.getTime();
    this.fajr = this.timeService.getPrayTime('Fajr');
    this.dhuhr = this.timeService.getPrayTime('Dhuhr');
    this.asr = this.timeService.getPrayTime('Asr');
    this.maghrib = this.timeService.getPrayTime('Maghrib');
    this.isha = this.timeService.getPrayTime('Isha');
    this.imsak = this.timeService.getPrayTime('Imsak');
  }

  ngOnInit() {
    const prayerTimes = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    prayerTimes.forEach((prayer) => {
      this.timeService.isPrayTimeCloseToNow(prayer).subscribe((res) => {
        if (res.isCloseToNow && res.timeDiffToNow <= 5) {
          this.selected = prayer;
        }
      });
    });
  }
}
