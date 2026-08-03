import { PricingRule, PriceBreakdownItem } from "@/types/quotes";

function evaluateCondition(
  field: string,
  operator: string,
  conditionValue: string | number | boolean,
  answers: Record<string, string | number | boolean | string[]>,
): boolean {
  const answerValue = answers[field];

  if (answerValue === undefined || answerValue === null) return false;

  if (operator === "eq") return String(answerValue) === String(conditionValue);
  if (operator === "neq") return String(answerValue) !== String(conditionValue);

  const numAnswer = Number(answerValue);
  const numCondition = Number(conditionValue);

  if (isNaN(numAnswer) || isNaN(numCondition)) return false;

  switch (operator) {
    case "gt":
      return numAnswer > numCondition;
    case "gte":
      return numAnswer >= numCondition;
    case "lt":
      return numAnswer < numCondition;
    case "lte":
      return numAnswer <= numCondition;
    default:
      return false;
  }
}

export function calculatePrice(
  basePrice: number,
  pricingRules: PricingRule[],
  answers: Record<string, string | number | boolean | string[]>,
): { total: number; breakdown: PriceBreakdownItem[] } {
  const breakdown: PriceBreakdownItem[] = [];
  let runningTotal = basePrice;

  for (const rule of pricingRules) {
    const allMatch =
      rule.conditions.length === 0 ||
      rule.conditions.every((c) => evaluateCondition(c.field, c.operator, c.value, answers));

    if (!allMatch) continue;

    for (const adj of rule.adjustments) {
      if (adj.type === "fixed") {
        breakdown.push({ label: adj.label, amount: adj.amount });
        runningTotal += adj.amount;
      } else if (adj.type === "percentage") {
        const amount = Math.round((runningTotal * adj.amount) / 100);
        if (amount !== 0) {
          breakdown.push({ label: adj.label, amount });
          runningTotal += amount;
        }
      } else if (adj.type === "per_unit") {
        const unitValue = answers[adj.unitField ?? ""];
        const numUnits = typeof unitValue === "number" ? unitValue : Number(unitValue) || 0;
        if (numUnits > 1) {
          const amount = Math.round((numUnits - 1) * adj.amount);
          if (amount !== 0) {
            breakdown.push({ label: adj.label, amount });
            runningTotal += amount;
          }
        }
      }
    }
  }

  const adjustmentsTotal = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const total = Math.max(0, basePrice + adjustmentsTotal);

  return { total, breakdown };
}
