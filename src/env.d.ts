/// <reference types="astro/client" />
import type { SeedNode } from "@/lib/templates";

declare global {
	namespace App {
		interface Locals {
			nodeSeed: SeedNode;
		}
	}
}
