import React, { useState,useReducer, useEffect } from 'react';
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import Icon from '@ant-design/icons';
import { v4 as uuid_v4 } from "uuid";
import { DeleteFilled, EditFilled  } from '@ant-design/icons';
import { ExcelRenderer } from "react-excel-renderer";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useForm } from '../../hooks/useForm';
import {ExcelReducer} from './ExcelReducer'


const init=()=>{
  return JSON.parse(localStorage.getItem('cdrs')) || []

}

export const ExcelApp = () => {

const [datos, setDatos]=useState({
fijos_lima_magnavoz:'',
fijos_provincia_magnavoz:'',
moviles_magnavoz:'',
internacionales_magnavoz:'',
rural_magnavoz:'',

})


const {magnavoz,convergia}=datos;

console.log(magnavoz);
console.log(convergia);



  //MAGNAVOZ
  const [state, setState] = useState({
    cols: [],
    rows: [],
    errorMessage: null,
    
  });


  const {rows} = state
 


const checkFile=(file)=> {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }


    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }



 const fileHandler = (fileList) => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
     setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);

    const nametexto=fileObj.name;
    const recorte=nametexto.split("_");
  const reporte=recorte[0];
  const monthCdr=recorte[1];

 
  console.log(reporte);

  


    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
                id:uuid_v4(),
                columna0:reporte,
                columna1:row[0],
              columna2: row[1],
              columna3: row[2],
              columna4: row[3],
              columna5:row[4],
              columna6:row[5],
                columna7:row[6],
                columna8:row[7],
                columna9:row[8],
                columna10:row[9],
                columna11:row[10],
                columna12:row[11],
                columna13:row[12],
                columna14:monthCdr,

            });
          }
        });
        if (newRows.length === 0) {
         setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
        setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  const modificacionRows=rows.map((p)=>{
  
    let destino,minutes,mes,arreglo; 
   


    switch (p.columna0) {
   
     case 'Magnavoz':
      destino=p.columna1;
      minutes=p.columna2;
      mes=p.columna14;
      arreglo={destino,minutes}

     /*  return arreglo; */
      
      if(destino.indexOf('mobile')>-1){
        return {destino:'Moviles_Magnavoz',minutes,mes};
      }else if(destino.indexOf('lima')>-1){
        return {destino:'Fijos_Lima_Magnavoz',minutes,mes};
      }else if(destino.indexOf('Lima')>-1){
        return {destino:'Fijos_Lima_Magnavoz',minutes,mes};
      }else{
        return {destino:'Fijos_Provincia_Magnavoz',minutes,mes};
      }

     
        default:
         return p;
    }


  })

const pruebaDato=[{destino: "Fijos_Lima_Magnavoz", minutes:'',mes:''},{destino: "Fijos_Provincia_Magnavoz", minutes: '',mes:''},{destino: "Moviles_Magnavoz", minutes: '',mes:''},{destino: "Rural_Magnavoz", minutes: '',mes:''},{destino: "Internacional_Magnavoz", minutes: '',mes:''}]
const arregloModificado=modificacionRows.concat(pruebaDato)
 /*  console.log(arregloModificado); */

  let  magnavozRows=  arregloModificado.reduce((groups, item)=>{
   var val = item['destino'];
   groups[val] = groups[val] || {destino: item.destino, minutes: 0, empresa:'Magnavoz',mes:item.mes};
   groups[val].minutes += item.minutes;

   return groups;
}, {});


let resultData2 = Object.values(magnavozRows);
/* console.log(resultData2); */

/* let minutosMagnavoz=resultData2.map(({destino,minutes})=>{

if(destino.indexOf('mobile')>-1){
  return {destino:'Moviles',minutes};

}else if(destino.indexOf('lima')>-1){
  return {destino:'Fijos Lima',minutes};
}
else{

 return {destino:'Fijos Provincia',minutes};
}

})
console.log(minutosMagnavoz); */







  
   

    //Convergia
    const [state1, setState1] = useState({
      cols1: [],
      rows1: [],
      errorMessage1: null,
      
    });
  
  
    const {rows1} = state1
   
  
  
  const checkFile1=(file)=> {
      let errorMessage = "";
      if (!file || !file[0]) {
        return;
      }
  
  
      const isExcel =
        file[0].type === "application/vnd.ms-excel" ||
        file[0].type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExcel) {
        errorMessage = "You can only upload Excel file!";
      }
      console.log("file", file[0].type);
      const isLt2M = file[0].size / 1024 / 1024 < 2;
      if (!isLt2M) {
        errorMessage = "File must be smaller than 2MB!";
      }
      console.log("errorMessage", errorMessage);
      return errorMessage;
    }
  
  
  
   const fileHandler1 = (fileList) => {
      console.log("fileList", fileList);
      let fileObj = fileList;
      if (!fileObj) {
       setState({
          errorMessage: "No file uploaded!"
        });
        return false;
      }
      console.log("fileObj.type:", fileObj.type);
  
      const nametexto=fileObj.name;
      const recorte=nametexto.split("_");
    const reporte=recorte[0];
  
   
    console.log(reporte);
  
    
  
  
      if (
        !(
          fileObj.type === "application/vnd.ms-excel" ||
          fileObj.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        setState1({
          errorMessage: "Unknown file format. Only Excel files are uploaded!"
        });
        return false;
      }
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          let newRows = [];
          
          resp.rows.slice(1).map((row, index) => {
            if (row && row !== "undefined") {
              newRows.push({
                  id:uuid_v4(),
                  columna0:reporte,
                  columna1:row[0],
                columna2: row[1],
                columna3: row[2],
                columna4: row[3],
                columna5:row[4],
                columna6:row[5],
                  columna7:row[6],
                  columna8:row[7],
                  columna9:row[8],
                  columna10:row[9],
                  columna11:row[10],
                  columna12:row[11],
                  columna13:row[12],
  
              });
            }
          });
          if (newRows.length === 0) {
           setState1({
              errorMessage: "No data found in file!"
            });
            return false;
          } else {
          setState1({
              cols1: resp.cols1,
              rows1: newRows,
              errorMessage1: null
            });
          }
        }
      });
      return false;
    };
  
    const modificacionRows1=rows1.map((p)=>{
  
         let destino,minutes,arreglo; 
        
  
  
         switch (p.columna0) {
        
          case 'Convergia':
            destino=p.columna6;
            minutes=p.columna9;
            arreglo={destino,minutes}

            if(destino.indexOf('Lima')>-1){
              return {destino:'Fijos_Lima_Convergia',minutes};
            }else if(destino.indexOf('Mobile')>-1){
              return {destino:'Moviles_Convergia',minutes};
            }else if(destino.indexOf('Rural')>-1){
              return {destino:'Rural_Convergia',minutes};
            }else if(destino.indexOf('Internacional')>-1){
              return {destino:'Internacional_Convergia',minutes};
            }else{
              return {destino:'Fijos_Provincia_Convergia',minutes};
            }

                 
              
              
                  
                 
         
             default:
              return p;
         }
  
  
       })

       const pruebaDato1=[{destino: "Fijos_Lima_Convergia", minutes:''},{destino: "Fijos_Provincia_Convergia", minutes: ''},{destino: "Moviles_Convergia", minutes: ''},{destino: "Rural_Convergia", minutes: ''},{destino: "Internacional_Convergia", minutes: ''}]
