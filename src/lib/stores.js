import { writable } from 'svelte/store';
import { readable } from 'svelte/store';

export const url = readable(import.meta.env.BASE_URL);