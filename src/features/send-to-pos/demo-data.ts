import type {
  SendToPosBatch,
  SendToPosMappingOption,
  SendToPosPreview,
} from "./types";

export const demoSendToPosPreview: SendToPosPreview = {
  connectionId: "8c52e2ec-8185-4bcc-90c7-7c838cbba701",
  outboundReadiness: "ready",
  eligibleSourceRows: 6,
  blockedSourceRows: 2,
  requiredMappingBlockers: 1,
  connectionMode: "file_xml",
  commanderRelease: "23.0",
  lastOutboundSync: "2026-08-31T11:20:00Z",
  sourceGroups: [
    {
      group: "product",
      candidates: 4,
      eligible: 3,
      blocked: 1,
    },
    {
      group: "tax",
      candidates: 2,
      eligible: 2,
      blocked: 0,
    },
    {
      group: "department",
      candidates: 2,
      eligible: 1,
      blocked: 1,
    },
  ],
};

export const demoSendToPosMappings: SendToPosMappingOption[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    internalEntityType: "product",
    internalEntityId: "12",
    externalEntityKey: "ITEM-00231",
    externalDisplayName: "Coca Cola 1.5L",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    internalEntityType: "tax",
    internalEntityId: "tax-001",
    externalEntityKey: "TAX-17",
    externalDisplayName: "Standard GST",
  },
  {
    id: "88888888-8888-4888-8888-888888888888",
    internalEntityType: "product",
    internalEntityId: "28",
    externalEntityKey: "ITEM-00412",
    externalDisplayName: "Mineral Water",
  },
  {
    id: "99999999-9999-4999-8999-999999999999",
    internalEntityType: "product",
    internalEntityId: "41",
    externalEntityKey: "ITEM-00604",
    externalDisplayName: "Fresh Milk 1L",
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    internalEntityType: "tax",
    internalEntityId: "tax-002",
    externalEntityKey: "TAX-05",
    externalDisplayName: "Reduced Rate",
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    internalEntityType: "department",
    internalEntityId: "dept-005",
    externalEntityKey: "DEPT-05",
    externalDisplayName: "Beverages",
  },
];

export const demoSendToPosHistory: SendToPosBatch[] = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    status: "sent",
    itemCount: 6,
    sentAt: "2026-08-31T11:20:00Z",
    errorMessage: null,
    createdAt: "2026-08-31T11:19:40Z",
    items: demoSendToPosMappings.map((mapping, index) => ({
      id: `sent-item-${index + 1}`,
      mappingId: mapping.id,
      payload: {
        internalEntityType: mapping.internalEntityType,
        internalEntityId: mapping.internalEntityId,
        externalEntityKey: mapping.externalEntityKey,
        externalDisplayName: mapping.externalDisplayName,
      },
    })),
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    status: "pending",
    itemCount: 3,
    sentAt: null,
    errorMessage: null,
    createdAt: "2026-08-30T09:15:00Z",
    items: demoSendToPosMappings.slice(0, 3).map((mapping, index) => ({
      id: `pending-item-${index + 1}`,
      mappingId: mapping.id,
      payload: {
        internalEntityType: mapping.internalEntityType,
        internalEntityId: mapping.internalEntityId,
        externalEntityKey: mapping.externalEntityKey,
        externalDisplayName: mapping.externalDisplayName,
      },
    })),
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    status: "failed",
    itemCount: 2,
    sentAt: null,
    errorMessage: "POS connection was unavailable.",
    createdAt: "2026-08-29T15:35:00Z",
    items: demoSendToPosMappings.slice(4, 6).map((mapping, index) => ({
      id: `failed-item-${index + 1}`,
      mappingId: mapping.id,
      payload: {
        internalEntityType: mapping.internalEntityType,
        internalEntityId: mapping.internalEntityId,
        externalEntityKey: mapping.externalEntityKey,
        externalDisplayName: mapping.externalDisplayName,
      },
    })),
  },
];
