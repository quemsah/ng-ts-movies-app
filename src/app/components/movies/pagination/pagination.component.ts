import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public items: any[];
  @Output() public changePage = new EventEmitter<any>(true);
  @Input() public initialPage = 1;
  @Input() public pageSize = 10;
  @Input() public maxPages = 10;

  public pager: any = {};
  constructor(public themeService: ThemeService) {}

  public ngOnInit() {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  public setPage(page: number): void {
    this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);
    const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.changePage.emit(pageOfItems);
  }

  public paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ): any {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    let startPage: number;
    let endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }
}
