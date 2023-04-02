import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, interval, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private time$: Observable<string>;

  constructor(private http: HttpClient) {
    this.time$ = interval(1000).pipe(
      map(() => {
        const date = new Date();
        return `${date.toLocaleTimeString('en-US', { hour12: false })}`;
      })
    );
  }

  isPrayTimeCloseToNow(
    prayer: string
  ): Observable<{ isCloseToNow: boolean; timeDiffToNow: number }> {
    return this.http
      .get(
        'https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=8'
      )
      .pipe(
        map((response: any) => response.data.timings[prayer]),
        map((time: string) => {
          const [hours, minutes] = time.split(':').map(Number);
          const sekarang = new Date();
          const pray = new Date(
            sekarang.getFullYear(),
            sekarang.getMonth(),
            sekarang.getDate(),
            hours,
            minutes
          );
          const prayerTimeInMs = pray.getTime();
          const currentTimeInMs = new Date().getTime();
          const timeDiffToNow = Math.abs(prayerTimeInMs - currentTimeInMs);
          const diffInHours = Math.round(timeDiffToNow / 3600000);
          const isCloseToNow = diffInHours <= 5;
          return {
            isCloseToNow,
            timeDiffToNow: diffInHours,
          };
        })
      );
  }

  getPrayTime(prayer: string) {
    return this.http
      .get(
        'https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=8'
      )
      .pipe(map((data: any) => data.data.timings[prayer]));
  }

  getTime(): Observable<string> {
    return this.time$;
  }
}

// isPrayTimeCloseToNoww(prayer: string) {
//   const response = this.http.get(
//     'http://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=8'
//   );
//   const timings = response.pipe(map((data: any) => data.data.timings));
//   const prayerTime = timings.pipe(map((data: any) => data[prayer]));
//   const prayerTimeInMs = prayerTime.pipe(
//     map((data: any) => {
//       const [hours, minutes] = data.split(':').map(Number);
//       const sekarang = new Date();
//       const pray = new Date(
//         sekarang.getFullYear(),
//         sekarang.getMonth(),
//         sekarang.getDate(),
//         hours,
//         minutes
//       );
//       return pray.getTime();
//     })
//   );

//   const currentTimeInMs = interval(1000).pipe(
//     map(() => {
//       return new Date().getTime();
//     })
//   );

//   const timeDiffToNow = prayerTimeInMs.pipe(
//     switchMap((prayerTimeInMs) =>
//       currentTimeInMs.pipe(
//         map((currentTimeInMs) => {
//           const inMs = Math.abs(prayerTimeInMs - currentTimeInMs);
//           const diffInHours = Math.round(inMs / 3600000);
//           return diffInHours;
//         })
//       )
//     )
//   );

//   const isCloseToNow = timeDiffToNow.pipe(
//     map((timeDiffToNow) => {
//       const threshold = 3600000;
//       if (timeDiffToNow <= threshold) {
//         return {
//           isCloseToNow: true,
//           timeDiffToNow,
//         };
//       } else {
//         return {
//           isCloseToNow: false,
//           timeDiffToNow,
//         };
//       }
//     })
//   );

//   return isCloseToNow;
// }
