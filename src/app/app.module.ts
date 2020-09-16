import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ExhangesComponent } from './exhanges/exhanges.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioPieChartComponent } from './portfolio-pie-chart/portfolio-pie-chart.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrenciesSearchComponent } from './currencies-search/currencies-search.component';

import { QuotesService } from './quotes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    ExhangesComponent,
    PortfolioComponent,
    PortfolioPieChartComponent,
    CurrenciesComponent,
    CurrenciesSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    QuotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
