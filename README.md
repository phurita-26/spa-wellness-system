# spa & wellness

ระบบสั่งบริการสปาและดูแลสุขภาพ สร้างด้วย Next.js (App Router, JavaScript)
เชื่อมต่อฐานข้อมูลผ่าน Supabase และพร้อม deploy บน Vercel

> ดูรายละเอียดโครงสร้างฐานข้อมูล และกติกาสำคัญเกี่ยวกับ `params`
> ของ Dynamic Route (ต้อง unwrap ด้วย `use()`/`await` เสมอ) ได้ที่
> [`CLAUDE.md`](./CLAUDE.md)

## เริ่มต้นใช้งาน

1. ติดตั้ง dependencies
   ```bash
   npm install
   ```

2. คัดลอก `.env.local.example` เป็น `.env.local` แล้วใส่ค่า Supabase
   ```bash
   cp .env.local.example .env.local
   ```
   จากนั้นแก้ไขค่า:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

3. รันโปรเจกต์ในโหมดพัฒนา
   ```bash
   npm run dev
   ```
   เปิด [http://localhost:3000](http://localhost:3000)

## คำสั่งที่ใช้ได้

| คำสั่ง | คำอธิบาย |
|---|---|
| `npm run dev` | รันโปรเจกต์ในโหมดพัฒนา |
| `npm run build` | build โปรเจกต์สำหรับ production |
| `npm run start` | รันโปรเจกต์ที่ build แล้ว |

## โครงสร้างโปรเจกต์

```
spa-wellness/
├── app/
│   ├── layout.js
│   ├── page.js              # หน้าแรก
│   ├── generate-qr/
│   │   └── page.js          # หน้าต้อนรับ / สร้าง QR
│   └── kitchen/
│       └── page.js          # หน้าพนักงานเตรียมสปา
├── lib/
│   └── supabaseClient.js    # Supabase client
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
├── CLAUDE.md                 # บันทึกฐานข้อมูล + กติกา Next.js
└── README.md
```

## Deploy บน Vercel

1. Push โค้ดขึ้น Git repository (GitHub/GitLab/Bitbucket)
2. สร้างโปรเจกต์ใหม่ใน Vercel แล้วเชื่อมต่อกับ repository นี้
3. ตั้งค่า Environment Variables ใน Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. กด Deploy
