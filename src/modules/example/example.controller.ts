import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { PermissionsGuard } from '../../shared/application/guards/permisisions.guard';
import { Permissions } from '../../shared/application/decorators/permissions.decorator';
import { Public } from '../../shared/application/decorators/public.decorator';
import { MyLogger } from '../../shared/application/logger/myLogger.service';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly _exampleService: ExampleService,
    private readonly _logger: MyLogger
    ) {
      this._logger.setContext(ExampleController.name);
    }

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('example:create')
  create(@Body() createExampleDto: CreateExampleDto) {
    this._logger.debug('create');
    return this._exampleService.create(createExampleDto);
  }
  
  @Public()
  @Get()
  findAll() {
    this._logger.debug('findAll');
    return this._exampleService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    this._logger.debug('findOne');
    return this._exampleService.findOne(+id);
  }
  
  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('example:update')
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    this._logger.debug('update');
    return this._exampleService.update(+id, updateExampleDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    this._logger.debug('remove');
    return this._exampleService.remove(+id);
  }
}
