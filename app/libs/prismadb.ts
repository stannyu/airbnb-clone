/**
 * to avoid creating a new PrismaClient instance for each request, caused by HotReload
 * 
 * Overall, the purpose of this code is to create and export a singleton instance 
 * of the PrismaClient class that can be used to perform database operations in a 
 * type-safe manner. By caching the client instance, it ensures that only
 * one instance is created and shared across multiple requests, thus reducing 
 * the overhead of creating a new client instance for each request.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") globalThis.prisma = client;

export default client;
