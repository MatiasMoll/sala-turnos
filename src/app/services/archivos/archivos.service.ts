import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';

import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(

  ) { }

  // crearYDescargarExcel(
  //   nombreHoja:string,
  //   headers:Array<string>,
  //   data:any,
  //   fileName:string
  // ){
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet(nombreHoja);
  //   worksheet.addRow(headers);
  //   for (let x1 of data)
  //   {
  //     let x2=Object.keys(x1);
  //     let temp=[]
  //     for(let y of x2)
  //     {
  //       temp.push(x1[y])
  //     }
  //     worksheet.addRow(temp)
  //   }
  //   workbook.xlsx.writeBuffer().then((data) =>{
  //     let blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  //     fs.saveAs(blob, fileName + '-' + new Date().valueOf() + '.xlsx');
  //   });
  // }
  crearYDescargarExcel(
    mapNombreHojaHeadersData:Map<string,Array<string>>,
    filename:string
  ){
    let workbook = new Workbook();
    for(let arr of mapNombreHojaHeadersData){
      console.log(arr);
     
      let worksheet = workbook.addWorksheet(arr[0]);
      console.log(arr[1].slice(0,6));
      worksheet.addRow(arr[1].slice(0,6));
      
      for(let i = 6 ; i < arr[1].length ; i ++){
        let x1 = arr[1][i];
        let objeto = JSON.parse(x1);
        let x2=Object.keys(objeto);
        let temp=[]
        for(let y of x2)
        {
          temp.push(objeto[y])
        }
        worksheet.addRow(temp)
      } 
    }
 
    workbook.xlsx.writeBuffer().then((data) =>{
      console.log(data);
      let blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, filename + '-' + new Date().valueOf() + '.xlsx');
    });    

  }

  
}


