// Single source of truth for the four online-purchasable products.
// Both the client UI (Payment component) and the server action that creates
// the Stripe Checkout session must derive prices and metadata from here —
// never accept a price from the client.

export type ProductId = 'sunbed_day' | 'aperitif_sunset' | 'vip_table' | 'party_pass';

export interface ProductCatalogItem {
  id: ProductId;
  name: string;
  description: string;
  amountCents: number; // EUR cents
  currency: 'eur';
  emoji: string;
}

export const PRODUCTS: Record<ProductId, ProductCatalogItem> = {
  sunbed_day: {
    id: 'sunbed_day',
    name: 'Pacchetto Giornaliero',
    description: '2 lettini + ombrellone',
    amountCents: 3500,
    currency: 'eur',
    emoji: '🏖️',
  },
  aperitif_sunset: {
    id: 'aperitif_sunset',
    name: 'Aperitivo al Tramonto',
    description: 'Ingresso + 1 drink',
    amountCents: 2000,
    currency: 'eur',
    emoji: '🌅',
  },
  vip_table: {
    id: 'vip_table',
    name: 'Tavolo VIP',
    description: 'Tavolo riservato + bottle',
    amountCents: 15000,
    currency: 'eur',
    emoji: '🍾',
  },
  party_pass: {
    id: 'party_pass',
    name: 'Party Pass',
    description: 'Ingresso serata + drink',
    amountCents: 2500,
    currency: 'eur',
    emoji: '🎉',
  },
};

export const PRODUCT_LIST: ProductCatalogItem[] = Object.values(PRODUCTS);

export const PRODUCT_IDS: ProductId[] = Object.keys(PRODUCTS) as ProductId[];
