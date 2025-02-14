import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginatorService {
  paginate<T>(
    items: T[],
    totalItems: number,
    currentPage: number,
    limit: number,
  ): {
    items: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
  } {
    const totalPages = Math.ceil(totalItems / limit) || 0;
    return {
      items,
      totalItems: Number(totalItems),
      currentPage: Number(currentPage),
      totalPages: Number(totalPages),
    };
  }
}
