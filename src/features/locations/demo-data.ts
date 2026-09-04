import type { AccessibleLocation } from "./types";

export const demoAccessibleLocations: AccessibleLocation[] = [
  {
    id: "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d",
    tenantId: "a1111111-1111-4111-8111-111111111111",
    name: "Phoenix Store",
    address: "55756, Punjab",
  },
  {
    id: "d4f2a3b1-4321-4c5d-8e7f-1a2b3c4d5e6f",
    tenantId: "a1111111-1111-4111-8111-111111111111",
    name: "Main Warehouse",
    address: "Industrial Area, Punjab",
  },
  {
    id: "e5a3b4c2-5678-4d6e-9f8a-2b3c4d5e6f70",
    tenantId: "a1111111-1111-4111-8111-111111111111",
    name: "City Centre Store",
    address: "Main Market, Lahore",
  },
];

export function findDemoLocation(id: string) {
  return demoAccessibleLocations.find((location) => location.id === id);
}
