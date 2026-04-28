import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-status.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso.', type: [Task] })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('completed')
  @ApiOperation({ summary: 'Listar todas as tarefas concluídas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas concluídas retornada com sucesso.', type: [Task] })
  findAllCompleted() {
    return this.tasksService.findAllCompleted();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada.', type: Task })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.', type: Task })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa completa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso.', type: Task })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar apenas o status de conclusão' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso.', type: Task })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  updateStatus(@Param('id') id: string, @Body() statusDto: UpdateTaskStatusDto) {
    return this.tasksService.updateStatus(id, statusDto.completed);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
