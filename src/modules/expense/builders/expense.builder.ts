/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseFilterQueryDto } from '../dto/expense-filter.dto';

class PagingBuilder {
	public static build(sorting: Pick<ExpenseFilterQueryDto, 'page' | 'perPage'>): { skip: number; take: number } {
		return {
			skip: (sorting.page - 1) * sorting.perPage,
			take: sorting.perPage
		};
	}
}

class SortingBuilder {
	public static build(sorting: Pick<ExpenseFilterQueryDto, 'sort' | 'direction'>): object {
		if (sorting.direction && sorting.sort) {
			return {
				[sorting.sort]: sorting.direction
			};
		}
		return {};
	}
}

class FilteringBuilder {
	private static toName(value: string): any {
		return { name: { contains: value, mode: 'insensitive' } };
	}

	private static toDate(dateFrom: Date | undefined, dateTo: Date | undefined): any {
		if (dateFrom && dateTo) {
			return {
				date: {
					gte: dateFrom,
					lte: dateTo
				}
			};
		}
		if (dateFrom) {
			return {
				date: {
					gte: dateFrom
				}
			};
		}
		return {
			date: {
				lte: dateTo
			}
		};
	}

	private static toAmount(amountFrom: number | undefined, amountTo: number | undefined): any {
		if (amountFrom && amountTo) {
			return {
				amount: {
					gte: amountFrom,
					lte: amountTo
				}
			};
		}
		if (amountFrom) {
			return {
				amount: {
					gte: amountFrom
				}
			};
		}
		return {
			amount: {
				lte: amountTo
			}
		};
	}

	private static toEquals(key: string, value: string | number | boolean): any {
		return {
			[key]: {
				equals: value
			}
		};
	}

	public static build(filterDto: Omit<ExpenseFilterQueryDto, 'page' | 'perPage' | 'sort' | 'direction'>): any[] {
		const filter = [];

		if (filterDto.name) {
			filter.push(FilteringBuilder.toName(filterDto.name));
		}

		if (filterDto.dateFrom || filterDto.dateTo) {
			filter.push(FilteringBuilder.toDate(filterDto.dateFrom, filterDto.dateTo));
		}

		if (filterDto.amountFrom || filterDto.amountTo) {
			filter.push(FilteringBuilder.toAmount(filterDto.amountFrom, filterDto.amountTo));
		}

		if (filterDto.type) {
			filter.push(FilteringBuilder.toEquals('type', filterDto.type));
		}

		if (filterDto.categoryId) {
			filter.push(FilteringBuilder.toEquals('categoryId', filterDto.categoryId));
		}

		if (filterDto.accountId) {
			filter.push(FilteringBuilder.toEquals('accountId', filterDto.accountId));
		}
		return filter;
	}
}

export class ExpenseQueryBuilder {
	private static paging = PagingBuilder;
	private static filtering = FilteringBuilder;
	private static sorting = SortingBuilder;

	static buildPaging(page, perPage): { skip: number; take: number } {
		return this.paging.build({ page, perPage });
	}

	static buildFilters(filterDto: Omit<ExpenseFilterQueryDto, 'page' | 'perPage' | 'sort' | 'direction'>): any[] {
		return this.filtering.build(filterDto);
	}

	static buildSorting(sort, direction): object {
		return this.sorting.build({ sort, direction });
	}
}