const arregloModificado1=modificacionRows1.concat(pruebaDato1)
  /* console.log(arregloModificado); */
  
       let  convergiaRows=  arregloModificado1.reduce((groups, item)=>{
        var val = item['destino'];
        groups[val] = groups[val] || {destino: item.destino, minutes: 0,empresa:'Convergia'};
        groups[val].minutes += item.minutes;
  
        return groups;
    }, {});
  
  
    let resultData1 = Object.values( convergiaRows);


    /* let minutosConvergia=resultData1.map(({destino,minutes})=>{

     if(destino.indexOf('Lima')>-1){
  
       return {destino:'Fijos Lima',minutes};
     }else if(destino.indexOf('Mobile')>-1){
      return {destino:'Moviles',minutes};
     }
     else{
    
      return {destino:'Fijos Provincia',minutes};
     }
  
    }) */
console.log(resultData1);


//Ipbusiness
const [state3, setState3] = useState({
  cols3: [],
  rows3: [],
  errorMessage1: null,
  
});


const {rows3} = state3



const checkFile2=(file)=> {
  let errorMessage = "";
  if (!file || !file[0]) {
    return;
  }


  const isExcel =
    file[0].type === "application/vnd.ms-excel" ||
    file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    errorMessage = "You can only upload Excel file!";
  }
  console.log("file", file[0].type);
  const isLt2M = file[0].size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errorMessage = "File must be smaller than 2MB!";
  }
  console.log("errorMessage", errorMessage);
  return errorMessage;
}



const fileHandler2 = (fileList) => {
  console.log("fileList", fileList);
  let fileObj = fileList;
  if (!fileObj) {
   setState3({
      errorMessage: "No file uploaded!"
    });
    return false;
  }
  console.log("fileObj.type:", fileObj.type);

  const nametexto=fileObj.name;
  const recorte=nametexto.split("_");
const reporte=recorte[0];


console.log(reporte);




  if (
    !(
      fileObj.type === "application/vnd.ms-excel" ||
      fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
  ) {
    setState3({
      errorMessage: "Unknown file format. Only Excel files are uploaded!"
    });
    return false;
  }
  //just pass the fileObj as parameter
  ExcelRenderer(fileObj, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      let newRows = [];
      
      resp.rows.slice(1).map((row, index) => {
        if (row && row !== "undefined") {
          newRows.push({
              id:uuid_v4(),
              columna0:reporte,
              columna1:row[0],
            columna2: row[1],
            columna3: row[2],
            columna4: row[3],
            columna5:row[4],
            columna6:row[5],
              columna7:row[6],
              columna8:row[7],
              columna9:row[8],
              columna10:row[9],
              columna11:row[10],
              columna12:row[11],
              columna13:row[12],

          });
        }
      });
      if (newRows.length === 0) {
       setState3({
          errorMessage: "No data found in file!"
        });
        return false;
      } else {
      setState3({
          cols3: resp.cols1,
          rows3: newRows,
          errorMessage1: null
        });
      }
    }
  });
  return false;
};

const modificacionRows3=rows3.map((p)=>{

     let destino,minutes,arreglo; 
    


     switch (p.columna0) {
    
      case 'Ipbusiness':
                  
        destino=p.columna2;
        minutes=p.columna4;
        arreglo={destino,minutes}

       
       
        if(destino.indexOf('Lima')>-1){
          return {destino:'Fijos_Lima_Ipbusiness',minutes};
        }else if(destino.indexOf('Mobile')  >-1){
          return {destino:'Moviles__Ipbusiness',minutes};
        }else if(destino.indexOf('MOBILE')   >-1){
          return {destino:'Moviles__Ipbusiness',minutes};
        }else if(destino.indexOf('Rural')>-1){
          return {destino:'Rural__Ipbusiness',minutes};
        }else{
          return {destino:'Fijos_Provincia__Ipbusiness',minutes};
        }

          
          
              
             
     
         default:
          return p;
     }


   })
   const pruebaDato3=[{destino: "Fijos_Lima_Ipbusiness", minutes:''},{destino: "Fijos_Provincia__Ipbusiness", minutes: ''},{destino: "Moviles__Ipbusiness", minutes: ''},{destino: "Rural__Ipbusiness", minutes: ''},{destino: "Internacional__Ipbusiness", minutes: ''}]
   const arregloModificado3=modificacionRows3.concat(pruebaDato3)
   let  ipbusinessRows=  arregloModificado3.reduce((groups, item)=>{
    var val = item['destino'];
    groups[val] = groups[val] || {destino: item.destino, minutes:0,empresa:'Ipbusiness'};
    groups[val].minutes += item.minutes;

    return groups;
}, {});


let resultData3 = Object.values( ipbusinessRows);



console.log(resultData3);


//HINDUTELECOM

const [state4, setState4] = useState({
  cols4: [],
  rows4: [],
  errorMessage1: null,
  
});


const {rows4} = state4



const checkFile4=(file)=> {
  let errorMessage = "";
  if (!file || !file[0]) {
    return;
  }


  const isExcel =
    file[0].type === "application/vnd.ms-excel" ||
    file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    errorMessage = "You can only upload Excel file!";
  }
  console.log("file", file[0].type);
  const isLt2M = file[0].size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errorMessage = "File must be smaller than 2MB!";
  }
  console.log("errorMessage", errorMessage);
  return errorMessage;
}



const fileHandler3 = (fileList) => {
  console.log("fileList", fileList);
  let fileObj = fileList;
  if (!fileObj) {
   setState4({
      errorMessage: "No file uploaded!"
    });
    return false;
  }
  console.log("fileObj.type:", fileObj.type);

  const nametexto=fileObj.name;
  const recorte=nametexto.split("_");
const reporte=recorte[0];


console.log(reporte);




  if (
    !(
      fileObj.type === "application/vnd.ms-excel" ||
      fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
  ) {
    setState4({
      errorMessage: "Unknown file format. Only Excel files are uploaded!"
    });
    return false;
  }
  //just pass the fileObj as parameter
  ExcelRenderer(fileObj, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      let newRows = [];
      
      resp.rows.slice(1).map((row, index) => {
        if (row && row !== "undefined") {
          newRows.push({
              id:uuid_v4(),
              columna0:reporte,
              columna1:row[0],
            columna2: row[1],
            columna3: row[2],
            columna4: row[3],
            columna5:row[4],
            columna6:row[5],
              columna7:row[6],
              columna8:row[7],
              columna9:row[8],
              columna10:row[9],
              columna11:row[10],
              columna12:row[11],
              columna13:row[12],

          });
        }
      });
      if (newRows.length === 0) {
       setState4({
          errorMessage: "No data found in file!"
        });
        return false;
      } else {
      setState4({
          cols4: resp.cols1,
          rows4: newRows,
          errorMessage1: null
        });
      }
    }
  });
  return false;
};

