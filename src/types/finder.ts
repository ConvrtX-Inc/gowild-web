import React from 'react';

export interface FoundComponent<T> {
  item: T;
}

export interface NotFoundOrErrorComponent {
  error: any;
}

export interface FinderProps<T = any> {
  id: string;
  OnFound: React.JSXElementConstructor<FoundComponent<T>>;
  OnError: React.JSXElementConstructor<NotFoundOrErrorComponent>;
  OnLoading?: React.JSXElementConstructor<any>;
}

export interface PaginationProps<T> {
  params: T;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}
