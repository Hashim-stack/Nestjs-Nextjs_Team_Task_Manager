import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  create(data: any) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      relations: ["user"],
    });
  }
  async updatePriority(id: number, priority: string) {
    return this.repo.update(id, { priority });
  }
  async markCompleted(id: number) {
    return this.repo.update(id, { status: "completed" });
  }

  getUserTasks(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } } as any,
      relations: ["user"],
    });
  }

  async getStats() {
    const totalTasks = await this.repo.count();

    const completedTasks = await this.repo.count({
      where: { status: "completed" } as any,
    });

    const pendingTasks = await this.repo.count({
      where: { status: "pending" } as any,
    });

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