const modificacionRows4=rows4.map((p)=>{

     let destino,minutes,arreglo; 
    


     switch (p.columna0) {
     
      case 'Hindutelecom':
        destino=p.columna1;
        minutes=p.columna3;
        arreglo={destino,minutes}  
    
        if(destino.indexOf('Lima')>-1){
          return {destino:'Fijos_Lima_Hindutelecom',minutes};
        }else if(destino.indexOf('Mobile')>-1){
          return {destino:'Moviles_Hindutelecom',minutes};
        }else if(destino.indexOf('Movil')>-1){
          return {destino:'Moviles_Hindutelecom',minutes};
        }else if(destino.indexOf('Rural')>-1){
          return {destino:'Rural_Hindutelecom',minutes};
        }else{
          return {destino:'Fijos_Provincia_Hindutelecom',minutes};
        }

          
          
              
             
     
         default:
          return p;
     }


   })
   const pruebaDato4=[{destino: "Fijos_Lima_Hindutelecom", minutes:''},{destino: "Fijos_Provincia_Hindutelecom", minutes: ''},{destino: "Moviles_Hindutelecom", minutes: ''},{destino: "Rural_Hindutelecom", minutes: ''},{destino: "Internacional_Hindutelecom", minutes: ''}]
   const arregloModificado4=modificacionRows4.concat(pruebaDato4)
   let  hindutelecomRows=  arregloModificado4.reduce((groups, item)=>{
    var val = item['destino'];
    groups[val] = groups[val] || {destino: item.destino, minutes: 0,empresa:'Hindutelecom'};
    groups[val].minutes += item.minutes;

    return groups;
}, {});


let resultData4 = Object.values( hindutelecomRows);



console.log(resultData4);






//Perucalls
const [state5, setState5] = useState({
  cols5: [],
  rows5: [],
  errorMessage1: null,
  
});


const {rows5} = state5



const checkFile5=(file)=> {
  let errorMessage = "";
  if (!file || !file[0]) {
    return;
  }


  const isExcel =
    file[0].type === "application/vnd.ms-excel" ||
    file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    errorMessage = "You can only upload Excel file!";
  }
  console.log("file", file[0].type);
  const isLt2M = file[0].size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errorMessage = "File must be smaller than 2MB!";
  }
  console.log("errorMessage", errorMessage);
  return errorMessage;
}



const fileHandler4 = (fileList) => {
  console.log("fileList", fileList);
  let fileObj = fileList;
  if (!fileObj) {
   setState5({
      errorMessage: "No file uploaded!"
    });
    return false;
  }
  console.log("fileObj.type:", fileObj.type);

  const nametexto=fileObj.name;
  const recorte=nametexto.split("_");
const reporte=recorte[0];


console.log(reporte);




  if (
    !(
      fileObj.type === "application/vnd.ms-excel" ||
      fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
  ) {
    setState5({
      errorMessage: "Unknown file format. Only Excel files are uploaded!"
    });
    return false;
  }
  //just pass the fileObj as parameter
  ExcelRenderer(fileObj, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      let newRows = [];
      
      resp.rows.slice(1).map((row, index) => {
        if (row && row !== "undefined") {
          newRows.push({
              id:uuid_v4(),
              columna0:reporte,
              columna1:row[0],
            columna2: row[1],
            columna3: row[2],
            columna4: row[3],
            columna5:row[4],
            columna6:row[5],
              columna7:row[6],
              columna8:row[7],
              columna9:row[8],
              columna10:row[9],
              columna11:row[10],
              columna12:row[11],
              columna13:row[12],

          });
        }
      });
      if (newRows.length === 0) {
       setState5({
          errorMessage: "No data found in file!"
        });
        return false;
      } else {
      setState5({
          cols5: resp.cols1,
          rows5: newRows,
          errorMessage1: null
        });
      }
    }
  });
  return false;
};

const modificacionRows5=rows5.map((p)=>{

     let destino,minutes,arreglo; 
    


     switch (p.columna0) {
    
      case 'Convergia':
        case 'Perucalls':
                  
          destino=p.columna1;
          minutes=(p.columna2)/60;

          arreglo={destino,minutes}

        
          if(destino.indexOf('Lima')>-1){
            return {destino:'Fijos_Lima_Perucalls',minutes};
          }else if(destino.indexOf('Movil')>-1){
            return {destino:'Moviles_Perucalls',minutes};
          }else if(destino.indexOf('Rural')>-1){
            return {destino:'Rural_Perucalls',minutes};
          }else{
            return {destino:'Fijos_Provincia_Perucalls',minutes};
          }

          
              
             
     
         default:
          return p;
     }


   })
   const pruebaDato5=[{destino: "Fijos_Lima_Perucalls", minutes:''},{destino: "Fijos_Provincia_Perucalls", minutes: ''},{destino: "Moviles_Perucalls", minutes: ''},{destino: "Rural_Perucalls", minutes: ''},{destino: "Internacional_Perucalls", minutes: ''}]
   const arregloModificado5=modificacionRows5.concat(pruebaDato5)
   let  perucallsRows=  arregloModificado5.reduce((groups, item)=>{
    let val = item['destino'];
    groups[val] = groups[val] || {destino: item.destino, minutes: 0,empresa:'Perucalls'};
    groups[val].minutes += item.minutes;

    return groups;
}, {});


let resultData5 = Object.values( perucallsRows);



console.log(resultData5);















































const pruebaFinal=[];
//resultData2=Magnavoz,filtrado
//resultData1=Convergia,filtrado
const pruebaAprendizaje=[...pruebaFinal,resultData2,resultData1,resultData3,resultData4,resultData5];


resultData2=[].concat(resultData2,resultData1,resultData3,resultData4,resultData5);


const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const consulta=convertArrayToObject(resultData2,'destino');

const {
  Moviles_Magnavoz,
  Fijos_Lima_Magnavoz,
  Fijos_Provincia_Magnavoz,
  Rural_Magnavoz,
  Internacional_Magnavoz,
  Fijos_Lima_Convergia,
  Moviles_Convergia,
  Rural_Convergia,
  Internacional_Convergia,
  Fijos_Provincia_Convergia,
  Fijos_Lima_Ipbusiness,
  Moviles__Ipbusiness,
  Rural__Ipbusiness,
  Fijos_Provincia__Ipbusiness,
  Internacional__Ipbusiness,
  Fijos_Lima_Hindutelecom,
  Moviles_Hindutelecom,
  Rural_Hindutelecom,
  Fijos_Provincia_Hindutelecom,
  Internacional_Hindutelecom,
  Fijos_Lima_Perucalls,
  Moviles_Perucalls,
  Rural_Perucalls,
  Fijos_Provincia_Perucalls,
  Internacional_Perucalls,
}=consulta;


