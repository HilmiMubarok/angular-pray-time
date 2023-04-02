import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
// toolbar
import { MatToolbarModule } from '@angular/material/toolbar';

// icon
import { MatIconModule } from '@angular/material/icon';

// button
import { MatButtonModule } from '@angular/material/button';

// grid
import { MatGridListModule } from '@angular/material/grid-list';

// card
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeComponent } from './components/time/time.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AppComponent, TimeComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    // Angular Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TimeComponent, ToolbarComponent],
})
export class AppModule {}
