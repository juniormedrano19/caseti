import React, { useState, useReducer, useEffect} from 'react';
import { useForm } from '../hooks/useForm';
import { v4 as uuid_v4 } from "uuid";
import { TicketReducer } from '../components/TicketReducer';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';


const init=()=>{
    return JSON.parse(localStorage.getItem('tickets')) || []

}


export const FormTicket = () => {


  const  [valores, handleInputChange, reset] = useForm({
    id:uuid_v4(),
    name:'',
    direccionIp:'',
    supervisor:'',
    download:'Mb',
    carga:'Mb',
    tipo:'',
    optical:'%',
    claro:'%',
    gateway:'%',
    chile:'%',
    chile1:'%',
    google:'%',
    date:'',
    hours:'',
    edit:false,

  })

const { id, name, direccionIp, supervisor, download, carga, tipo, optical, claro, gateway, chile, chile1, google, date, hours,edit} = valores

  const [tickets, dispatch] = useReducer(TicketReducer, [], init)



  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets))
}, [tickets])




const handleSubmit=(e)=>{
    e.preventDefault();

if(name.trim().length <= 1 && direccionIp.trim().length <=1 ){
    return;
}
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
let diaActual=`${date}/${month}/${year}`

    const newTicket={
        id:uuid_v4(),
name,
direccionIp,
supervisor,
download,
carga,
tipo,
optical,
claro,
gateway,
chile,
chile1,
google,
date:diaActual,
hours:`${new Date().getHours()}:${new Date().getMinutes()}`,
edit,
    }

/* if(month < 10){
  console.log(`${day}-0${month}-${year}`)
}else{
  console.log(`${day}-${month}-${year}`)
} */


const action={
    type:'add',
    payload:newTicket,
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

const handleToggle=(todoId)=>{

    dispatch({
        type:'toggle',
        payload:todoId,
    })

}



const [search1,handleInputSearch,resetear]= useForm({
    search:''
})
const {search} = search1

/* console.log(search); */
 const dataStore=init();
 let res = dataStore.filter(o=>Object.values(o).toString().toLowerCase().includes(search)) 


init();

const [chartData, setChartData]=useState({})


const chart=()=>{
let diaTicket;
    (search.length>0)?( diaTicket=res.map(({date})=>{
        return date;
    })):( diaTicket=tickets.map(({date})=>{
        return date;
    }))

   

    const dateTicket=[... new Set(diaTicket)]
    const arregloDate=dateTicket.reverse();
 



//Valores repetidos
var repetidos = {};

diaTicket.forEach((numero)=>{
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});

const valorRepetido=Object.values(repetidos)
const valorRepeat=valorRepetido.reverse();





   
      
 








    setChartData({
        labels:arregloDate,
        datasets:[
            {
                label:'N?? de incidencias por d??a',
     

                data:valorRepeat,
                backgroundColor:[
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth:6,

                borderColor:'rgba(	7,	177,	107,0.85)',
            }
        ]
    })
}




useEffect(() => {
    chart()
}, [search, tickets])


const [chartBar, setChartBar]=useState({})

const barGraph=()=>{

    let hourTicket;
    (search.length>0)?( hourTicket=res.map(({hours})=>{
        return hours
    })):( hourTicket=tickets.map(({hours})=>{
        return hours
    }))



  /*   const hourTicket=res.map(({hours})=>{
        return hours
    }) */
   
    /* const dateTicket=[... new Set(diaTicket)]
    const arregloDate=dateTicket.reverse();
 

//Valores repetidos
var repetidos = {};

diaTicket.forEach((numero)=>{
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});

const valorRepetido=Object.values(repetidos)
const valorRepeat=valorRepetido.reverse(); */

const hourTicket2=hourTicket.map((p)=>{
   
    const arreglo=p.split(":");
    return arreglo[0];
    
})

const hourTicket3=[... new Set(hourTicket2)]
    const arregloHour=hourTicket3.reverse().sort((a, b) => a - b); 


    var repetidos = {};

    hourTicket2.forEach((numero)=>{
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });    

    const valorRepetido=Object.values(repetidos) 

const switchArreglo=arregloHour.map((p)=>{
    switch (p) {
        case '7':
            
            return '7-8hrs';
        case '8':
        
        return '8-9hrs';
        case '9':
            
            return '9-10hrs';
        case '10':
        
        return '10-11hrs';
        case '11':
            
            return '11-12hrs';
        case '12':
        
        return '12-13hrs';
        case '13':
            
            return '13-14hrs';
        case '14':
        
        return '14-15hrs';
        case '15':
            
            return '15-16hrs';
        case '16':
        
        return '16-17hrs';
        case '17':
            
            return '17-18hrs';
        case '18':
        
        return '18-19hrs';
        case '19':
            
            return '19-20hrs';
        case '20':
        
        return '20-21hrs';
    
        default:
            return p;
    }
})

console.log(switchArreglo);
console.log(repetidos);



setChartBar({
         labels: switchArreglo,
  datasets: [
    {
      label: 'N?? de incidencias por hora',
      data: valorRepetido,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',

    }
  ]
    })
}


useEffect(() => {
    barGraph()
}, [search, tickets])




const [chartDona, setChartDona]=useState({})

const donaGraph=()=>{
    let tipoRed;
    (search.length>0)?(tipoRed=res.map(({tipo})=>{
        return tipo
       })):(tipoRed=tickets.map(({tipo})=>{
        return tipo
       }))

const tipoRed1=[... new Set(tipoRed)]
console.log(tipoRed1);

var repetidos = {};

tipoRed.forEach((numero)=>{
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });    

    const valorRepetido=Object.values(repetidos) 
console.log(valorRepetido);



    setChartDona({
        labels: tipoRed1,
        datasets:[
            {
                label: 'Rainfall',
      backgroundColor: [
        
      
        '#C9DE00',
        '#4c74b9',
        '#B21F00',
      
        '#26b16d',
        '#00A6B4',
        
       
      ],
      hoverBackgroundColor: [
        '#175000', 
        '#003350',  
      '#501800',
   
      '#4B5000',
      '#175000',
    
      
    

      ],
      data: valorRepetido,
            }
        ]
    })
}





useEffect(() => {
    donaGraph()
}, [search, tickets])


//Supervisor

const [chartDona1, setChartDona1]=useState({})

const donaGraph1=()=>{
    let supervisorGraph;
    (search.length>0)?(supervisorGraph=res.map(({supervisor})=>{
        return supervisor
       })):(supervisorGraph=tickets.map(({supervisor})=>{
        return supervisor
       }))

const tipoRed1=[... new Set(supervisorGraph)]
console.log(tipoRed1);

var repetidos = {};

supervisorGraph.forEach((numero)=>{
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });    

    const valorRepetido=Object.values(repetidos) 
console.log(repetidos);
console.log(valorRepetido);


    setChartDona1({
        labels: tipoRed1,
        datasets:[
            {
                label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#26b16d',
        '#00A6B4',
        '#4c74b9',
        '#085CA5',
        '#DF8419',
        '#f44f5c',
        '#A0A1A0',
        '#F1E827',
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F',
      '#052B4D',
      '#A65B03',
      '#4C112A',
      '#686969',
      '#989105',


      ],
      data: valorRepetido,
            }
        ]
    })
}





useEffect(() => {
    donaGraph1()
}, [search, tickets])




const [chartMb, setChartMb]=useState({})


const internetGraph=()=>{

//Descarga

let prueba12;
(search.length>0)?(prueba12=res.map(({download})=>{
    return download
   })):(prueba12=tickets.map(({download})=>{
    return download
   }))



const prueba13=prueba12.map((p)=>{
    const amo=p.split(" ")
    const numeroAmo=parseFloat(amo)
  
    return numeroAmo;
})
const orden=prueba13.sort((a, b) => a - b)


console.log(orden);

/* let numeros = [1, 2, 3, 4, 5]; */
const longitud=orden.length
/* console.log(longitud); */

const total = orden.reduce((a, b) => a + b, 0);
/* console.log(total); */
const resultTotal=total/longitud
const promedio=resultTotal.toFixed(2);
const minimo=Math.min(...orden).toString();
const maximo=Math.max(...orden).toString();
/* console.log(promedio);
console.log(minimo);
console.log(maximo); */


const ejeX=[`M??nimo:${minimo}Mb`,`Promedio:${promedio}Mb`, `M??ximo:${maximo}Mb`]
const ejeY=[minimo,promedio,maximo]
/* console.log(ejeY); */

//Carga
/* const charged=res.map(({carga})=>{
    return carga
})

const charged1=charged.map((p)=>{
    const amo=p.split(" ");
    return amo[0]
})

console.log(`Carga`);
console.log(charged1); */

/* var nuevo = arr1.map((x,i)=> (+x + +arr2[i]) + "");
console.log(nuevo); */

/* const junior=[1,2,3,4,5]
const bryan=[2,3,4,5,6]
const nuevo = prueba13.map((x,i)=>{
    
   const resultado= (+x + +charged1[i])
    const rounded=resultado.toFixed(2);

    return rounded + ""
    
    

} ); */
/* console.log(nuevo);
 */




    setChartMb({
        labels:ejeX,
        datasets:[
            {
                label:'Internet',
                fill: false,
                lineTension: 0.5,

                data:ejeY,
                backgroundColor:[
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth:4,

                borderColor:'rgba(	7,	177,	107,0.85)',
            }
        ]
    })
}




useEffect(() => {
    internetGraph()
}, [search, tickets])



























    return (
        <div className='tickets-screen'>
        <div className="cabecera-tickets contenedorXlsx">
        <div className="title-excel">
        <h1>Registro de Tickets</h1>
        </div>
      
            <div className="nav-ticketsButtons">
              <form 
              className="formulario-search"
            
              >
           
<input
type="text"
id="search"
className="input-searchTickets"
name="search"
autoComplete="off"
placeholder="Search"
value={search}
onChange={ handleInputSearch }


/>







        
    <button 
   
    className="btn btn-searchTickets" 
    type="submit"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
    </form>
    <div className="col-4">
            <ReactHTMLTableToExcel 
                id="botonExportarExcel"
                className="btn btn-descargarExcelTickets"
                table="tablaInventario"
                filename="Reporte_Tickets"
                sheet="Reporte"
                buttonText="Descargar Excel"

                
            />
           </div>
    </div>
        
        </div>

 

        <form
        onSubmit={handleSubmit}
        
        >
        <div className="contenedorXlsx contenedor-mainTickets">
      
        <div className='campos'>

        <fieldset className='fieldset-Main'>
        <legend className='legend-main'>Formulario Ticket</legend>
       
        <div >
        <fieldset className='fieldset-Main'>
        <legend  className='legend-campo'>Datos generales</legend>
        <div className='campo-labelInput'>
            <label htmlFor="ip">Nombres y Apellidos(*) </label>
            <input
            type="text"
            id="name"
           
            name="name"
            autoComplete="off"
            placeholder="Nombres y Apellidos"
            value={name}
            onChange={handleInputChange}

            />
            </div>
            
            <div className='campo-labelInput' >
            <label htmlFor="ip">Direcci??n IP VPN (*) </label>
            <input
            type="text"
            id="ip"
           
            name="direccionIp"
            autoComplete="off"
            placeholder="Direcci??n IP VPN"
            value={direccionIp}
            onChange={handleInputChange}

            />
            </div>

            <div className='campo-labelInput'>
                <label htmlFor="supervisor">Supervisor</label>
            <select 
            id="supervisor" 
           className='select-ticket'
            name="supervisor"
            value={ supervisor } 
            onChange={handleInputChange}
            >
            <option defaultValue>...</option>
            <option>John Doe
            </option>
            <option>John Doe</option>
            <option>John Doe
            </option>
            <option>John Doe</option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe</option>
            <option>John Doe
            </option>
            <option>John Doe</option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            <option>John Doe
            </option>
            </select>
                </div>
                </fieldset>
                </div>

                <div >
                <fieldset className='fieldset-Main' >
                    <legend className='legend-campo'>Velocidad de Internet</legend>

                <div  className='campo-labelInput'>
            <label htmlFor="download">Descarga(???) </label>
            <input
            type="text"
            id="download"
           
            name="download"
            autoComplete="off"
            placeholder="Descarga"
            value={download}
            onChange={handleInputChange}

            />
            </div>

            <div className='campo-labelInput'>
            <label htmlFor="carga">Carga(???) </label>
            <input
            type="text"
            id="carga"
            
            name="carga"
            autoComplete="off"
            placeholder="Carga"
            value={carga}
            onChange={handleInputChange}

            />
            </div>
            <div className='campo-labelInput'>
                <label htmlFor="tipo">Tipo de Conexi??n de Internet</label>
            <select 
            id="tipo" 
            className='select-ticket'
            name="tipo"
            value={tipo}
            onChange={handleInputChange}
            >
            <option defaultValue>...</option>
            <option>Ethernet</option>
            <option>Wifi</option>
            <option>BAM</option>
            </select>
                </div>

            </fieldset>
                </div>


                <div >
                <fieldset  className='fieldset-Main' >
                    <legend className='legend-campo' >% Failed</legend>
                <div className='campo-labelInput'>
            <label htmlFor="optical">190.12.66.242 </label>
            <input
            type="text"
            id="optical"
            
            name="optical"
            autoComplete="off"
            placeholder="%"
            value={optical}
            onChange={handleInputChange}

            />
            </div>

            <div className='campo-labelInput'>
            <label htmlFor="claro">190.119.245.122 </label>
            <input
            type="text"
            id="claro"
           
            name="claro"
            autoComplete="off"
            placeholder="%"
            value={claro }
            onChange={handleInputChange}

            />
            </div>

            <div className='campo-labelInput'>
            <label htmlFor="gateway">gateway </label>
            <input
            type="text"
            id="gateway"
           
            name="gateway"
            autoComplete="off"
            placeholder="% "
            value={gateway}
            onChange={handleInputChange}


            />
            </div>
            <div className='campo-labelInput'>
            <label htmlFor="chile">192.9.100.62</label>
            <input
            type="text"
            id="chile"
            
            name="chile"
            autoComplete="off"
            placeholder="%"
            value={chile}
            onChange={handleInputChange}

            />
            </div>

            <div className='campo-labelInput'>
            <label htmlFor="chile1">192.9.100.201</label>
            <input
            type="text"
            id="chile1"
           
            name="chile1"
            autoComplete="off"
            placeholder="% "
            value={chile1}
            onChange={handleInputChange}

            />
            </div>
            <div className='campo-labelInput'>
            <label htmlFor="google">8.8.8.8</label>
            <input
            type="text"
            id="google"
           
            name="google"
            autoComplete="off"
            placeholder="%"
            value={google}
            onChange={handleInputChange}

            />
            </div>

            </fieldset>

                </div>


                
            
            <div >

            <button 
            type="submit"
            className="btn btn-historico"
          
            ><i class="fa-solid fa-plus"></i> Agregar al hist??rico</button>

            </div>
                
            </fieldset>
            </div>


<div  className='campos'>
{
    (search.length>1)?(<h2 className="text-graph">Total:{res.length} Incidencias</h2>):(<h2 className="text-graph">Total:{tickets.length} Incidencias</h2>)
}
<h2 className="text-graph"></h2>
<Line 
data={ chartData }
width={800}
height={800}
options= {{
    responsive:true,
    
    title:{text:'Registro de Incidencias de Red', display:true, fontSize:20,fontColor:"black"},

    scales:{
        yAxes:[
            {
                ticks:{
                    autoSkip:true,
                    maxTicksLimit:10,
                    beginAtZero:true

                },
                gridLines:{
                    display:false
                }
            }
        ],
        xAxes:[
            {
                gridLines:{
                    display:true
                }
            }
        ]
    }
}}
/>


</div>



<div className='campos campos-bar' >
  
    <Bar
          data={chartBar}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: false,
            responsive:true,
    
    title:{text:'Registro de Incidencias de Red por hora', display:true, fontSize:20,fontColor:"black"},
   
    scales:{
        yAxes:[
            {
                ticks:{
                    autoSkip:true,
                    maxTicksLimit:10,
                    beginAtZero:true

                },
                gridLines:{
                    display:false
                }
            }
        ],
        xAxes:[
            {
                gridLines:{
                    display:true
                }
            }
        ]
    }

    }} />
</div>


<div className='campos campos-bar'>
<Line 
data={ chartMb }
width={450}
height={320}
options= {{
    responsive:true,
    
    title:{text:'Velocidad de Internet(Mb)', display:true, fontSize:20,fontColor:"black"},
    legend:{
              display:true,
              position:'right'
            },

    scales:{
        yAxes:[
            {
                ticks:{
                    autoSkip:true,
                    maxTicksLimit:10,
                    beginAtZero:true

                },
                gridLines:{
                    display:false
                }
            }
        ],
        xAxes:[
            {
                gridLines:{
                    display:true
                }
            }
        ]
    }
}}
/>
</div>


<div className='campos campos-bar'>
<Pie
          data={chartDona}
          width={350}
          height={230}
          options={{
            title:{
              display:true,
              text:'Tipo de Conexi??n',
              fontSize:20,
              fontColor:'black'
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

       
</div>
<div className='campos campos-bar'>
<Doughnut
          data={chartDona1}
          width={350}
          height={220}
          options={{
            title:{
              display:true,
              text:'Supervisores',
              fontSize:20,
              fontColor:'black'
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

       
</div>



</div>
</form>















<div className="table-tickets contenedorXlsx">
<div className="table-mainTickets ">
<table 
className="table-ticketV1"
id="tablaInventario"
>

<thead>
    <tr className='encabezado-ticketTable'>
      <th scope="col">#</th>
      <th scope="col">Nombres y Apellidos</th>
      <th scope="col">Direcci??n Ip VPN</th>
      <th scope="col">Supervisor</th>
      <th scope="col">Descarga (???)</th>
      <th scope="col">Carga (???)</th>
      <th scope="col">Tipo de conexi??n</th>
      <th scope="col">190.12.66.242</th>
      <th scope="col">190.119.245.122</th>
      <th scope="col">Gateway</th>
      <th scope="col">192.9.100.62</th>
      <th scope="col">192.9.100.201</th>
      <th scope="col">8.8.8.8</th>
      <th scope="col">D??a</th>
      <th scope="col">Hora</th>
      <th scope="col">Acci??n</th>
    </tr>
  </thead>
  <tbody>
  {

   (search.length>0)?( res.map((data,i)=>(

<tr key={data.id} className={`${data.edit && 'complete'}`}>


<th scope="row">{`${i+1}`}</th>
<td>{data.name}</td>
<td>{data.direccionIp}</td>
<td>{data.supervisor}</td>
<td>{data.download}</td>
<td>{data.carga}</td>
<td>{data.tipo}</td>
<td>{data.optical}</td>
<td>{data.claro}</td>
<td>{data.gateway}</td>
<td>{data.chile}</td>
<td>{data.chile1}</td>
<td>{data.google}</td>
<td>{data.date}</td>
<td>{data.hours}</td>
<td>
<div className="separacion">
<button 
className="btn btn-deleteTicket"
title='Borrar'
onClick={ ()=>handleDelete(data.id) }
><i class="fa-solid fa-trash"></i> </button>
<button 
onClick={()=>handleToggle(data.id)}
title="Editar"
className="btn btn-EditTicket"><i class="fa-solid fa-pen-to-square"></i></button>
</div>
</td>

</tr>
 
))):( tickets.map((data,i)=>(

<tr key={data.id} className={`${data.edit && 'complete'}`}>


<th scope="row">{`${i+1}`}</th>
<td>{data.name}</td>
<td>{data.direccionIp}</td>
<td>{data.supervisor}</td>
<td>{data.download}</td>
<td>{data.carga}</td>
<td>{data.tipo}</td>
<td>{data.optical}</td>
<td>{data.claro}</td>
<td>{data.gateway}</td>
<td>{data.chile}</td>
<td>{data.chile1}</td>
<td>{data.google}</td>
<td>{data.date}</td>
<td>{data.hours}</td>
<td>
<div className="separacion">
<button 
className="btn btn-deleteTicket"
title='Eliminar'
onClick={ ()=>handleDelete(data.id) }
> <i class="fa-solid fa-trash"></i> </button>
<button 
onClick={()=>handleToggle(data.id)}
title="Editar"
className="btn btn-EditTicket"><i class="fa-solid fa-pen-to-square"></i></button>

</div>

</td>

</tr>
 
)))
      

       
    
  }
    
  
  </tbody>



</table>




</div>

</div> 

        </div>
    )
}
