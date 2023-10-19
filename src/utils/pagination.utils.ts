import { BadRequestException } from '@nestjs/common';

export function validatePagination(
  limit: number,
  page: number,
  maxLimit: number,
) {
  if (limit < 1 || limit > maxLimit) {
    throw new BadRequestException(`Limit must be between 1 and ${maxLimit}`);
  }
  if (page < 1) {
    throw new BadRequestException(`Page must be greater than or equal to 1`);
  }
}
