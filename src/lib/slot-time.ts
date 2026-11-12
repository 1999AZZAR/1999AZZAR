export interface Slot {
  start: string;
  end: string;
}

export interface SlotDay {
  date: string;
  slots: Slot[];
  first: string;
}

const dayKeyFormatters = new Map<string, Intl.DateTimeFormat>();

function dayKeyFormatter(zone: string): Intl.DateTimeFormat {
  let formatter = dayKeyFormatters.get(zone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: zone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    dayKeyFormatters.set(zone, formatter);
  }
  return formatter;
}

export function zoneDateKey(iso: string, zone: string): string {
  return dayKeyFormatter(zone).format(new Date(iso));
}

/**
 * Regroup UTC slots into the calendar days of `zone`.
 * A slot at 23:30 UTC lands on the next day in Jakarta but still today in Berlin,
 * so grouping has to happen in the viewer's zone, not the server's.
 */
export function groupSlotsByZone(slots: Slot[], zone: string): SlotDay[] {
  const buckets = new Map<string, SlotDay>();

  for (const slot of slots) {
    const key = zoneDateKey(slot.start, zone);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.slots.push(slot);
    } else {
      buckets.set(key, { date: key, slots: [slot], first: slot.start });
    }
  }

  return [...buckets.values()].sort((a, b) => a.date.localeCompare(b.date));
}
