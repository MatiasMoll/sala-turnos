import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    var contador = 0;
    console.log('este es el map ' + mapNombreHojaHeadersData);
    for(let arr of mapNombreHojaHeadersData){
     for(let i = 0; i<arr[1].length ; i++){
      console.log(arr[1][i]);
      console.log(typeof arr[1][i]);
      if(arr[1][i].includes('{')){

        contador = i;
        break;
      }
     }
      
    }

    console.log(contador);
    for(let arr of mapNombreHojaHeadersData){
     
     
      let worksheet = workbook.addWorksheet(arr[0]);
      console.log(arr[1].slice(0,contador));
      worksheet.addRow(arr[1].slice(0,contador));

      for(let i = contador; i < arr[1].length ; i ++){
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

  createExcelWithImage(
    mapNombreHojaAndImage:Map<string,Array<string>>,
    filename:string
  ){
    let workbook = new Workbook();
    
    for(let arr of mapNombreHojaAndImage){
      let worksheet = workbook.addWorksheet(arr[0],{properties:{tabColor:{argb:'FF00FF00'}},views:[
        {state: 'frozen', ySplit: 50, activeCell: 'A1', showGridLines:false}
        ]});
      for(let i = 0; i < arr[1].length ; i ++){
        console.log(arr[1][i]);
        let idImage = workbook.addImage({
          base64: arr[1][i],
          extension:'png'
        });
        worksheet.addImage(idImage,'C2:O28');
        // for(let i = 2 ; i<28; i ++){
        //   worksheet.getRow(2).fill = {type:'pattern',pattern:'solid',fgColor:{argb:'FFFF0000'}};
        // }
      }
    }
    
    workbook.xlsx.writeBuffer().then((data) =>{
      console.log(data);
      let blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, filename + '-' + new Date().valueOf() + '.xlsx');
    });    

  }

  crearPdf(
    data:HTMLElement
  )
  {    
    html2canvas(data).then(canvas => {
    
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('Grafico_Turnos.pdf');
    });     
  }
}


