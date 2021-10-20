import { Injectable } from '@nestjs/common';
import { MyLogger } from '../../shared/application/logger/myLogger.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExampleService {
  constructor(
    private readonly _logger: MyLogger
  ) {
    this._logger.setContext(ExampleService.name);
  }

  create(createExampleDto: CreateExampleDto) {
    this._logger.debug('create');
    return 'This action adds a new example';
  }
  
  findAll() {
    this._logger.debug('findAll');
    return `This action returns all example`;
  }
  
  findOne(id: number) {
    this._logger.debug(`findOne #${id}`);
    return `This action returns a #${id} example`;
  }
  
  update(id: number, updateExampleDto: UpdateExampleDto) {
    this._logger.debug(`update #${id}`);
    return `This action updates a #${id} example`;
  }
  
  remove(id: number) {
    this._logger.debug(`remove #${id}`);
    return `This action removes a #${id} example`;
  }
}