console.log(consulta);

console.log(Moviles_Magnavoz.minutes);
console.log(typeof(Moviles_Magnavoz.minutes));

const magnaMinutos=Moviles_Magnavoz.minutes
console.log(magnaMinutos);

const mesCdr=Moviles_Magnavoz.mes

//COSTOS CONVERGIA
const costoUnit_Fijo_Lima_Convergia=0.0037996;
const costoUnit_Provincia_Convergia=0.006343;
const costoUnit_Rural_Convergia=0.006343;
/* const costoUnit_Movil_Convergia=0.0085; *///esto en mayo fue 0.087
//COSTOS Magnavoz
const costoUnit_Fijo_Lima_Magnavoz=0.012;
const costoUnit_Provincia_Magnavoz=0.017;
const costoUnit_Rural_Magnavoz=0.017;
/* const costoUnit_Movil_Magnavoz=0.042;//hasta febrero fue 0.042, en marzo 0.035, de ahí abril para adelante 0.032
 */
//Costos Ipbusiness

const costoUnit_Fijo_Lima_Ipbusiness=0.015;
const costoUnit_Provincia_Ipbusiness=0.026;
const costoUnit_Rural_Ipbusiness=0.026;
/* const costoUnit_Movil_Ipbusiness=0.038; */
//Costos Hindutelecom

const costoUnit_Fijo_Lima_Hindutelecom=0.013;
const costoUnit_Provincia_Hindutelecom=0.016;
const costoUnit_Rural_Hindutelecom=0.016;
/* const costoUnit_Movil_Hindutelecom=0.035;//hasta marzo 0.035, abril para adelante 0.030 */


//Costos Perucalls

const costoUnit_Fijo_Lima_Perucalls=0.013;
const costoUnit_Provincia_Perucalls=0.023;
const costoUnit_Rural_Perucalls=0.023;
/* const costoUnit_Movil_Perucalls=0.034; //0.034 hasta marzo, 0.030 de abril  */



const  valores = {
  id:uuid_v4(),
  Moviles_Magnavoz1:parseFloat(magnaMinutos).toFixed(2),
        Fijos_Lima_Magnavoz1:parseFloat(Fijos_Lima_Magnavoz.minutes).toFixed(2),
        Fijos_Provincia_Magnavoz1:parseFloat(Fijos_Provincia_Magnavoz.minutes).toFixed(2),
        Rural_Magnavoz1:parseFloat(Rural_Magnavoz.minutes).toFixed(2),
        Internacional_Magnavoz1:parseFloat(Internacional_Magnavoz.minutes).toFixed(2),
        Fijos_Lima_Convergia1:parseFloat(Fijos_Lima_Convergia.minutes).toFixed(2),
        Moviles_Convergia1:parseFloat(Moviles_Convergia.minutes).toFixed(2),
        Rural_Convergia1:parseFloat(Rural_Convergia.minutes).toFixed(2),
        Internacional_Convergia1:parseFloat(Internacional_Convergia.minutes).toFixed(2),
        Fijos_Provincia_Convergia1:parseFloat(Fijos_Provincia_Convergia.minutes).toFixed(2),
        Fijos_Lima_Ipbusiness1:parseFloat(Fijos_Lima_Ipbusiness.minutes).toFixed(2),
        Moviles__Ipbusiness1:parseFloat(Moviles__Ipbusiness.minutes).toFixed(2),
        Rural__Ipbusiness1:parseFloat(Rural__Ipbusiness.minutes).toFixed(2),
        Fijos_Provincia__Ipbusiness1:parseFloat(Fijos_Provincia__Ipbusiness.minutes).toFixed(2),
        Internacional__Ipbusiness1:parseFloat(Internacional__Ipbusiness.minutes).toFixed(2),
        Fijos_Lima_Hindutelecom1: parseFloat(Fijos_Lima_Hindutelecom.minutes).toFixed(2),
        Moviles_Hindutelecom1:parseFloat(Moviles_Hindutelecom.minutes).toFixed(2),
        Rural_Hindutelecom1:parseFloat(Rural_Hindutelecom.minutes).toFixed(2),
        Fijos_Provincia_Hindutelecom1:parseFloat(Fijos_Provincia_Hindutelecom.minutes).toFixed(2),
        Internacional_Hindutelecom1:parseFloat(Internacional_Hindutelecom.minutes).toFixed(2),
        Fijos_Lima_Perucalls1:parseFloat(Fijos_Lima_Perucalls.minutes).toFixed(2),
        Moviles_Perucalls1:parseFloat(Moviles_Perucalls.minutes).toFixed(2),
        Rural_Perucalls1:parseFloat(Rural_Perucalls.minutes).toFixed(2),
        Fijos_Provincia_Perucalls1:parseFloat(Fijos_Provincia_Perucalls.minutes).toFixed(2),
        Internacional_Perucalls1:parseFloat(Internacional_Perucalls.minutes).toFixed(2),
       
        mes:mesCdr,
        edit:false,

}



const {
  Moviles_Magnavoz1,
  Fijos_Lima_Magnavoz1,
  Fijos_Provincia_Magnavoz1,
  Rural_Magnavoz1,
  Internacional_Magnavoz1,
  Fijos_Lima_Convergia1,
  Moviles_Convergia1,
  Rural_Convergia1,
  Internacional_Convergia1,
  Fijos_Provincia_Convergia1,
  Fijos_Lima_Ipbusiness1,
  Moviles__Ipbusiness1,
  Rural__Ipbusiness1,
  Fijos_Provincia__Ipbusiness1,
  Internacional__Ipbusiness1,
  Fijos_Lima_Hindutelecom1,
  Moviles_Hindutelecom1,
  Rural_Hindutelecom1,
  Fijos_Provincia_Hindutelecom1,
  Internacional_Hindutelecom1,
  Fijos_Lima_Perucalls1,
  Moviles_Perucalls1,
  Rural_Perucalls1,
  Fijos_Provincia_Perucalls1,
  Internacional_Perucalls1,
 
  mes,
  edit,
}=valores;


/* console.log(valores); */
 
const  [values, handleInputChange, reset] = useForm({
  id:uuid_v4(),
  costoUnit_Movil_Convergia:'',
  costoUnit_Movil_Magnavoz:'',
  costoUnit_Movil_Ipbusiness:'',
  costoUnit_Movil_Hindutelecom:'',
  costoUnit_Movil_Perucalls:'',
})
     


const {costoUnit_Movil_Convergia,costoUnit_Movil_Magnavoz,costoUnit_Movil_Ipbusiness,costoUnit_Movil_Hindutelecom,costoUnit_Movil_Perucalls}=values;

const [cdrs, dispatch] = useReducer(ExcelReducer, [], init)



  useEffect(() => {
    localStorage.setItem('cdrs', JSON.stringify(cdrs))
}, [cdrs])




