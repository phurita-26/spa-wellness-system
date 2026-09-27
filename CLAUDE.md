# spa & wellness — บันทึกสำหรับ AI/ผู้พัฒนา

โปรเจกต์นี้เป็นระบบสั่งบริการสปาและดูแลสุขภาพ สร้างด้วย Next.js (App Router,
JavaScript) เชื่อมต่อฐานข้อมูลผ่าน Supabase และ deploy บน Vercel

## ⚠️ กติกาสำคัญ: Next.js เวอร์ชันล่าสุด

โปรเจกต์นี้ใช้ Next.js เวอร์ชันล่าสุด ซึ่ง **`params` ของ Dynamic Route
เป็น Promise** (ไม่ใช่ object ธรรมดาเหมือนเวอร์ชันเก่า)

- ใน **Server Component**: ต้อง `await params` ก่อนใช้งาน
  ```js
  export default async function Page({ params }) {
    const { id } = await params;
    ...
  }
  ```
- ใน **Client Component**: ต้อง unwrap ด้วย `use()` จาก React เสมอ
  ```js
  "use client";
  import { use } from "react";

  export default function Page({ params }) {
    const { id } = use(params);
    ...
  }
  ```

ห้ามเข้าถึง `params.xxx` ตรง ๆ โดยไม่ unwrap ก่อน เพราะจะ error หรือ
ได้ผลลัพธ์ที่ไม่ถูกต้อง กติกานี้ใช้กับทุก dynamic route ในโปรเจกต์นี้
(เช่น `app/order/[sessionId]/page.js` หากมีการสร้างในอนาคต)

เช่นเดียวกัน `searchParams` ก็เป็น Promise และต้อง `await`/`use()` ก่อนใช้
เช่นกัน

## โครงสร้างฐานข้อมูล (Supabase — มีอยู่แล้ว ไม่ต้องสร้างใหม่)

ตารางเหล่านี้มีอยู่แล้วใน Supabase ของโปรเจกต์ ให้ใช้อ้างอิงชื่อ
ตาราง/คอลัมน์เหล่านี้ให้ตรงทุกครั้งที่เขียนโค้ดเรียก Supabase:

### `sessions`
| คอลัมน์ | ชนิดข้อมูล | หมายเหตุ |
|---|---|---|
| id | uuid/int (PK) | |
| table_number | text/int | **ใช้แทนหมายเลขห้อง/เตียงบริการ** (ไม่ใช่โต๊ะอาหาร) |
| adult_count | int | จำนวนผู้ใหญ่ที่ใช้บริการ |
| child_count | int | จำนวนเด็กที่ใช้บริการ |
| status | text | สถานะของเซสชัน |
| created_at | timestamp | |

### `menu_categories`
| คอลัมน์ | ชนิดข้อมูล |
|---|---|
| id | uuid/int (PK) |
| name | text |
| sort_order | int |

### `menu_items`
| คอลัมน์ | ชนิดข้อมูล |
|---|---|
| id | uuid/int (PK) |
| category_id | uuid/int (FK → menu_categories.id) |
| name | text |
| price | numeric |

### `orders`
| คอลัมน์ | ชนิดข้อมูล | หมายเหตุ |
|---|---|---|
| id | uuid/int (PK) | |
| session_id | uuid/int (FK → sessions.id) | |
| table_number | text/int | หมายเลขห้อง/เตียงบริการ |
| items | jsonb | รายการบริการที่สั่ง |
| status | text | สถานะคำสั่ง |
| created_at | timestamp | |

## หน้าเพจหลัก

- `/` — หน้าแรก แสดงชื่อร้าน "spa & wellness" พร้อมลิงก์ไปหน้าอื่น
- `/generate-qr` — สำหรับพนักงานต้อนรับ ใช้สร้าง session และ QR code
- `/kitchen` — สำหรับพนักงานเตรียมสปา ใช้ดูรายการ orders ที่เข้ามา

## Environment Variables

ต้องตั้งค่าใน `.env.local` (ดูตัวอย่างใน `.env.local.example`) และใน
Vercel Project Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## การ Deploy

Push โค้ดขึ้น Git repository แล้วเชื่อมต่อกับ Vercel โดยตั้งค่า
environment variables ด้านบนใน Vercel dashboard ก่อน deploy
