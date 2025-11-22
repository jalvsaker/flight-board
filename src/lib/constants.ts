// List of all Norwegian airport codes supported by the Avinor API
export const VALID_AIRPORTS = [
    'ALF', 'ANX', 'BDU', 'BGO', 'BVG', 'BOO', 'BNN', 'BJF', 'VDB', 'FRO',
    'FDE', 'HFT', 'EVE', 'HAA', 'HVG', 'KKN', 'KRS', 'KSU', 'LKL', 'LKN',
    'MEH', 'MQN', 'MOL', 'MJF', 'OSY', 'OSL', 'RRS', 'RVK', 'RET', 'SDN',
    'SSJ', 'SOG', 'SVG', 'SKN', 'LYR', 'SVJ', 'SOJ', 'TOS', 'TRD', 'VDS',
    'VAW', 'VRY', 'HOV', 'AES'
] as const;

export type AirportCode = typeof VALID_AIRPORTS[number];
