import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VminstanceService } from '../vminstance.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-vmcomputestatus',
  templateUrl: './vmcomputestatus.component.html',
  styleUrls: ['./vmcomputestatus.component.scss']
})
export class VmcomputestatusComponent implements AfterViewInit {

  instanceName = environment.OPENVIDU_INSTANCE_NAME
  instanceStatus = "" 

  lastAction = ""
  submitting = false


  maxStatusCount = 120
  statusCount = 0
  intervalId

	adminLogin = false;
	password = "Argos4905"

	isAdmin = false

  waitForStatus = ""

  
  constructor(private compute:VminstanceService) { }
  ngAfterViewInit(): void {
    this.getStatus()
    
  }

  statusUpdateStart(){
    this.statusCount = this.maxStatusCount
    clearInterval( this.intervalId )
    this.intervalId = setInterval(()=> { 
      this.statusCount--;
      if( this.statusCount <= 0 || this.waitForStatus == this.instanceStatus){
        clearInterval( this.intervalId )
        if( this.waitForStatus == this.instanceStatus  ){
          this.lastAction = "completado"
        }
        else{
          this.lastAction = "Tiempo maximo alcanzado favor reintente"
        }
        
      }
      else{
        this.getStatus() 
        this.lastAction = "Por favor espere:" + this.statusCount
      }
    }, 1000);
  }


  getStatus(){
    this.submitting = true
    var thiz = this

    this.compute.vminstanceApiInterface("getComputeInstanceList",environment.projectId, environment.zone ).subscribe( {
      next(response) { 
        let instances = response["result"]["instances"]
        for( let i=0; i<instances.length; i++){
          let instance = instances[i]
          if( instance.name == environment.OPENVIDU_INSTANCE_NAME ){
            thiz.instanceStatus = instance.status
          }
        }
        thiz.submitting = false;
      },
      error(err) { 
        alert('Error: ' + err.error.error); 
        thiz.submitting = false;
      },
      complete() { 
        console.log('Completado'); 
        thiz.submitting = false;        
      }
    }) 
  }
  onStart() {
    this.submitting = true
    var thiz = this
    this.waitForStatus = 'RUNNING'
    this.compute.vminstanceApiInterface("computeInstanceStart",environment.projectId, environment.zone, environment.OPENVIDU_INSTANCE_NAME ).subscribe( {
      next(response) { 
        thiz.lastAction = "Open vidu esta siendo inicializado por favor espere" 
        thiz.submitting = false;
        thiz.statusUpdateStart()
      },
      error(err) { 
        alert('Error: ' + err.error.error); 
        thiz.submitting = false;
      },
      complete() { 
        console.log('Completado'); 
        thiz.submitting = false;        
      }
    })     
  }
  onStop() {


    this.submitting = true
    var thiz = this
    this.waitForStatus = 'TERMINATED'    
    this.compute.vminstanceApiInterface("computeInstanceStop",environment.projectId, environment.zone, environment.OPENVIDU_INSTANCE_NAME ).subscribe( {
      next(response) { 
        thiz.lastAction = "Open vidu esta siendo detenido por favor espere."
        thiz.submitting = false;
        thiz.statusUpdateStart()
      },
      error(err) { 
        alert('Error: ' + err.error.error); 
        thiz.submitting = false;
      },
      complete() { 
        console.log('Completado'); 
        thiz.submitting = false;        
      }
    })     
  }

	onUseAdmin($event) {
		let pass = prompt("inserte su password","")
		if( pass != this.password ){
		  alert( "incorrect password")
		  return -1
		}
		else{
			this.isAdmin = true
		}
	}	  
}
