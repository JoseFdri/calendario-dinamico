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

  public crear_calendario() {
    if(!this.numberDays) {
      return
    }
    this.meses.length = 0
    var stringStartDate = this.startDate.split('-')
    this.start = new Date(stringStartDate[0], +stringStartDate[1] - 1, stringStartDate[2])
    this.runningDate = new Date(stringStartDate[0], +stringStartDate[1] - 1, stringStartDate[2])
    this.end = new Date(stringStartDate[0], +stringStartDate[1] - 1, stringStartDate[2])
    this.end.setDate(this.end.getDate() + this.numberDays)
    var condition = true
    console.log(this.start, this.end)
    while (condition) {
      let modeloMes = this.crear_mes(this.runningDate)
      let newMes = this.llenar_fechas_mes(modeloMes, this.runningDate)
      this.meses.push(newMes)
      if(this.runningDate.getFullYear() == this.end.getFullYear() && this.runningDate.getMonth() == this.end.getMonth()) {
        condition = false
      }
      this.runningDate.setMonth(this.runningDate.getMonth() + 1)
    }
    console.log(this.meses)
  }

  private llenar_fechas_mes (modeloMes, date: Date) {
    let anio = date.getFullYear()
    let mes = date.getMonth()
    let dias = new Date(anio, mes + 1, 0).getDate();
    let fila = 0
    
    for (let dia = 1; dia <= dias; dia++) {
      let orden = new Date(new Date(anio, mes).setDate(dia)).getDay()
      if(this.start.getMonth() == mes && this.start.getDate() == dia && this.start.getFullYear() == anio) {
        this.pintar = true
      }
      if(this.pintar) {
        modeloMes.semanas[fila][orden].fecha = dia
      } else if (modeloMes.semanas[fila][orden].color != 'yellow'){
        modeloMes.semanas[fila][orden].color = 'grey'
      }
      if(this.end.getMonth() == mes && this.end.getDate() == dia && this.end.getFullYear() == anio) {
        this.pintar = false
      }
      if(orden == 6) {
        fila++
      }
      if(dia == dias && orden != 6) {
        fila++
      }
    }
    return modeloMes
  }
  
  private crear_mes(fecha : Date ) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    let modeloMes = {
      nombre: monthNames[fecha.getMonth()] + ' '+ fecha.getFullYear(),
      semanas : []
    }
    const numDias = 7
    const semanas = this.contar_semanas_de_mes(fecha)
    for (let i = 0; i < semanas; i++) {
      var semana = []
      for (let a = 0; a < numDias; a++) {
        let modeloDia = {
          fecha: '',
          color: a == 0 || a == 6 ? 'yellow' : 'grey'
        }
        semana.push(modeloDia)
      }
      modeloMes.semanas.push(semana)
    }
    return modeloMes
  }

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
