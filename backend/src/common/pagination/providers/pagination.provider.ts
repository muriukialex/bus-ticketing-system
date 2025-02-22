import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query-dto';
import { PaginationInterface } from '../interfaces/pagination.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Inject request body
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    additionalParams?: any,
  ): Promise<PaginationInterface<T>> {
    const results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.per,
      take: paginationQuery.per,
      where: additionalParams,
    });

    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseUrl);

    /**
     * Create the meta object
     */
    const totalItems = results.length;
    const itemsPerPage = paginationQuery.per;
    const currentPage = paginationQuery.page;
    const totalPages = Math.ceil(totalItems / paginationQuery.per);

    const nextPage =
      paginationQuery.page === totalPages ? null : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1 ? null : paginationQuery.page - 1;

    const meta = {
      totalItems,
      itemsPerPage,
      currentPage,
      totalPages,
    };

    const url = `${newUrl.origin}+${newUrl.pathname}`;
    const links = {
      first: `${url}?per${paginationQuery.per}&page=1`,
      last: `${url}?per${paginationQuery.per}&page=${totalPages}`,
      current: `${url}?per${paginationQuery.per}&page=${paginationQuery.page}`,
      next: `${url}?per${paginationQuery.per}&page=${nextPage}`,
      previous: `${url}?per${paginationQuery.per}&page=${previousPage}`,
    };

    const response: PaginationInterface<T> = {
      data: results,
      meta,
      links,
    };

    return response;
  }
}
