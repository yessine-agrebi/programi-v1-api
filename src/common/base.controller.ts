import {
  DefaultValuePipe,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BaseService } from './base.service';
import validator from 'validator';
import { validatePagination } from '../utils/pagination.utils';

export abstract class BaseController<Entity> {
  constructor(private readonly baseService: BaseService<Entity>) {}

  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('search') search: string,
    @Query('sort', new DefaultValuePipe([]), ParseArrayPipe) sort: string[],
    filter: Partial<Entity>,
  ) {
    const maxLimit = 50;
    validatePagination(limit, page, maxLimit);

    if (search) {
      search = validator.escape(search.trim());
    }

    return this.baseService.findAll(filter, search, page, limit, sort);
  }
}
