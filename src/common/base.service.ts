import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<Entity> {
  constructor(
    private readonly repository: Repository<Entity>, // private readonly searchableColumns: string[],
  ) {}

  protected abstract getSearchableColumns(): string[];

  protected abstract getSortableStringColumns(): string[];

  async findAll(
    filter: Partial<Entity>,
    search: string,
    page: number,
    limit: number,
    sort: string[],
  ) {
    const queryBuilder = this.repository.createQueryBuilder('entity');

    if (search) {
      const searchQuery = this.getSearchableColumns()
        .map((column) => `LOWER(entity.${column}) LIKE :search`)
        .join(' OR ');
      queryBuilder.where(searchQuery, {
        search: `%${search.toLowerCase()}%`,
      });
    }

    Object.keys(filter).forEach((key) => {
      if (filter[key] !== undefined) {
        queryBuilder.andWhere(`LOWER(entity.${key}) = LOWER(:${key})`, {
          [key]: filter[key],
        });
      }
    });

    if (
      !search &&
      Object.keys(filter).every((key) => filter[key] === undefined)
    ) {
      queryBuilder.skip((page - 1) * limit);
      queryBuilder.take(limit);
    }

    const stringColumns = ['name']; // Modify this array to include the string columns of your entity

    sort.forEach((sortParam) => {
      const direction = sortParam[0] === '-' ? 'DESC' : 'ASC';
      const column = sortParam[0] === '-' ? sortParam.slice(1) : sortParam;
      if (stringColumns.includes(column)) {
        queryBuilder.addOrderBy(`LOWER(entity.${column})`, direction);
      } else {
        queryBuilder.addOrderBy(`entity.${column}`, direction);
      }
    });
    queryBuilder.addOrderBy('entity.created_at', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

    const result = {
      data,
      total,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(total / limit),
      first_page_url: `?page=1&limit=${limit}`,
      last_page_url: `?page=${Math.ceil(total / limit)}&limit=${limit}`,
      next_page_url:
        page < Math.ceil(total / limit)
          ? `?page=${page + 1}&limit=${limit}`
          : null,
      prev_page_url: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      from: (page - 1) * limit + 1,
      to: page * limit > total ? total : page * limit,
    };

    return result;
  }
}
