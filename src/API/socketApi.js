/*
 * API for communicating with the server via socket.io
 * (both proactive and reactive)
 */

import io from "socket.io-client";
import { API_URL } from "./const";
let sourceUrl = API_URL

export default function SocketApi(token) {
  return io(sourceUrl, {
    forceNew: true,
    transports: ["polling", "websocket"],
    query:{
        token
    }
  });
}
