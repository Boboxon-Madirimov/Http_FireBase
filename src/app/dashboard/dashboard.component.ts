import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskSevice } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  showCreateTaskForm: boolean = false;
  http:HttpClient=inject(HttpClient)
  AllTask:Task[]=[]
  taskService:TaskSevice=inject(TaskSevice)
currentTaskId:string=''

  editMode:boolean=false
  selectedTask!:Task

  ngOnInit(): void {
  this.fetchAllData()
  }

  OpenCreateTaskForm() {

    this.showCreateTaskForm = true;
    this.editMode=false;
    this.selectedTask={title:'',desc:'',assignedTo:'',createdAt:'',priority:'',status:'',id:''}
  }


  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data:Task){
    if(!this.editMode)
    this.taskService.CreateTask(data)
  else
    this.taskService.UpdateTask(this.currentTaskId,data)
  }
FetchAllTasks(){
  this.fetchAllData()
}
 
private fetchAllData(){
 this.taskService.GetAllTask().subscribe((task)=>{this.AllTask=task})
}

DeleteTask(id:string|undefined){
  this.taskService.DeleteTask(id)
}

DeleteAllTasks(){
  this.taskService.DeleteAllTasks()
}

OnEditTaskClicled(id:string|undefined){
  this.currentTaskId=id!
  this.showCreateTaskForm=true
  this.editMode=true;
  const foundTask = this.AllTask.find((task) => task.id === id);
  if (foundTask) {
    this.selectedTask = foundTask;
  }  
}

}
