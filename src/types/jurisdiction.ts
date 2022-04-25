export interface Jurisdiction {
  id: string;
  address1?: string;
  address2?: string;
  avatar?: string;
  jurisdiction?: string;
  currency?: string;
  email: string;
  hasAcceptedMarketing?: boolean;
  hasDiscountedPrices?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
  isVerified?: boolean;
  name: string;
  phone?: string;
  state?: string;
  totalAmountSpent?: number;
  caseIdNo?: number;
  caseTitle?: string;
  updatedAt?: string;
  vatRate?: number;
  zipCode?: string;
}
