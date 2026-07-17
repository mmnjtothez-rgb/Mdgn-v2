import { md5 } from "../utils/md5.js";

const BASE_URL = "https://api.mydgn.com";

/**
 * Fetch a random player from MDGN API
 */
export async function getRandomPlayer(settings) {
  const {
    user,
    platform,
    secretKey,
    maximumBuyOutPrice,
    minimumBuyOutPrice,
    botapp,
    playerType,
  } = settings;

  const timestamp = Math.floor(Date.now() / 1000);
  const hash = md5(platform + user + timestamp + secretKey);

  const params = new URLSearchParams({
    user,
    platform,
    timestamp,
    hash,
    maximumBuyOutPrice,
    minimumBuyOutPrice,
    botapp,
    playerType,
  });

  const url = `${BASE_URL}/transfers?${params.toString()}`;

  const res = await fetch(url);
  return await res.json();
}

/**
 * Update order status (bought or cancel)
 */
export async function updateOrderStatus(settings, transactionID, status, code = null) {
  const {
    user,
    platform,
    secretKey,
    emailHash,
  } = settings;

  const timestamp = Math.floor(Date.now() / 1000);
  const hash = md5(platform + user + timestamp + secretKey);

  const body = {
    user,
    platform,
    timestamp,
    hash,
    transactionID,
    status,
    emailHash,
  };

  if (status === "cancel" && code) {
    body.code = code;
  }

  const res = await fetch(`${BASE_URL}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return await res.json();
}
