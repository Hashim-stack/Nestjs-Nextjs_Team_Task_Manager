import { TasksService } from "./tasks.service";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("tasks")
export class TasksController {

 constructor(private tasksService: TasksService) {}

 @Get()
 getTasks(@Req() req) {

  const user = req.user;

  if (user.role === "admin") {
   return this.tasksService.findAll();
  }

  return this.tasksService.getUserTasks(user.id);
 }

 @Get("stats")
 getStats() {
  return this.tasksService.getStats();
 }

 @Post()
 create(@Body() data:any){

  return this.tasksService.create({
   title:data.title,
   description:data.description,
   priority:data.priority || "medium",
   user:{ id:data.userId }
  })

 }

 @Put(":id")
 update(@Param("id") id:number,@Body() body){
  return this.tasksService.update(id,body)
 }

 @Put(":id/complete")
 markCompleted(@Param("id") id:number){
  return this.tasksService.markCompleted(id)
 }

 @Put(":id/priority")
 setPriority(@Param("id") id:number,@Body() body){
  return this.tasksService.updatePriority(id,body.priority)
 }

 @Delete(":id")
 deleteTask(@Param("id") id:number){
  return this.tasksService.delete(id)
 }

}