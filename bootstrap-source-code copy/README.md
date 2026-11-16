# Bootstrap Frontend Workshop — Source Code

ชุดโค้ดประกอบสไลด์ **Bootstrap Framework ร่วมกับ HTML / CSS / JavaScript**
อ้างอิง Bootstrap 5.3.8 และแบ่งหัวข้อตามลำดับการสอนจริง

## วิธีเปิดใช้งาน

1. แตกไฟล์ ZIP
2. เปิด `index.html` เพื่อเลือกบทเรียน
3. แต่ละบทสามารถเปิด `index.html` โดยตรงได้ เพราะมี Bootstrap CSS/JS ในโฟลเดอร์ `vendor/`
4. หาก Browser จำกัดการทำงานบางอย่างจาก `file://` ให้เปิดผ่าน Local Server เช่น VS Code Live Server
5. เปิด `EXERCISES.md` เพื่อดูโจทย์ท้ายบทและ Checklist ก่อนส่งงาน

## แผนที่บทเรียนกับสไลด์

| โฟลเดอร์ | หัวข้อ | ช่วงสไลด์ |
|---|---|---:|
| `01-setup` | การติดตั้ง, Starter Template, ลำดับโหลดไฟล์ | 1–10 |
| `02-containers` | Container, Container Fluid | 11–13 |
| `03-grid` | Row, Column, 12-column Grid, Gutters | 14–17 |
| `04-responsive-grid` | Breakpoints และ Mobile-first | 18–21 |
| `05-utilities` | Spacing, Display, Flex | 22–27 |
| `06-typography-media` | Typography, Color, Image, Shadow | 28–32 |
| `07-components` | Buttons, Badges, Alerts, Cards | 33–35, 39–40 |
| `08-navbar-pricing` | Responsive Navbar และ Pricing | 36–40 |
| `09-forms-validation` | Forms และ Validation | 41–44 |
| `10-javascript-components` | Modal, Accordion, Offcanvas | 45–49 |
| `11-custom-theme` | CSS Variables, Dark Mode | 50–54 |
| `12-final-project` | Landing Page ฉบับสมบูรณ์ | 55–60 |

## รูปแบบการสอนที่แนะนำ

- เปิด `index.html` ของบทเรียนเพื่อดูผลลัพธ์ก่อน
- เปิด DevTools และค้นหา class ที่ทำให้เกิดผลลัพธ์นั้น
- ให้ผู้เรียนแก้ส่วนที่มีคำว่า `LAB` ใน comment
- ทดสอบ viewport 390px, 768px และ 1280px
- ทดสอบด้วย Keyboard: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`

## หมายเหตุ

- ไฟล์ Bootstrap ถูกเก็บไว้ใน `vendor/` จึงทดลองแบบ Offline ได้
- ตัวอย่างตั้งใจใช้ Custom CSS ให้น้อย เพื่อให้เห็นบทบาทของ Bootstrap utilities ชัดเจน
- Validation ฝั่ง Browser เป็นเพียงตัวอย่าง Frontend; ระบบจริงต้องตรวจข้อมูลที่ Server อีกครั้ง
- โค้ดมีไว้เพื่อการเรียนรู้ สามารถแก้ไขและต่อยอดเป็น Workshop ของผู้สอนได้ทันที