const handleSubmit=(e)=>{
  
 e.preventDefault();
    const newCdr={
        id:uuid_v4(),
        Moviles_Magnavoz1,
        Fijos_Lima_Magnavoz1,
        Fijos_Provincia_Magnavoz1,
        Rural_Magnavoz1,
        Internacional_Magnavoz1,
        Fijos_Lima_Convergia1,
        Moviles_Convergia1,
        Rural_Convergia1,
        Internacional_Convergia1,
        Fijos_Provincia_Convergia1,
        Fijos_Lima_Ipbusiness1,
        Moviles__Ipbusiness1,
        Rural__Ipbusiness1,
        Fijos_Provincia__Ipbusiness1,
        Internacional__Ipbusiness1,
        Fijos_Lima_Hindutelecom1,
        Moviles_Hindutelecom1,
        Rural_Hindutelecom1,
        Fijos_Provincia_Hindutelecom1,
        Internacional_Hindutelecom1,
        Fijos_Lima_Perucalls1,
        Moviles_Perucalls1,
        Rural_Perucalls1,
        Fijos_Provincia_Perucalls1,
        Internacional_Perucalls1,
        costoUnit_Movil_Convergia,
        costoUnit_Movil_Magnavoz,
        costoUnit_Movil_Ipbusiness,
        costoUnit_Movil_Hindutelecom,
        costoUnit_Movil_Perucalls,
        mes,
        edit,
    }


console.log(newCdr);

/* if(month < 10){
  console.log(`${day}-0${month}-${year}`)
}else{
  console.log(`${day}-${month}-${year}`)
} */


const action={
    type:'add',
    payload:newCdr,
}

dispatch(action);

reset();


}


