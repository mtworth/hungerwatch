# HungerWatch

*An open monitoring system of charitable food system demand*

**HungerWatch** is a small, open project designed to quietly monitor web traffic to "Find Food" pages across food banks. Each pageview generates a single, anonymous event stored in a shared database. Over time, these small signals form an early indicator of changing food demand, a kind of digital pulse for community need.

The system is intentionally simple: a single JavaScript line, a small serverless function, and a single database table. HungerWatch is not marketing tool. It is a shared, privacy-safe signal designed for transparency and early awareness.

---

## What HungerWatch Does

* **Counts visits** to local food bank "Find Food" pages.
* **Records minimal information**: only the hostname (domain) and timestamp.
* **Stores events** in a lightweight, open PostgreSQL table.
* **Publishes aggregated, anonymized trends** that can help organizations see patterns—for example, a sudden increase in visits to food finder pages in one region.

---

## Why It Exists

When food demand rises, it is often visible online first—people searching for help, finding local resources, and visiting food bank pages. HungerWatch helps translate these scattered signals into a simple, shared indicator. The goal is not to collect user data but to measure collective shifts in need.

HungerWatch is built with transparency in mind:

* **No tracking cookies or identifiers**
* **No personal data or IP addresses**
* **No unique user tracing**

Instead, HungerWatch simply counts how often people look for food resources.

---

## How It Works (Conceptually)

* Each food bank adds a one-line script to their *Find Food* webpage.
* When that page loads, the browser sends a tiny, anonymous request to a central endpoint.
* The server logs a new record: a unique ID, the current timestamp, and the domain of the page.
* Data is stored securely and aggregated over time to show regional and national trends.

---

## Technical Notes

HungerWatch runs on **Supabase**, which provides both the serverless edge function and the managed PostgreSQL database. Each pageview is one row in the table:

| Column     | Type      | Description                       |
| ---------- | --------- | --------------------------------- |
| `id`       | UUID      | Unique identifier for each event  |
| `ts`       | Timestamp | When the page was viewed          |
| `hostname` | Text      | The site domain where it occurred |

The database can be aggregated to show trends such as:

```sql
select date_trunc('day', ts) as day,
       hostname,
       count(*) as hits
from sentinel_events
group by day, hostname
order by day desc;
```

---

## Governance and Stewardship

HungerWatch is intended to stay **open, minimal, and non-commercial**. Its core purpose is civic: to make hunger visible early, across communities. Anyone may view or reuse the data, but contributions and expansions should maintain its simplicity and privacy guarantees.

The repository includes:

* `assets/` — icons and branding for visual use
* `supabase/` — database schema and edge function
* `public/home.html` — example of the logging snippet

---

## Design Philosophy

HungerWatch is built around three principles:

1. **Simplicity.** Minimal code and minimal data. The simpler it is, the easier it is to trust.
2. **Privacy.** The project measures behavior without tracking individuals.
3. **Transparency.** Data, schema, and code are open so others can understand, verify, and build upon it.

---

## Contact

For collaboration or stewardship discussions, please contact the maintainers or contributing food banks.

HungerWatch is a public good: a small tool, built to help see hunger sooner.
