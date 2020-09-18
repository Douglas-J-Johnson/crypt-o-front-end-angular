import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ExhangesComponent } from './exhanges/exhanges.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioPieChartComponent } from './portfolio-pie-chart/portfolio-pie-chart.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrenciesSearchComponent } from './currencies-search/currencies-search.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuotesService } from './quotes.service';

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
    FormsModule,
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