const handleDelete=(id)=>{
    dispatch({
        type:'delete',
        payload:id,
    })
}
















    return (
        <div>
            <div className="excel row">
        <div className="col-6">
        <h1>Excel CDR</h1>
        </div>
        <div className="col-4">
            <ReactHTMLTableToExcel 
                id="botonExportarExcel"
                className="btn btn-outline-success btn-block"
                table="tablaInventario"
                filename="Gasto_Telefonía"
                sheet="Resumen"
                buttonText="Descargar Excel"

                
            />
           </div>
          
        
        </div>
            <hr/>
            <div className="row movimiento">
            <div className="col-2 movimientoProveedor">
            <h2>Convergia</h2>
          <Upload
            name="file"
            beforeUpload={fileHandler1}
            onRemove={() => setState1({ rows1: [] })}
            multiple={false}
            
          >
            <Button>
              <Icon type="upload"/> Abrir Archivo
            </Button>
          </Upload>
        </div>
        <div className="col-2 movimientoProveedor">
        <h2>Magnavoz</h2>
          <Upload
            name="file"
            beforeUpload={fileHandler}
            onRemove={() => setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Abrir Archivo
            </Button>
          </Upload>
        </div>
        <div className="col-2 movimientoProveedor">
        <h2>Ipbusiness</h2>
          <Upload
            name="file"
            beforeUpload={fileHandler2}
            onRemove={() => setState3({ rows3: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Abrir Archivo
            </Button>
          </Upload>
        </div>
        <div className="col-2 movimientoProveedor">
        <h2>Hindutelecom</h2>
          <Upload
            name="file"
            beforeUpload={fileHandler3}
            onRemove={() => setState4({ rows4: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Abrir Archivo
            </Button>
          </Upload>
        </div>
        <div className="col-2 movimientoProveedor">
        <h2>Perucalls</h2>
          <Upload
            name="file"
            beforeUpload={fileHandler4}
            onRemove={() => setState5({ rows5: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Abrir Archivo
            </Button>
          </Upload>
        </div>


            </div>
            <form onSubmit={handleSubmit}>
        <div className="row movimiento1">
        <div className="col-2 movimiento2">
  
      <label htmlFor="costoUnit_Movil_Convergia">Costo Unitario Móviles Convergia</label>
<select 
id="tipo" 
className="form-control"
name="costoUnit_Movil_Convergia"
value={ costoUnit_Movil_Convergia } 
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option >0.0085</option>
<option>0.087</option>
</select>
   

        </div>
       
        <div className="col-2 movimiento2">
  
      <label htmlFor="costoUnit_Movil_Magnavoz">Costo Unitario Móvil Magnavoz</label>
<select 
id="tipo" 
className="form-control"
name="costoUnit_Movil_Magnavoz"
value={costoUnit_Movil_Magnavoz} 
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option >0.042</option>
<option>0.035</option>
<option>0.032</option>
<option>0.030</option>
<option>0.028</option>
</select>
   

        </div>
        <div className="col-2 movimiento2">
  
      <label htmlFor="costoUnit_Movil_Ipbusiness">Costo Unitario Móvil Ipbusiness</label>
<select 
id="tipo" 
className="form-control"
name="costoUnit_Movil_Ipbusiness"
value={ costoUnit_Movil_Ipbusiness } 
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>0.038</option>
</select>
   

        </div>
        <div className="col-2 movimiento2">
  
      <label htmlFor="costoUnit_Movil_Hindutelecom">Costo Unitario Móvil Hindutelecom</label>
<select 
id="tipo" 
className="form-control"
name="costoUnit_Movil_Hindutelecom"
value={ costoUnit_Movil_Hindutelecom } 
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>0.035</option>
<option>0.030</option>
<option>0.027</option>
</select>
   

        </div>
        <div className="col-2 movimiento2">
  
  <label htmlFor="costoUnit_Movil_Perucalls">Costo Unitario Móvil Perucalls</label>
<select 
id="tipo" 
className="form-control"
name="costoUnit_Movil_Perucalls"
value={ costoUnit_Movil_Perucalls } 
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>0.034</option>
<option>0.030</option>
<option>0.027</option>
</select>


    </div>


        </div>
           <div className="row movimiento3 mt-4 mb-2">
        <div className="col-12">
            <button 

            type="submit"
            className="btn btn-success btn-block">
                Calcular
            </button>
        </div>
        </div>
        </form>

            <div className="row ">
            <div className="col-11 ml-5 mt-3">
            <table 
className="table table-bordered table-responsive-md text-center cdr"
id="tablaInventario"
>

<thead>
    <tr className="encabezadoPrincipal">
    <th 
      colSpan="2"
      scope="col">Datos</th>
      <th 
      colSpan="2"
      scope="col">Convergia</th>
      <th 
      colSpan="2"
      scope="col">Ipbusiness</th>
      <th 
      colSpan="2"
      scope="col">Magnavoz</th>
      <th 
      colSpan="2"
      scope="col">Hindutelecom</th>
      <th 
      colSpan="2"
      scope="col">PeruCalls</th>
      <th 
      colSpan="5"
      scope="col">Costos Unitarios</th>
      
    </tr>
  </thead>
  <tbody>


    <tr className="encabezadoSecundario">
    <th scope="col">Mes</th>
    <th scope="col">Categorías</th>
    <th scope="col">Minutos</th>
    <th scope="col">Costo $</th>
    <th scope="col">Minutos</th>
    <th scope="col">Costo S/.</th>
    <th scope="col">Minutos</th>
    <th scope="col">Costo S/.</th>
    <th scope="col">Minutos</th>
    <th scope="col">Costo S/.</th>
    <th scope="col">Minutos</th>
    <th scope="col">Costo S/.</th>
    <th scope="col">Convergia (Dólares)</th>
    <th scope="col">Ipbusiness</th>
    <th scope="col">Magnavoz</th>
    <th scope="col">Hindutelecom</th>
    <th scope="col">PeruCalls</th>
    <th scope="col">Minutos Mensual</th>
    <th scope="col">Costo Mensual</th>
   <th scope="col">Acción</th>


   

</tr>
</tbody>
{
  cdrs.map((data,i)=>(

    <tbody key={data.id}>

    <tr>
    <th 
    rowSpan="6"
    tyle="text-align:center;"
   
    className="alinearTexto encabezadoPrincipal"
    scope="col"> {`${data.mes} ${new Date().getFullYear()}`}</th>
    
    <th scope="col" className="tituloSombreado">Fijos Lima</th>
        <td>{data.Fijos_Lima_Convergia1}</td>
        <td>${(data.Fijos_Lima_Convergia1*costoUnit_Fijo_Lima_Convergia).toFixed(2)}</td>
        <td>{data.Fijos_Lima_Ipbusiness1}</td>
        <td>S/.{(data.Fijos_Lima_Ipbusiness1*costoUnit_Fijo_Lima_Ipbusiness).toFixed(2)}</td>
        <td>{data.Fijos_Lima_Magnavoz1}</td>
        <td>S/.{(data.Fijos_Lima_Magnavoz1*costoUnit_Fijo_Lima_Magnavoz).toFixed(2)}</td>
        <td>{data.Fijos_Lima_Hindutelecom1}</td>
        <td>S/.{(data.Fijos_Lima_Hindutelecom1*costoUnit_Fijo_Lima_Hindutelecom).toFixed(2)}</td>
        <td>{data.Fijos_Lima_Perucalls1}</td>
        <td>S/.{(data.Fijos_Lima_Perucalls1*costoUnit_Fijo_Lima_Perucalls).toFixed(2)}</td>
        <td>${costoUnit_Fijo_Lima_Convergia.toFixed(3)}</td>
        <td>S/.{costoUnit_Fijo_Lima_Ipbusiness}</td>
        <td>S/.{costoUnit_Fijo_Lima_Magnavoz}</td>
        <td>S/.{costoUnit_Fijo_Lima_Hindutelecom}</td>
        <td>S/.{costoUnit_Fijo_Lima_Perucalls}</td>
        <td>{(parseFloat(data.Fijos_Lima_Convergia1) +parseFloat(data.Fijos_Lima_Ipbusiness1)+parseFloat(data.Fijos_Lima_Magnavoz1)+parseFloat(data.Fijos_Lima_Hindutelecom1) +parseFloat(data.Fijos_Lima_Perucalls1)).toFixed(2)}</td>
        <td>{(parseFloat((data.Fijos_Lima_Convergia1*costoUnit_Fijo_Lima_Convergia).toFixed(2)) +parseFloat((data.Fijos_Lima_Ipbusiness1*costoUnit_Fijo_Lima_Ipbusiness).toFixed(2))+parseFloat((data.Fijos_Lima_Magnavoz1*costoUnit_Fijo_Lima_Magnavoz).toFixed(2))+parseFloat((data.Fijos_Lima_Hindutelecom1*costoUnit_Fijo_Lima_Hindutelecom).toFixed(2)) +parseFloat((data.Fijos_Lima_Perucalls1*costoUnit_Fijo_Lima_Perucalls).toFixed(2))).toFixed(2)}</td>
<th 
    rowSpan="6"
    tyle="text-align:center;"
   
    className="alinearTexto sombreadoBorrar"
    scope="col"><button 
className="btn btn-danger ml-1 mr-1"
onClick={ ()=>handleDelete(data.id) }
> Borrar </button></th>


   

</tr>
    
<tr>   <th scope="col" className="tituloSombreado">Fijos Provincia
</th>
 
  <td>{data.Fijos_Provincia_Convergia1}</td>
        <td>${(data.Fijos_Provincia_Convergia1*costoUnit_Provincia_Convergia).toFixed(2)}</td>
        <td>{data.Fijos_Provincia__Ipbusiness1}</td>
        <td>S/.{(data.Fijos_Provincia__Ipbusiness1*costoUnit_Provincia_Ipbusiness).toFixed(2)}</td>
        <td>{data.Fijos_Provincia_Magnavoz1}</td>
        <td>S/.{(data.Fijos_Provincia_Magnavoz1*costoUnit_Provincia_Magnavoz).toFixed(2)}</td>
        <td>{data.Fijos_Provincia_Hindutelecom1}</td>
        <td>S/.{(data.Fijos_Provincia_Hindutelecom1*costoUnit_Provincia_Hindutelecom).toFixed(2)}</td>
        <td>{data.Fijos_Provincia_Perucalls1}</td>
        <td>S/.{(data.Fijos_Provincia_Perucalls1*costoUnit_Provincia_Perucalls).toFixed(2)}</td>
        <td>${costoUnit_Provincia_Convergia.toFixed(3)}</td>
        <td>S/.{costoUnit_Provincia_Ipbusiness}</td>
        <td>S/.{costoUnit_Provincia_Magnavoz}</td>
        <td>S/.{costoUnit_Provincia_Hindutelecom}</td>
        <td>S/.{costoUnit_Provincia_Perucalls}</td>
        <td>{(parseFloat(data.Fijos_Provincia_Convergia1) +parseFloat(data.Fijos_Provincia__Ipbusiness1)+parseFloat(data.Fijos_Provincia_Magnavoz1)+parseFloat(data.Fijos_Provincia_Hindutelecom1) +parseFloat(data.Fijos_Provincia_Perucalls1)).toFixed(2)}</td>
        <td>{(parseFloat((data.Fijos_Provincia_Convergia1*costoUnit_Provincia_Convergia).toFixed(2)) +parseFloat((data.Fijos_Provincia__Ipbusiness1*costoUnit_Provincia_Ipbusiness).toFixed(2))+parseFloat((data.Fijos_Provincia_Magnavoz1*costoUnit_Provincia_Magnavoz).toFixed(2))+parseFloat((data.Fijos_Provincia_Hindutelecom1*costoUnit_Provincia_Hindutelecom).toFixed(2)) +parseFloat((data.Fijos_Provincia_Perucalls1*costoUnit_Provincia_Perucalls).toFixed(2))).toFixed(2)}</td>
</tr>

<tr>   <th scope="col" className="tituloSombreado">Móviles
</th>
   <td>{data.Moviles_Convergia1}</td>
        <td>${(data.Moviles_Convergia1*data.costoUnit_Movil_Convergia).toFixed(2)}</td>
        <td>{data.Moviles__Ipbusiness1}</td>
        <td>S/.{(data.Moviles__Ipbusiness1*data.costoUnit_Movil_Ipbusiness).toFixed(2)}</td>
        <td>{data.Moviles_Magnavoz1}</td>
        <td>S/.{(data.Moviles_Magnavoz1*data.costoUnit_Movil_Magnavoz).toFixed(2)}</td>
        <td>{data.Moviles_Hindutelecom1}</td>
        <td>S/.{(data.Moviles_Hindutelecom1*data.costoUnit_Movil_Hindutelecom).toFixed(2)}</td>
        <td>{data.Moviles_Perucalls1}</td>
        <td>S/.{(data.Moviles_Perucalls1*data.costoUnit_Movil_Perucalls).toFixed(2)}</td>
        <td>${data.costoUnit_Movil_Convergia}</td>
        <td>S/.{data.costoUnit_Movil_Ipbusiness}</td>
        <td>S/.{data.costoUnit_Movil_Magnavoz}</td>
        <td>S/.{data.costoUnit_Movil_Hindutelecom}</td>
        <td>S/.{data.costoUnit_Movil_Perucalls }</td>
        <td>{(parseFloat(data.Moviles_Convergia1) +parseFloat(data.Moviles__Ipbusiness1)+parseFloat(data.Moviles_Magnavoz1)+parseFloat(data.Moviles_Hindutelecom1) +parseFloat(data.Moviles_Perucalls1)).toFixed(2)}</td>
        <td>{(parseFloat((data.Moviles_Convergia1*data.costoUnit_Movil_Convergia).toFixed(2)) +parseFloat((data.Moviles__Ipbusiness1*data.costoUnit_Movil_Ipbusiness).toFixed(2))+parseFloat((data.Moviles_Magnavoz1*data.costoUnit_Movil_Magnavoz).toFixed(2))+parseFloat((data.Moviles_Hindutelecom1*data.costoUnit_Movil_Hindutelecom).toFixed(2)) +parseFloat((data.Moviles_Perucalls1*data.costoUnit_Movil_Perucalls).toFixed(2))).toFixed(2)}</td>
</tr>

<tr>   <th scope="col" className="tituloSombreado">Internacionales
</th>
  <td>{data.Internacional_Convergia1}</td>
        <td>---</td>
        <td>{data.Internacional__Ipbusiness1}</td>
        <td>---</td>
        <td>{data.Internacional_Magnavoz1}</td>
        <td>---</td>
        <td>{data.Internacional_Hindutelecom1}</td>
        <td>---</td>
        <td>{data.Internacional_Perucalls1}</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>{parseFloat(data.Internacional_Convergia1) +parseFloat(data.Internacional__Ipbusiness1)+parseFloat(data.Internacional_Magnavoz1)+parseFloat(data.Internacional_Hindutelecom1) +parseFloat(data.Internacional_Perucalls1)}</td>
        <td>---</td>
</tr>

<tr>   <th scope="col" className="tituloSombreado">Rural
</th>
  <td>{data.Rural_Convergia1}</td>
        <td>${(data.Rural_Convergia1*costoUnit_Rural_Convergia).toFixed(2)}</td>
        <td>{data.Rural__Ipbusiness1}</td>
        <td>S/.{(data.Rural__Ipbusiness1*costoUnit_Rural_Ipbusiness).toFixed(2)}</td>
        <td>{data.Rural_Magnavoz1}</td>
        <td>S/.{(data.Rural_Magnavoz1*costoUnit_Rural_Magnavoz).toFixed(2)}</td>
        <td>{data.Rural_Hindutelecom1}</td>
        <td>S/.{(data.Rural_Hindutelecom1*costoUnit_Rural_Hindutelecom).toFixed(2)}</td>
        <td>{data.Rural_Perucalls1}</td>
        <td>S/.{(data.Rural_Perucalls1*costoUnit_Rural_Perucalls).toFixed(2)}</td>
        <td>${costoUnit_Rural_Convergia.toFixed(3)}</td>
        <td>S/.{costoUnit_Rural_Ipbusiness}</td>
        <td>S/.{costoUnit_Rural_Magnavoz}</td>
        <td>S/.{costoUnit_Rural_Hindutelecom}</td>
        <td>S/.{costoUnit_Rural_Perucalls}</td>
        <td>{parseFloat(data.Rural_Convergia1) +parseFloat(data.Rural__Ipbusiness1)+parseFloat(data.Rural_Magnavoz1)+parseFloat(data.Rural_Hindutelecom1) +parseFloat(data.Rural_Perucalls1)}</td>
        <td>{(parseFloat((data.Rural_Convergia1*costoUnit_Rural_Convergia).toFixed(2)) +parseFloat((data.Rural__Ipbusiness1*costoUnit_Rural_Ipbusiness).toFixed(2))+parseFloat((data.Rural_Magnavoz1*costoUnit_Rural_Magnavoz).toFixed(2))+parseFloat((data.Rural_Hindutelecom1*costoUnit_Rural_Hindutelecom).toFixed(2)) +parseFloat((data.Rural_Perucalls1*costoUnit_Rural_Perucalls).toFixed(2))).toFixed(2)}</td>
</tr>

<tr className="sombreadoFila">   <th className="sombreadoCelda"
scope="col">Total
</th>
  <td>{parseFloat(data.Fijos_Lima_Convergia1) +parseFloat(data.Fijos_Provincia_Convergia1)+parseFloat(data.Moviles_Convergia1)+parseFloat(data.Internacional_Convergia1) +parseFloat(data.Rural_Convergia1)}</td>
        <td>${parseFloat((data.Fijos_Lima_Convergia1*costoUnit_Fijo_Lima_Convergia).toFixed(2))+parseFloat((data.Fijos_Provincia_Convergia1*costoUnit_Provincia_Convergia).toFixed(2))+parseFloat((data.Moviles_Convergia1*data.costoUnit_Movil_Convergia).toFixed(2))+parseFloat((data.Rural_Convergia1*costoUnit_Rural_Convergia).toFixed(2))}</td>
        <td>{parseFloat(data.Fijos_Lima_Ipbusiness1) +parseFloat(data.Fijos_Provincia__Ipbusiness1)+parseFloat(data.Moviles__Ipbusiness1)+parseFloat(data.Internacional__Ipbusiness1) +parseFloat(data.Rural__Ipbusiness1)}</td>
        <td>S/.{(parseFloat((data.Fijos_Lima_Ipbusiness1*costoUnit_Fijo_Lima_Ipbusiness).toFixed(2))+parseFloat((data.Fijos_Provincia__Ipbusiness1*costoUnit_Provincia_Ipbusiness).toFixed(2))+parseFloat((data.Moviles__Ipbusiness1*data.costoUnit_Movil_Ipbusiness).toFixed(2))+parseFloat((data.Rural__Ipbusiness1*costoUnit_Rural_Ipbusiness).toFixed(2))).toFixed(2)}</td>
        <td>{(parseFloat(data.Fijos_Lima_Magnavoz1) +parseFloat(data.Fijos_Provincia_Magnavoz1)+parseFloat(data.Moviles_Magnavoz1)+parseFloat(data.Internacional_Magnavoz1) +parseFloat(data.Rural_Magnavoz1)).toFixed(2)}</td>
        <td>S/.{(parseFloat((data.Fijos_Lima_Magnavoz1*costoUnit_Fijo_Lima_Magnavoz).toFixed(2))+parseFloat((data.Fijos_Provincia_Magnavoz1*costoUnit_Provincia_Magnavoz).toFixed(2))+parseFloat((data.Moviles_Magnavoz1*data.costoUnit_Movil_Magnavoz).toFixed(2))+parseFloat((data.Rural_Magnavoz1*costoUnit_Rural_Magnavoz).toFixed(2))).toFixed(2)}</td>
        <td>{parseFloat(data.Fijos_Lima_Hindutelecom1) +parseFloat(data.Fijos_Provincia_Hindutelecom1)+parseFloat(data.Moviles_Hindutelecom1)+parseFloat(data.Internacional_Hindutelecom1) +parseFloat(data.Rural_Hindutelecom1)}</td>
        <td>S/.{parseFloat((data.Fijos_Lima_Hindutelecom1*costoUnit_Fijo_Lima_Hindutelecom).toFixed(2))+parseFloat((data.Fijos_Provincia_Hindutelecom1*costoUnit_Provincia_Hindutelecom).toFixed(2))+parseFloat((data.Moviles_Hindutelecom1*data.costoUnit_Movil_Hindutelecom).toFixed(2))+parseFloat((data.Rural_Magnavoz1*costoUnit_Rural_Magnavoz).toFixed(2))}</td>
        <td>{parseFloat(data.Fijos_Lima_Perucalls1) +parseFloat(data.Fijos_Provincia_Perucalls1)+parseFloat(data.Moviles_Perucalls1)+parseFloat(data.Internacional_Perucalls1) +parseFloat(data.Rural_Perucalls1)}</td>
        <td>S/.{parseFloat((data.Fijos_Lima_Perucalls1*costoUnit_Fijo_Lima_Perucalls).toFixed(2))+parseFloat((data.Fijos_Provincia_Perucalls1*costoUnit_Provincia_Perucalls).toFixed(2))+parseFloat((data.Moviles_Perucalls1*data.costoUnit_Movil_Perucalls).toFixed(2))+parseFloat((data.Rural_Perucalls1*costoUnit_Rural_Perucalls).toFixed(2))}</td>
        <td colSpan="5"></td>
        
        <td>{((parseFloat(data.Fijos_Lima_Convergia1) +parseFloat(data.Fijos_Provincia_Convergia1)+parseFloat(data.Moviles_Convergia1)+parseFloat(data.Internacional_Convergia1) +parseFloat(data.Rural_Convergia1))+(parseFloat(data.Fijos_Lima_Ipbusiness1) +parseFloat(data.Fijos_Provincia__Ipbusiness1)+parseFloat(data.Moviles__Ipbusiness1)+parseFloat(data.Internacional__Ipbusiness1) +parseFloat(data.Rural__Ipbusiness1))+(parseFloat(data.Fijos_Lima_Magnavoz1) +parseFloat(data.Fijos_Provincia_Magnavoz1)+parseFloat(data.Moviles_Magnavoz1)+parseFloat(data.Internacional_Magnavoz1) +parseFloat(data.Rural_Magnavoz1))+(parseFloat(data.Fijos_Lima_Hindutelecom1) +parseFloat(data.Fijos_Provincia_Hindutelecom1)+parseFloat(data.Moviles_Hindutelecom1)+parseFloat(data.Internacional_Hindutelecom1) +parseFloat(data.Rural_Hindutelecom1))+(parseFloat(data.Fijos_Lima_Perucalls1) +parseFloat(data.Fijos_Provincia_Perucalls1)+parseFloat(data.Moviles_Perucalls1)+parseFloat(data.Internacional_Perucalls1) +parseFloat(data.Rural_Perucalls1))).toFixed(2)}</td>
        <td>S/.{parseFloat((parseFloat((data.Fijos_Lima_Convergia1*costoUnit_Fijo_Lima_Convergia).toFixed(2))+parseFloat((data.Fijos_Provincia_Convergia1*costoUnit_Provincia_Convergia).toFixed(2))+parseFloat((data.Moviles_Convergia1*data.costoUnit_Movil_Convergia).toFixed(2))+parseFloat((data.Rural_Convergia1*costoUnit_Rural_Convergia).toFixed(2)))+(parseFloat((data.Fijos_Lima_Ipbusiness1*costoUnit_Fijo_Lima_Ipbusiness).toFixed(2))+parseFloat((data.Fijos_Provincia__Ipbusiness1*costoUnit_Provincia_Ipbusiness).toFixed(2))+parseFloat((data.Moviles__Ipbusiness1*data.costoUnit_Movil_Ipbusiness).toFixed(2))+parseFloat((data.Rural__Ipbusiness1*costoUnit_Rural_Ipbusiness).toFixed(2)))+(parseFloat((data.Fijos_Lima_Magnavoz1*costoUnit_Fijo_Lima_Magnavoz).toFixed(2))+parseFloat((data.Fijos_Provincia_Magnavoz1*costoUnit_Provincia_Magnavoz).toFixed(2))+parseFloat((data.Moviles_Magnavoz1*data.costoUnit_Movil_Magnavoz).toFixed(2))+parseFloat((data.Rural_Magnavoz1*costoUnit_Rural_Magnavoz).toFixed(2)))+(parseFloat((data.Fijos_Lima_Hindutelecom1*costoUnit_Fijo_Lima_Hindutelecom).toFixed(2))+parseFloat((data.Fijos_Provincia_Hindutelecom1*costoUnit_Provincia_Hindutelecom).toFixed(2))+parseFloat((data.Moviles_Hindutelecom1*data.costoUnit_Movil_Hindutelecom).toFixed(2))+parseFloat((data.Rural_Hindutelecom1*costoUnit_Rural_Hindutelecom).toFixed(2)))+(parseFloat((data.Fijos_Lima_Perucalls1*costoUnit_Fijo_Lima_Perucalls).toFixed(2))+parseFloat((data.Fijos_Provincia_Perucalls1*costoUnit_Provincia_Perucalls).toFixed(2))+parseFloat((data.Moviles_Perucalls1*data.costoUnit_Movil_Perucalls).toFixed(2))+parseFloat((data.Rural_Perucalls1*costoUnit_Rural_Perucalls).toFixed(2)))).toFixed(2)}</td>
</tr>
 
 </tbody>
))
}





</table>
            </div>
        </div>





        </div>
    )
}
