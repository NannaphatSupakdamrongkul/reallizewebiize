# แบบฝึกหัดท้ายบท

ใช้ไฟล์ในแต่ละโฟลเดอร์เป็นจุดเริ่มต้น และเปิด DevTools เพื่อตรวจผลลัพธ์ทุกครั้ง

1. **Setup** — ถอด Bootstrap CSS ออกชั่วคราว แล้วจดว่าองค์ประกอบใดเปลี่ยนไปบ้าง
2. **Containers** — สร้างส่วนเนื้อหา 3 แบบด้วย `.container`, `.container-fluid` และ `.container-lg`
3. **Grid** — ปรับเลย์เอาต์ 8/4 ให้เป็น 9/3 และทดลอง `g-0`, `g-2`, `g-5`
4. **Responsive Grid** — ทำให้คอลัมน์ซ้อนกันบนมือถือ แต่แสดง 7/5 ตั้งแต่ breakpoint `md`
5. **Utilities** — จัดปุ่มให้อยู่กลางจอด้วย Flex utilities โดยไม่เขียน CSS เพิ่ม
6. **Typography & Media** — สร้าง Article Card ที่มีภาพ responsive, หัวเรื่อง และ metadata
7. **Components** — สร้าง Product Card 3 ใบ โดยให้ใบแนะนำมี Badge และปุ่มสีเด่น
8. **Navbar & Pricing** — เพิ่มแผน Enterprise และทำให้ Navbar ยุบที่ breakpoint `md`
9. **Forms** — เพิ่มเบอร์โทรศัพท์ที่ตรวจรูปแบบ และเขียนข้อความผิดพลาดที่ช่วยให้แก้ได้
10. **JavaScript Components** — เมื่อ Modal เปิด ให้ focus ช่องกรอกข้อมูลหรือปุ่มหลักโดยอัตโนมัติ
11. **Custom Theme** — เปลี่ยนสีหลักและตรวจว่า Light/Dark theme ยังอ่านง่าย
12. **Final Project** — เพิ่ม Section ผลงาน, เชื่อมเมนู, และทดสอบที่ 390px / 768px / 1280px

## Checklist ก่อนส่งงาน

- ใช้ Semantic HTML และลำดับ Heading ถูกต้อง
- ทุกภาพมี `alt` ที่เหมาะสม หรือ `alt=""` เมื่อเป็นภาพตกแต่ง
- ใช้งานได้ด้วย Keyboard และมองเห็น Focus
- ไม่มี Horizontal Scroll บนหน้าจอ 390px
- Form แสดงทั้ง Valid และ Invalid state
- เปิด/ปิด Navbar, Accordion, Modal, Offcanvas และ Toast ได้
- ตรวจ Console แล้วไม่มี Error
