export const ipfsConfig = {
  repo: 'splinter/dev',
  start: true,
  EXPERIMENTAL: { pubsub: true },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // Use local signal server
        '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ]
    },
  }
};

export const orbitConfig = {
  // If database doesn't exist, create it
  create: true,
  overwrite: true,
  // Load only the local version of the database,
  // don't load the latest from the network yet
  localOnly: false,
  type: 'eventlog',
  // If "Public" flag is set, allow anyone to write to the database,
  // otherwise only the creator of the database can write
  write: []
};
