import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map } from 'rxjs/operators';
import { Task } from "../Model/Task";
@Injectable({
    providedIn:'root'
})

export class TaskSevice{
    http:HttpClient=inject(HttpClient)



    CreateTask(data:Task){
        const headers=new HttpHeaders({'my-header':'hello-world'})
        this.http.post<{name:string}>(
          'https://second-app-7a721-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
          data,{headers:headers}).
          subscribe(
          )
      }
			DeleteTask(id:string|undefined){
				this.http.delete(
					'https://second-app-7a721-default-rtdb.europe-west1.firebasedatabase.app/tasks/'+id+'.json')
					.subscribe()
			}

			DeleteAllTasks(){
				this.http.delete(
					'https://second-app-7a721-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
				.subscribe()
			}

			GetAllTask(){
			return	this.http.get<{[key:string]:Task}>(
					'https://second-app-7a721-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
					.pipe(map((res)=>{
						let tasks=[]
						for(let key in res){
							if(res.hasOwnProperty(key)){
								tasks.push({...res[key],id:key})
							}
						}
						return tasks
					}))
				
			}
			UpdateTask(id:string|undefined,data:Task){
				this.http.put('https://second-app-7a721-default-rtdb.europe-west1.firebasedatabase.app/tasks/'+id+'.json',data).subscribe()
			}
}