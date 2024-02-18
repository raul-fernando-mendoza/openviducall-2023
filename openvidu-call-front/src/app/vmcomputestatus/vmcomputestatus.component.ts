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



  
  constructor(private compute:VminstanceService) { }
  ngAfterViewInit(): void {
    setInterval(()=> { this.getStatus() }, 5000);
    
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
    this.compute.vminstanceApiInterface("computeInstanceStart",environment.projectId, environment.zone, environment.OPENVIDU_INSTANCE_NAME ).subscribe( {
      next(response) { 
        thiz.lastAction = "Open vidu esta siendo inicializado por favor espere" 
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
  onStop() {


    this.submitting = true
    var thiz = this
    this.compute.vminstanceApiInterface("computeInstanceStop",environment.projectId, environment.zone, environment.OPENVIDU_INSTANCE_NAME ).subscribe( {
      next(response) { 
        thiz.lastAction = "Open vidu esta siendo detenido por favor espere."
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
  
}
