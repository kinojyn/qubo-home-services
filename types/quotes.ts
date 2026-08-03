export type QuestionType =
  "dropdown" | "radio" | "checkbox" | "number" | "text" | "image" | "toggle";

export type Operator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte";

export type AdjustmentType = "fixed" | "percentage" | "per_unit";

export interface QuoteCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export interface QuoteQuestion {
  id: string;
  key: string;
  label: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
}

export interface PricingCondition {
  field: string;
  operator: Operator;
  value: string | number | boolean;
}

export interface PricingAdjustment {
  type: AdjustmentType;
  label: string;
  amount: number;
  unitField?: string;
}

export interface PricingRule {
  id: string;
  conditions: PricingCondition[];
  adjustments: PricingAdjustment[];
}

export interface QuoteService {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  questions: QuoteQuestion[];
  pricingRules: PricingRule[];
  order: number;
}

export interface QuotesData {
  categories: QuoteCategory[];
  services: QuoteService[];
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  zipCode: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  photoPaths: string[];
}

export interface QuoteSubmission {
  id: string;
  createdAt: number;
  localityId: string;
  categoryId: string;
  serviceId: string;
  answers: Record<string, string | number | boolean | string[]>;
  calculatedPrice: number;
  priceBreakdown: { label: string; amount: number }[];
  travelFee: number;
  travelDistanceKm: number | null;
  travelOffice: string;
  customerInfo: CustomerInfo;
  customRequest: boolean;
  customDescription: string;
  privacyConsent: true;
  privacyPolicyVersion: string;
  consentAt: number;
  status: "new" | "contacted" | "accepted" | "rejected";
}

export interface PriceBreakdownItem {
  label: string;
  amount: number;
}
