import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ExhangesComponent } from './exhanges/exhanges.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrenciesSearchComponent } from './currencies-search/currencies-search.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuotesService } from './quotes.service';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    ExhangesComponent,
    PortfolioComponent,
    CurrenciesComponent,
    CurrenciesSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PlotlyModule
  ],
  providers: [
    QuotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
