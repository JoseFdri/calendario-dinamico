import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public startDate
  public numberDays
  public countryCode
  public meses = []

  private start : Date
  private end : Date
  private runningDate: Date
  private pintar = false

  private contar_semanas_de_mes(date: Date) {
    var anio = date.getFullYear()
    var mes = date.getMonth()
    var totalDiasDelMes = new Date(anio, mes +1, 0).getDate();

    var numSemanas = 0 ;
    for (var i = 1 ; i <= totalDiasDelMes; i++) {
        var ordenDia = this.obtener_orden_dia(anio,mes,i).getDay();
        if(ordenDia == 6){
            numSemanas++;
        }
        if(i == totalDiasDelMes) {
          if(ordenDia != 6) {
            numSemanas++
          }
        }
    }
    return numSemanas;
  }

  private obtener_orden_dia(anio, mes, dia) {
    var date = new Date(anio, mes);
    return new Date(date.setDate(dia));
  }
}
